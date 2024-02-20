from flask import Flask, render_template, request
import os
app = Flask(__name__)

#Nombre de la carpeta donde se guardaran los documentos
@app.route("/upload", methods = ["POST"])
def upload():
        f = request.files['file']
        f.save('./uploads/audio.mp3')
        return "success"

if __name__ == "__main__":
    app.run()