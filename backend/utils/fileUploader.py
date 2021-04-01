from firebase_admin import storage
from werkzeug.utils import secure_filename

import time

#intialising firebase bucket
bucket = storage.bucket()

# constants
allowed_extensions_cover = {'png', 'jpg', 'jpeg'}
allowed_extensions_track = {'mp3'}

def allowed_file_cover(filename):
    return '.' in filename and filename.rsplit('.',1)[1].lower() in allowed_extensions_cover

def allowed_file_track(filename):
    return '.' in filename and filename.rsplit('.',1)[1].lower() in allowed_extensions_track


class FileUploader:
    def __init__(self):
        pass
    def uploaderimg(self,imagepath,cover):
        blob = bucket.blob("cover/img"+str(time.time()))
        blob.upload_from_filename(
        imagepath
        )
        return(blob.public_url)
    def uploadertrack(self,trackpath,track):
        blob = bucket.blob("tracks/trk"+str(time.time()))
        blob.upload_from_filename(
        trackpath
        )
        return(blob.public_url)
