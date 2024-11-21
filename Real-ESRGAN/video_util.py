import cv2
import os
import torch
import subprocess

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


def reassemble_video(frame_folder, video_path, fps=30):
    frame_files = sorted([f for f in os.listdir(frame_folder) if f.endswith('.png')])
    first_frame = cv2.imread(os.path.join(frame_folder, frame_files[0]))
    height, width, _ = first_frame.shape
    fourcc = cv2.VideoWriter_fourcc(*'mp4v')
    out = cv2.VideoWriter(video_path, fourcc, fps, (width, height))
    for frame_file in frame_files:
        frame = cv2.imread(os.path.join(frame_folder, frame_file))
        out.write(frame)
    out.release()