import sys
import os
from multiprocessing import freeze_support
import cv2
from cv2 import (
    VideoCapture as opencv_VideoCapture,
    cvtColor as opencv_cvtColor,
    COLOR_BGR2RGB,
    COLOR_RGB2BGR,
    GaussianBlur as opencv_GaussianBlur,
    addWeighted as opencv_addWeighted,
    bilateralFilter as opencv_bilateralFilter,
)
from moviepy.editor import VideoFileClip, ImageSequenceClip, AudioFileClip
from numpy import (
    ndarray as numpy_ndarray,
    uint8,
    squeeze as numpy_squeeze,
    clip as numpy_clip,
    transpose as numpy_transpose,
    expand_dims as numpy_expand_dims,
    float32,
    max as numpy_max,
)
from onnxruntime import InferenceSession as onnxruntime_inferenceSession

def find_by_relative_path(relative_path: str) -> str:
    base_path = getattr(sys, '_MEIPASS', os.path.dirname(os.path.abspath(__file__)))
    return os.path.join(base_path, relative_path)

class AI:
    def __init__(self, AI_model_name: str, resize_factor: int, max_resolution: int):
        self.AI_model_name = AI_model_name
        self.resize_factor = resize_factor
        self.max_resolution = max_resolution
        self.AI_model_path = find_by_relative_path(f"AI-onnx/{self.AI_model_name}_fp16.onnx")
        self.inferenceSession = self._load_inferenceSession()
        self.upscale_factor = self._get_upscale_factor()

    def _get_upscale_factor(self) -> int:
        if "x1" in self.AI_model_name:
            return 1
        elif "x2" in self.AI_model_name:
            return 2
        elif "x4" in self.AI_model_name:
            return 4

    def _load_inferenceSession(self) -> onnxruntime_inferenceSession:
        directml_backend = [('DmlExecutionProvider', {"device_id": "0"})]
        inference_session = onnxruntime_inferenceSession(path_or_bytes=self.AI_model_path, providers=directml_backend)
        return inference_session

    def AI_upscale(self, image: numpy_ndarray) -> numpy_ndarray:
        # Preprocessing: Mild denoising
        image = opencv_bilateralFilter(image, d=9, sigmaColor=75, sigmaSpace=75)
        
        image_mode = self.get_image_mode(image)
        
        if image_mode == "BGR":
            image = opencv_cvtColor(image, COLOR_BGR2RGB)

        image, range = self.normalize_image(image)
        image = image.astype(float32)

        if image_mode == "RGB":
            image = self.preprocess_image(image)
            onnx_output = self.onnxruntime_inference(image)
            onnx_output = self.postprocess_output(onnx_output)
            output_image = self.de_normalize_image(onnx_output, range)

            # Post-processing: Adaptive sharpening
            output_image = self.adaptive_sharpen(output_image)

            # Adjust color balance for natural skin tone
            output_image = self.adjust_color_balance(output_image, factor=0.8)

            return output_image

    def get_image_mode(self, image: numpy_ndarray) -> str:
        if len(image.shape) == 2:
            return "Grayscale"
        elif image.shape[2] == 3:
            return "RGB"
        elif image.shape[2] == 4:
            return "RGBA"

    def normalize_image(self, image: numpy_ndarray) -> tuple:
        range = 255
        if numpy_max(image) > 256:
            range = 65535
        normalized_image = image / range
        return normalized_image, range

    def preprocess_image(self, image: numpy_ndarray) -> numpy_ndarray:
        image = numpy_transpose(image, (2, 0, 1))
        image = numpy_expand_dims(image, axis=0)
        return image

    def onnxruntime_inference(self, image: numpy_ndarray) -> numpy_ndarray:
        onnx_input = {self.inferenceSession.get_inputs()[0].name: image}
        onnx_output = self.inferenceSession.run(None, onnx_input)[0]
        return onnx_output

    def postprocess_output(self, onnx_output: numpy_ndarray) -> numpy_ndarray:
        onnx_output = numpy_squeeze(onnx_output, axis=0)
        onnx_output = numpy_clip(onnx_output, 0, 1)
        onnx_output = numpy_transpose(onnx_output, (1, 2, 0))
        return onnx_output.astype(float32)

    def de_normalize_image(self, onnx_output: numpy_ndarray, max_range: int) -> numpy_ndarray:
        return (onnx_output * max_range).astype(uint8)
    
    def adaptive_sharpen(self, image: numpy_ndarray) -> numpy_ndarray:
        blurred = opencv_GaussianBlur(image, (0, 0), 3)
        sharpened = opencv_addWeighted(image, 1.25, blurred, -0.25, 0)
        return sharpened

    def adjust_color_balance(self, image: numpy_ndarray, factor: float = 1.0) -> numpy_ndarray:
        # Simple color adjustment to enhance skin tones
        adjusted_image = cv2.convertScaleAbs(image, alpha=factor, beta=0)
        return adjusted_image

def upscale_video(AI_instance: AI, video_path: str, output_path: str) -> None:
    video_capture = opencv_VideoCapture(video_path)
    frame_rate = video_capture.get(cv2.CAP_PROP_FPS)
    frames = []
    
    success, frame = video_capture.read()
    while success:
        frames.append(frame)
        success, frame = video_capture.read()
    
    video_capture.release()

    upscaled_frames = [AI_instance.AI_upscale(frame) for frame in frames]

    # Extract audio from the original video
    original_video_clip = VideoFileClip(video_path)
    original_audio = original_video_clip.audio

    output_video_path = os.path.join(output_path, "upscaled_video_with_audio_04.mp4")
    
    # Create a video clip from the upscaled frames
    clip = ImageSequenceClip([opencv_cvtColor(frame, COLOR_RGB2BGR) for frame in upscaled_frames], fps=frame_rate)
    
    # Set the audio to the new clip
    clip = clip.set_audio(original_audio)
    
    # Write the final video with audio
    clip.write_videofile(output_video_path, codec="libx264", fps=frame_rate, audio_codec="aac")

if __name__ == "__main__":
    freeze_support()

    if len(sys.argv) < 3:
        print("Usage: python upscale.py <input_video_path> <output_directory>")
        sys.exit(1)

    input_video_path = sys.argv[1]
    output_directory = sys.argv[2]

    AI_model_name = "RealESRGANx4"
    resize_factor = 100
    max_resolution = 720

    AI_instance = AI(AI_model_name, resize_factor, max_resolution)

    upscale_video(AI_instance, input_video_path, output_directory)
