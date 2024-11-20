from fastapi import FastAPI, Form
from fastapi.responses import FileResponse, JSONResponse
import azure.cognitiveservices.speech as speechsdk

app = FastAPI()

# Azure Text-to-Speech function
def text_to_speech_azure(message: str, gender: str, output_file: str):
    speech_config = speechsdk.SpeechConfig(subscription="5c45065c640c4783917c4fb108baed69", region="eastasia")
    audio_config = speechsdk.audio.AudioOutputConfig(filename=output_file)

    # Select voice based on gender
    if gender == 'male':
        speech_config.speech_synthesis_voice_name = "en-US-GuyNeural"
    elif gender == 'female':
        speech_config.speech_synthesis_voice_name = "en-US-JennyNeural"

    synthesizer = speechsdk.SpeechSynthesizer(speech_config=speech_config, audio_config=audio_config)
    result = synthesizer.speak_text_async(message).get()

    if result.reason == speechsdk.ResultReason.SynthesizingAudioCompleted:
        return True
    elif result.reason == speechsdk.ResultReason.Canceled:
        cancellation_details = result.cancellation_details
        print(f"Speech synthesis canceled: {cancellation_details.reason}")
        return False

# FastAPI route
@app.post("/textToSpeech/")
async def text_to_speech(message: str = Form(...), gender: str = Form(...)):
    try:
        output_file = "output_audio.mp3"
        success = text_to_speech_azure(message, gender, output_file)
        if success:
            # Return the audio file as response
            return FileResponse(output_file, media_type="audio/mpeg", filename=output_file)
        else:
            return JSONResponse(status_code=500, content={"detail": "Error during speech synthesis"})
    except Exception as e:
        return JSONResponse(status_code=500, content={"detail": str(e)})

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8002)
