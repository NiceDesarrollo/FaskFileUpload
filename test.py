import whisper

model = whisper.load_model("base")
result = model.transcribe("uploadsaudio.mp3")
print(result["text"])