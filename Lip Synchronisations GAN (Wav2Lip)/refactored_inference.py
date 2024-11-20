from os import listdir, path
import numpy as np
import scipy, cv2, os, sys, audio
import subprocess
import torch, face_detection
from models import Wav2Lip
import platform

# Global variables
mel_step_size = 16
device = 'cuda' if torch.cuda.is_available() else 'cpu'
print('Using {} for inference.'.format(device))

def get_smoothened_boxes(boxes, T):
	for i in range(len(boxes)):
		if i + T > len(boxes):
			window = boxes[len(boxes) - T:]
		else:
			window = boxes[i : i + T]
		boxes[i] = np.mean(window, axis=0)
	return boxes

def face_detect(images, pads, batch_size):
	detector = face_detection.FaceAlignment(face_detection.LandmarksType._2D, 
											flip_input=False, device=device)
	while 1:
		predictions = []
		try:
			for i in range(0, len(images), batch_size):
				predictions.extend(detector.get_detections_for_batch(np.array(images[i:i + batch_size])))
		except RuntimeError:
			if batch_size == 1: 
				raise RuntimeError('Image too big to run face detection on GPU.')
			batch_size //= 2
			print('Recovering from OOM error; New batch size: {}'.format(batch_size))
			continue
		break

	results = []
	pady1, pady2, padx1, padx2 = pads
	for rect, image in zip(predictions, images):
		if rect is None:
			cv2.imwrite('temp/faulty_frame.jpg', image) # check this frame where the face was not detected.
			raise ValueError('Face not detected! Ensure the video contains a face in all the frames.')

		y1 = max(0, rect[1] - pady1)
		y2 = min(image.shape[0], rect[3] + pady2)
		x1 = max(0, rect[0] - padx1)
		x2 = min(image.shape[1], rect[2] + padx2)
		
		results.append([x1, y1, x2, y2])

	boxes = np.array(results)
	boxes = get_smoothened_boxes(boxes, T=5)
	results = [[image[y1: y2, x1:x2], (y1, y2, x1, x2)] for image, (x1, y1, x2, y2) in zip(images, boxes)]
	del detector
	return results 

