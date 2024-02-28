import os
from flask import Flask, flash, request, redirect, url_for, render_template
from werkzeug.utils import secure_filename
import whisper
from flask_cors import CORS
import time

UPLOAD_FOLDER = "./uploads"

ALLOWED_EXTENSIONS = {'mp3', 'mp4'}


app = Flask(__name__)
CORS(app)
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

def allowed_file(filename):
    return '.' in filename and \
           filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS
           
@app.route("/", methods = ["GET"])
def hello():
    return render_template('index.html')

@app.route("/test", methods = ["POST"])
def test():
    time.sleep(2.5)
    return {
        "text": 'lorem ipsum xxx'
        }, 200

#Nombre de la carpeta donde se guardaran los documentos
@app.route("/upload", methods = ["POST"])
def upload():
        # check if the post request has the file part
        if 'file' not in request.files:
            return 'No file part'
        file = request.files['file']
         # If the user does not select a file, the browser submits an
        # empty file without a filename.
        if file.filename == '':
            return 'No selected file'
        if file and allowed_file(file.filename):
            filename = secure_filename(file.filename)
            filePath = os.path.join(app.config['UPLOAD_FOLDER'], filename)
            file.save(filePath)
            
            model = whisper.load_model('base')
            result = model.transcribe(filePath, language="es")
            
            return {
                "text": result['text']
            }, 200
        
        
if __name__ == "__main__":
    app.run(host='0.0.0.0', port='8080', debug=True)