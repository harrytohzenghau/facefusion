from refactored_inference import run_inference
from os import path

output_folder = 'inference_output'

# Paths to input files
checkpoint_path = 'checkpoints/wav2lip_gan.pth'  # Your checkpoint file
face_path = 'loo_5s.mp4'  # Your face video/image
audio_path = 'siongodaddy.mp3'  # Your audio file
outfile = path.join(output_folder, 'output_video.mp4')  # Path for saving the output video

# Run the inference
output = run_inference(checkpoint_path, face_path, audio_path, outfile)
print(f"Inference completed, video saved to: {output}")
