from fastapi import FastAPI, UploadFile, File, HTTPException
from fastapi.responses import FileResponse
import shutil
import os
import refactored_inference
import time

app = FastAPI()

# Ensure the 'temp_fd' directory exists
if not os.path.exists('temp_fd'):
    os.makedirs('temp_fd')


@app.post("/generate/")
async def generate(face: UploadFile = File(...), audio: UploadFile = File(...)):
    # Define allowed file types for face and audio
    allowed_face_extensions = ['MP4', 'mp4', 'mov']
    allowed_audio_extensions = ['MP3', 'mp3', 'wav']

    # Use a pre-defined checkpoint path, no need to upload
    checkpoint_path = 'checkpoints/wav2lip_gan.pth'

    # Generate unique filenames for each request using a timestamp
    unique_id = str(time.time())
    face_path = f"temp_fd/face_{unique_id}.{face.filename.split('.')[-1]}"
    audio_path = f"temp_fd/audio_{unique_id}.{audio.filename.split('.')[-1]}"

    # Validate the face file type
    if face.filename.split('.')[-1] not in allowed_face_extensions:
        raise HTTPException(status_code=400, detail="Invalid face file type. Supported: mp4, mov")

    # Validate the audio file type
    if audio.filename.split('.')[-1] not in allowed_audio_extensions:
        raise HTTPException(status_code=400, detail="Invalid audio file type. Supported: mp3, wav")

    # Save the uploaded face and audio files
    with open(face_path, "wb") as buffer:
        shutil.copyfileobj(face.file, buffer)
        print(f"Face file saved to: {face_path}")

    with open(audio_path, "wb") as buffer:
        shutil.copyfileobj(audio.file, buffer)
        print(f"Audio file saved to: {audio_path}")

    # Output video path
    output_video = f"temp_fd/output_result_{unique_id}.mp4"

    # Remove old output file if it exists (optional, as we are using unique names)
    if os.path.exists(output_video):
        os.remove(output_video)

    # Perform inference
    result_video = refactored_inference.run_inference(
        checkpoint_path=checkpoint_path,
        face_path=face_path,
        audio_path=audio_path,
        outfile=output_video  # Save the result to the temp folder
    )

    # Send the generated video file directly in the response
    if os.path.exists(output_video):
        return FileResponse(output_video, media_type="video/mp4", filename=f"output_result_{unique_id}.mp4", headers={"Cache-Control": "no-cache"})
    else:
        raise HTTPException(status_code=500, detail="Video generation failed")


# FastAPI entry point
if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
