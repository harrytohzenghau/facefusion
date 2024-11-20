import torch
from refactored_inference_tps import run_inference

# Define file paths
config_path = 'config/vox-256.yaml'  # Path to your config file
checkpoint_path = 'checkpoints/vox.pth.tar'  # Path to your checkpoint file
source_image_path = 'assets/loo_squared.jpg'  # Path to your source image
driving_video_path = 'assets/driver_happy.mp4'  # Path to your driving video
output_path = 'output_animation.mp4'  # Path where the result will be saved

# Define the device to use (CPU or GPU)
device = torch.device('cuda' if torch.cuda.is_available() else 'cpu')
print(f"Using {device} for inference.")

# Call the run_inference function without mode and img_shape (they will use default values)
result_video = run_inference(
    config_path=config_path,
    checkpoint_path=checkpoint_path,
    source_image_path=source_image_path,
    driving_video_path=driving_video_path,
    output_path=output_path,
    device=device
)

print(f"Inference completed. Video saved at: {result_video}")
