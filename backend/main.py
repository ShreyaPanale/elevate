from flask import Flask,request,jsonify
from dotenv import load_dotenv
load_dotenv()
from app import *

#firestore imports

import firebase_admin
from firebase_admin import credentials
from firebase_admin import storage
import os
from werkzeug.utils import secure_filename
upload_folder ="app\\uploads"

cred = credentials.Certificate(os.getenv("CREDS_PATH"))
firebase_admin.initialize_app(cred, {
    'storageBucket': 'elevate-25d94.appspot.com'
})
bucket = storage.bucket()

app = Flask(__name__)

'''
allowed_extensions_cover = {'png', 'jpg', 'jpeg'}
def allowed_file_cover(filename):
    return '.' in filename and filename.rsplit('.',1)[1].lower() in allowed_extensions_cover

allowed_extensions_track = {'mp3'}
def allowed_file_track(filename):
    return '.' in filename and filename.rsplit('.',1)[1].lower() in allowed_extensions_track
'''

class FileUploader:
    def __init__(self):
        pass
    def uploaderimg(self,imagepath,cover):
        print(imagepath)
        blob = bucket.blob("cover/myfile.jpg")
        blob.upload_from_filename(
        imagepath
        )
        print(blob.public_url)

class APIServer:
    def __init__(self,port):
        self.port = port

    def start(self):
        app.run(port = self.port)
    
    @app.route('/ping')
    def test():
        return 'pong'

    # Users endpoints

    # create user api
    @app.route('/createUser')
    def createUser():
        return "create user called"
    
    # update user endpoint
    @app.route('/updateUser')
    def updateUser():
        return "update user called"
    
    # get user endpoint
    @app.route('/getUser')
    def getUser():
        return "get user called"

    # track endpoints

    @app.route('/addtrack',methods=['POST'])
    def addTrack():
        if request.method == 'POST':
            try:
                '''
                tnm=request.form['tname']
                artist=request.form['artist']
                genre=request.form['genre']
                desc=request.form['desc']
                descrip=request.form['descrip']
                '''
                cover=request.files['cover']
                #mp3file=request.files['mp3file']
                '''
                if cover and allowed_extensions_cover(cover.filename):
                    pass
                else:
                    raise Exception('Invalid file type for image!')
                
                if mp3file and allowed_extensions_track(track.filename):
                    pass
                else:
                    raise Exception('Invalid file type for track!')
                '''
                #Something happens here
                print(cover.filename)
                #print(cover.temporary_file_path)
                print(os.path.join(upload_folder,cover.filename))
                cover.save(os.path.join(upload_folder,cover.filename))
                imagepath = upload_folder+"/"+cover.filename
                uploader=FileUploader()
                uploader.uploaderimg(os.path.join(upload_folder,cover.filename),cover)
                
                response_msg=jsonify({"status":"200 ok","message":"success"}),200
                return response_msg 
            except Exception as e:
                print(e)
                response_msg=jsonify({"error":"400","message":"Bad request"}),400
                return response_msg

server = APIServer(port = 5000)
server.start()