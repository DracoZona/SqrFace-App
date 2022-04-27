from flask import Flask, request, jsonify, Response, send_file
import cv2
import pickle
import numpy as np
import jsonpickle
from flask_ngrok import run_with_ngrok
from werkzeug.utils import secure_filename

app = Flask(__name__)


@app.route('/face_detect', methods=['POST'])
def face_detect():
    r = request
    img = request.files.get("image", None)
    print(img)
    imgdata = img.read()

    npimage = np.fromstring(imgdata, np.uint8)
    img = cv2.imdecode(npimage, cv2.IMREAD_COLOR)

    face_cascade = cv2.CascadeClassifier('artifacts/cascades/data/haarcascade_frontalface_alt2.xml')
    recognizer = cv2.face.LBPHFaceRecognizer_create()
    recognizer.read("artifacts/trained-model.yml")

    labels = {"persons_name": 1}
    with open("artifacts/labels.pickle", 'rb') as f:
        labels = pickle.load(f)
        labels = {v: k for k, v in labels.items()}
    gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
    faces = face_cascade.detectMultiScale(gray, scaleFactor=1.5, minNeighbors=5)
    face_detected_x = 0
    face_detected_y = 0
    end_cord_x = 0
    end_cord_y = 0

    height, width = img.shape[:-1]
    image_w = width
    image_h = height
    detected_name = ''
    for (x, y, w, h) in faces:
        roi_gray = gray[y:y + h, x:x + w]

        id_, conf = recognizer.predict(roi_gray)

        if conf >= 15:  # and conf<= 85:
            print(labels[id_])
            name = labels[id_]
            detected_name = labels[id_]


        img_item = "artifacts/saved-media/sample.png"


        face_detected_x = x
        face_detected_y = y
        end_cord_x = w
        end_cord_y = h

    response = {face_detected_x, face_detected_y, detected_name, end_cord_x, end_cord_y}
    response_pickled = jsonpickle.encode(response)
    return jsonify(
        str(face_detected_x),
        str(face_detected_y),
        str(detected_name),
        str(end_cord_x),
        str(end_cord_y),
        str(image_w),
        str(image_h),
    )

if __name__ == "__main__":
    print("Starting Python Flask Server...")
    app.run(host="192.168.1.12", port=5000, threaded=True, debug=True)
    #app.run()