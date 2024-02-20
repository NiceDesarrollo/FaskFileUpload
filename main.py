from flask import Flask, render_template, request
import os
app = Flask(__name__)

#Nombre de la carpeta donde se guardaran los documentos
app.config["UPLOAD_DIR"] = "uploads"
@app.route("/upload", methods = ["POST"])
def upload():
        file = request.files['file']
        file.save(os.path.join(app.config['UPLOAD_DIR'], file.filename))
        return "success"

if __name__ == "__main__":
    app.run()