def datagen(frames, mels, face_det_batch_size, img_size, static, box, wav2lip_batch_size):
	img_batch, mel_batch, frame_batch, coords_batch = [], [], [], []

	if box[0] == -1:
		if not static:
			face_det_results = face_detect(frames, [0, 20, 0, 0], face_det_batch_size)
		else:
			face_det_results = face_detect([frames[0]], [0, 20, 0, 0], face_det_batch_size)
	else:
		y1, y2, x1, x2 = box
		face_det_results = [[f[y1: y2, x1:x2], (y1, y2, x1, x2)] for f in frames]

	for i, m in enumerate(mels):
		idx = 0 if static else i%len(frames)
		frame_to_save = frames[idx].copy()
		face, coords = face_det_results[idx].copy()
		face = cv2.resize(face, (img_size, img_size))
			
		img_batch.append(face)
		mel_batch.append(m)
		frame_batch.append(frame_to_save)
		coords_batch.append(coords)

		if len(img_batch) >= wav2lip_batch_size:
			img_batch, mel_batch = np.asarray(img_batch), np.asarray(mel_batch)

			img_masked = img_batch.copy()
			img_masked[:, img_size//2:] = 0

			img_batch = np.concatenate((img_masked, img_batch), axis=3) / 255.
			mel_batch = np.reshape(mel_batch, [len(mel_batch), mel_batch.shape[1], mel_batch.shape[2], 1])

			yield img_batch, mel_batch, frame_batch, coords_batch
			img_batch, mel_batch, frame_batch, coords_batch = [], [], [], []

	if len(img_batch) > 0:
		img_batch, mel_batch = np.asarray(img_batch), np.asarray(mel_batch)

		img_masked = img_batch.copy()
		img_masked[:, img_size//2:] = 0

		img_batch = np.concatenate((img_masked, img_batch), axis=3) / 255.
		mel_batch = np.reshape(mel_batch, [len(mel_batch), mel_batch.shape[1], mel_batch.shape[2], 1])

		yield img_batch, mel_batch, frame_batch, coords_batch

def _load(checkpoint_path):
	if device == 'cuda':
		checkpoint = torch.load(checkpoint_path)
	else:
		checkpoint = torch.load(checkpoint_path,
								map_location=lambda storage, loc: storage)
	return checkpoint

def load_model(path):
	model = Wav2Lip()
	checkpoint = _load(path)
	s = checkpoint["state_dict"]
	new_s = {}
	for k, v in s.items():
		new_s[k.replace('module.', '')] = v
	model.load_state_dict(new_s)
	model = model.to(device)
	return model.eval()

def run_inference(checkpoint_path, face_path, audio_path, outfile, fps=25, static=False):
	if not os.path.isfile(face_path):
		raise ValueError('Face argument must be a valid path to video/image file')

	if face_path.split('.')[1] in ['jpg', 'png', 'jpeg']:
		full_frames = [cv2.imread(face_path)]
	else:
		video_stream = cv2.VideoCapture(face_path)
		fps = video_stream.get(cv2.CAP_PROP_FPS)

		full_frames = []
		while True:
			still_reading, frame = video_stream.read()
			if not still_reading:
				video_stream.release()
				break
			full_frames.append(frame)

	if not audio_path.endswith('.wav'):
		command = f'ffmpeg -y -i {audio_path} -strict -2 temp/temp.wav'
		subprocess.call(command, shell=True)
		audio_path = 'temp/temp.wav'

	wav = audio.load_wav(audio_path, 16000)
	mel = audio.melspectrogram(wav)

	mel_chunks = []
	mel_idx_multiplier = 80. / fps 
	i = 0
	while 1:
		start_idx = int(i * mel_idx_multiplier)
		if start_idx + mel_step_size > len(mel[0]):
			mel_chunks.append(mel[:, len(mel[0]) - mel_step_size:])
			break
		mel_chunks.append(mel[:, start_idx : start_idx + mel_step_size])
		i += 1

	full_frames = full_frames[:len(mel_chunks)]

	batch_size = 128
	gen = datagen(full_frames.copy(), mel_chunks, 16, 96, static, [-1, -1, -1, -1], batch_size)

	for i, (img_batch, mel_batch, frames, coords) in enumerate(gen):
		if i == 0:
			model = load_model(checkpoint_path)
			frame_h, frame_w = full_frames[0].shape[:-1]
			out = cv2.VideoWriter('temp/result.avi', 
								  cv2.VideoWriter_fourcc(*'DIVX'), fps, (frame_w, frame_h))

		img_batch = torch.FloatTensor(np.transpose(img_batch, (0, 3, 1, 2))).to(device)
		mel_batch = torch.FloatTensor(np.transpose(mel_batch, (0, 3, 1, 2))).to(device)

		with torch.no_grad():
			pred = model(mel_batch, img_batch)

		pred = pred.cpu().numpy().transpose(0, 2, 3, 1) * 255.
		
		for p, f, c in zip(pred, frames, coords):
			y1, y2, x1, x2 = c
			p = cv2.resize(p.astype(np.uint8), (x2 - x1, y2 - y1))
			f[y1:y2, x1:x2] = p
			out.write(f)

	out.release()

	command = f'ffmpeg -y -i {audio_path} -i temp/result.avi -strict -2 -q:v 1 {outfile}'
	subprocess.call(command, shell=platform.system() != 'Windows')

	return outfile


# checkpoint_path = 'checkpoints/wav2lip_gan.pth'  # Your checkpoint file
# face_path = 'loo_5s.mp4'  # Your face video/image
# audio_path = 'siongodaddy.mp3'  # Your audio file
# outfile = 'output_video_02.mp4'  # Path for saving the output video

# # Run the inference
# output = run_inference(checkpoint_path, face_path, audio_path, outfile)
# print(f"Inference completed, video saved to: {output}")