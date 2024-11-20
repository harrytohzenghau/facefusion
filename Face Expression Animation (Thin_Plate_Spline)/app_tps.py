from fastapi import FastAPI, UploadFile, File, Form, HTTPException
import shutil
import os
from fastapi.responses import FileResponse
import refactored_inference_tps
import torch

app = FastAPI()

# Ensure the 'temp_tps' directory exists
if not os.path.exists('temp_tps'):
    os.makedirs('temp_tps')

@app.post("/animate/")
async def generate(face: UploadFile = File(...), expression: str = Form(...)):
    try:
        # Define allowed file types for face
        allowed_face_extensions = ['JPG', 'jpg', 'jpeg', 'png']

        # Validate the face file type
        if face.filename.split('.')[-1] not in allowed_face_extensions:
            raise HTTPException(status_code=400, detail="Invalid face file type. Supported: jpg, jpeg, png")

        # Select the driving video based on expression
        if expression == 'happy':
            driving_video = 'assets/driver_happy.mp4'
        elif expression == 'sad':
            driving_video = 'assets/driver_sad.mp4'
        else:
            raise HTTPException(status_code=400, detail="Invalid expression. Supported: happy, sad")

        # Save the uploaded face file
        face_path = f"temp_tps/{face.filename}"
        with open(face_path, "wb") as buffer:
            shutil.copyfileobj(face.file, buffer)

        # Path configurations
        config_path = 'config/vox-256.yaml'
        checkpoint_path = 'checkpoints/vox.pth.tar'
        output_path = "temp_tps/output_result.mp4"
        device = 'cpu' if not torch.cuda.is_available() else 'cuda'

        # Perform inference
        result_video = refactored_inference_tps.run_inference(
            config_path=config_path,
            checkpoint_path=checkpoint_path,
            source_image_path=face_path,
            driving_video_path=driving_video,
            output_path=output_path,
            device=device
        )

        # Check if result video exists
        if not os.path.exists(output_path):
            raise HTTPException(status_code=500, detail="Inference failed: output video not generated")

        # Return the video file
        return FileResponse(output_path, media_type="video/mp4", filename="output_result_expression.mp4")

    except HTTPException as http_err:
        raise http_err  # Re-raise any specific HTTP exceptions (e.g., invalid input)

    except Exception as e:
        # Handle any other exceptions
        raise HTTPException(status_code=500, detail=f"An unexpected error occurred: {str(e)}")


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8001)
