import os
from fastapi import FastAPI, HTTPException, UploadFile, File
from fastapi.responses import FileResponse, StreamingResponse
from io import BytesIO
from typing import Dict, Any, Annotated
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
from video_util import *
import subprocess
import ffmpeg

# final_vid = "results/output.mp4"
# extracted_audio = "inputs/audio.aac"
# extracted_frames_folder = f"inputs/extracted_frames"
# upscaled_frames_folder = f"results/upscaled_frames"
# reassembled_vid = f"results/upscaled_vid.mp4"
# final_vid = "results/output.mp4"
def upscale_vid(input_vid, request_folder):
    extracted_audio = f"inputs/{request_folder}/audio.aac"
    extracted_frames_folder = f"inputs/{request_folder}/extracted_frames"
    if not os.path.exists(extracted_frames_folder):
        os.makedirs(extracted_frames_folder)

    upscaled_frames_folder = f"results/{request_folder}/upscaled_frames"
    if not os.path.exists(upscaled_frames_folder):
        os.makedirs(upscaled_frames_folder)

    reassembled_vid = f"results/{request_folder}/upscaled_vid.mp4"
    final_vid = f"results/{request_folder}/output.mp4"

    extract_frames(video_path=input_vid, output_folder=extracted_frames_folder)
    extract_audio(input_vid, extracted_audio)
    #os.system(f'python inference_realesrgan.py -n RealESRGAN_x4plus -i {extracted_frames_folder} -o {upscaled_frames_folder} --face_enhance')
    subprocess.run(f"python inference_realesrgan.py -n RealESRGAN_x4plus -i {extracted_frames_folder} -o {upscaled_frames_folder} --face_enhance", shell=True, text=True)
    reassemble_video(upscaled_frames_folder, reassembled_vid, get_video_fps(input_vid))
    merge_audio_video(reassembled_vid, extracted_audio, final_vid)


app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/get-sample-vid")
def getSample():
    return FileResponse("results/loo4K_audio.mov", media_type="video/quicktime", filename="sample")

# @app.get("/get-hd")
# def getHD():
#     if(os.path.exists(final_vid)):
#         return FileResponse(final_vid, media_type="video/mp4", filename=final_vid)
#     else:
#         return "File does not exist. Please upload an mp4 file for upscaling"

@app.get("/")
def justGet():
    return "Hi mom"

@app.post("/make-hd")
async def makeHD(file: UploadFile = File(...)):
    fname = file.filename.replace(" ", "")
    folder,_ = os.path.splitext(fname)

    if os.path.exists(f"inputs/{folder}"):
        os.rmdir(f"inputs/{folder}")

    if os.path.exists(f"results/{folder}"):
        os.rmdir(f"results/{folder}")

    if not os.path.exists(f"inputs/{folder}"):
        os.makedirs(f"inputs/{folder}")

    if not os.path.exists(f"results/{folder}"):
        os.makedirs(f"results/{folder}")

    temp_file = f"inputs/{folder}/temp_{fname}"
    result_file = f"results/{folder}/output.mp4"
    response_file = f"results/{folder}/output_h246.mp4"

    with open(temp_file, "wb") as f:
        content = await file.read()  # use await to read file asynchronously
        f.write(content)
    upscale_vid(temp_file, folder)
    ffmpeg.input(result_file).output(response_file, vcodec='libx264').run()

    return FileResponse(response_file, media_type="video/mp4", filename=f"{folder}_HD.mp4")
#





