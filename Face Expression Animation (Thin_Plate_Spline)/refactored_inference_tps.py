import matplotlib
matplotlib.use('Agg')
import yaml
from scipy.spatial import ConvexHull
import numpy as np
import imageio
from skimage.transform import resize
from skimage import img_as_ubyte
import torch
from modules.inpainting_network import InpaintingNetwork
from modules.keypoint_detector import KPDetector
from modules.dense_motion import DenseMotionNetwork
from modules.avd_network import AVDNetwork

# Utility function to compute relative keypoints
def relative_kp(kp_source, kp_driving, kp_driving_initial):
    source_area = ConvexHull(kp_source['fg_kp'][0].data.cpu().numpy()).volume
    driving_area = ConvexHull(kp_driving_initial['fg_kp'][0].data.cpu().numpy()).volume
    adapt_movement_scale = np.sqrt(source_area) / np.sqrt(driving_area)

    kp_new = {k: v for k, v in kp_driving.items()}
    kp_value_diff = (kp_driving['fg_kp'] - kp_driving_initial['fg_kp'])
    kp_value_diff *= adapt_movement_scale
    kp_new['fg_kp'] = kp_value_diff + kp_source['fg_kp']

    return kp_new

# Load model checkpoints
def load_checkpoints(config_path, checkpoint_path, device):
    with open(config_path) as f:
        config = yaml.full_load(f)

    inpainting = InpaintingNetwork(**config['model_params']['generator_params'], **config['model_params']['common_params'])
    kp_detector = KPDetector(**config['model_params']['common_params'])
    dense_motion_network = DenseMotionNetwork(**config['model_params']['common_params'], **config['model_params']['dense_motion_params'])
    avd_network = AVDNetwork(num_tps=config['model_params']['common_params']['num_tps'], **config['model_params']['avd_network_params'])

    # Move to device
    kp_detector.to(device)
    dense_motion_network.to(device)
    inpainting.to(device)
    avd_network.to(device)
       
    checkpoint = torch.load(checkpoint_path, map_location=device)
 
    inpainting.load_state_dict(checkpoint['inpainting_network'])
    kp_detector.load_state_dict(checkpoint['kp_detector'])
    dense_motion_network.load_state_dict(checkpoint['dense_motion_network'])
    if 'avd_network' in checkpoint:
        avd_network.load_state_dict(checkpoint['avd_network'])

    # Set models to evaluation mode
    inpainting.eval()
    kp_detector.eval()
    dense_motion_network.eval()
    avd_network.eval()

    return inpainting, kp_detector, dense_motion_network, avd_network

# Animation function
def make_animation(source_image, driving_video, inpainting_network, kp_detector, dense_motion_network, avd_network, device, mode='relative'):
    assert mode in ['standard', 'relative', 'avd']
    with torch.no_grad():
        predictions = []
        source = torch.tensor(source_image[np.newaxis].astype(np.float32)).permute(0, 3, 1, 2).to(device)
        driving = torch.tensor(np.array(driving_video)[np.newaxis].astype(np.float32)).permute(0, 4, 1, 2, 3).to(device)
        kp_source = kp_detector(source)
        kp_driving_initial = kp_detector(driving[:, :, 0])

        for frame_idx in range(driving.shape[2]):
            driving_frame = driving[:, :, frame_idx].to(device)
            kp_driving = kp_detector(driving_frame)
            if mode == 'standard':
                kp_norm = kp_driving
            elif mode == 'relative':
                kp_norm = relative_kp(kp_source=kp_source, kp_driving=kp_driving, kp_driving_initial=kp_driving_initial)
            elif mode == 'avd':
                kp_norm = avd_network(kp_source, kp_driving)

            dense_motion = dense_motion_network(source_image=source, kp_driving=kp_norm, kp_source=kp_source, bg_param=None, dropout_flag=False)
            out = inpainting_network(source, dense_motion)
            predictions.append(np.transpose(out['prediction'].data.cpu().numpy(), [0, 2, 3, 1])[0])
    
    return predictions

# Inference function
def run_inference(config_path, checkpoint_path, source_image_path, driving_video_path, output_path, device, mode='relative', img_shape=(256, 256)):
    source_image = imageio.imread(source_image_path)
    reader = imageio.get_reader(driving_video_path)
    fps = reader.get_meta_data()['fps']
    driving_video = [frame for frame in reader]
    reader.close()

    source_image = resize(source_image, img_shape)[..., :3]
    driving_video = [resize(frame, img_shape)[..., :3] for frame in driving_video]

    inpainting, kp_detector, dense_motion_network, avd_network = load_checkpoints(config_path, checkpoint_path, device)

    predictions = make_animation(source_image, driving_video, inpainting, kp_detector, dense_motion_network, avd_network, device, mode)
    imageio.mimsave(output_path, [img_as_ubyte(frame) for frame in predictions], fps=fps)

    return output_path
