import cv2

def get_video_fps(video_path):
    cap = cv2.VideoCapture(video_path)
    fps = cap.get(cv2.CAP_PROP_FPS)
    cap.release()
    return fps

# Example
original_video_path = 'inputs/expression_talking.mp4'
original_fps = int(get_video_fps(original_video_path))
print(f"Original FPS: {original_fps}")
