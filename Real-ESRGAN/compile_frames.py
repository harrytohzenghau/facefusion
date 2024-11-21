import os.path as osp
import os
import glob
import cv2
import numpy as np
import torch
import subprocess


def extract_frames(video_path, output_folder):
    if not os.path.exists(output_folder):
        os.makedirs(output_folder)
    cap = cv2.VideoCapture(video_path)
    count = 0
    while True:
        ret, frame = cap.read()
        if not ret:
            break
        cv2.imwrite(f"{output_folder}/frame_{count:04d}.png", frame)
        count += 1
    cap.release()

def process_frames(input_folder, output_folder, model):
    if not os.path.exists(output_folder):
        os.makedirs(output_folder)
    for filename in sorted(os.listdir(input_folder)):
        if filename.endswith(".png"):
            img_path = os.path.join(input_folder, filename)
            img = cv2.imread(img_path)
            # Convert img to tensor and process through the model
            img_tensor = torch.from_numpy(img).float().unsqueeze(0)  # Adjust based on model requirements
            with torch.no_grad():
                output_tensor = model(img_tensor)
            output_img = output_tensor.squeeze().cpu().numpy().astype('uint8')
            output_img = cv2.cvtColor(output_img, cv2.COLOR_RGB2BGR)  # Adjust based on model output
            cv2.imwrite(os.path.join(output_folder, filename), output_img)

def reassemble_video(frame_folder, video_path, fps=30):
    frame_files = sorted([f for f in os.listdir(frame_folder) if f.endswith('.png')])
    first_frame = cv2.imread(os.path.join(frame_folder, frame_files[0]))
    height, width, _ = first_frame.shape
    fourcc = cv2.VideoWriter_fourcc(*'avc1')
    out = cv2.VideoWriter(video_path, fourcc, fps, (width, height))
    for frame_file in frame_files:
        frame = cv2.imread(os.path.join(frame_folder, frame_file))
        out.write(frame)
    out.release()


def extract_audio(input_video, output_audio):
    # Extract audio from the original video
    command = ['ffmpeg', '-i', input_video, '-q:a', '0', '-map', 'a', output_audio]
    subprocess.run(command)

def merge_audio_video(input_video, input_audio, output_video):
    # Merge the extracted audio with the new video
    command = ['ffmpeg', '-i', input_video, '-i', input_audio, '-c:v', 'copy', '-c:a', 'aac', '-strict', 'experimental', output_video]
    subprocess.run(command)

def get_video_fps(video_path):
    cap = cv2.VideoCapture(video_path)
    fps = cap.get(cv2.CAP_PROP_FPS)
    cap.release()
    return fps


if __name__ == "__main__":
    original_video = 'inputs/expression_talking.mp4'
    original_fps = get_video_fps(original_video)
    extracted_audio = 'inputs/audio.aac'
    reassembled_video = 'results/loo4K.mov'
    final_video = 'results/loo4K_audio.mov'

    reassemble_video('results/upscaled_frames', 'results/loo4K.mov', fps=original_fps)
    extract_audio(original_video, extracted_audio)
    merge_audio_video(reassembled_video, extracted_audio, final_video)


