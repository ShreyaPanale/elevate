from flask import Flask,request,jsonify
#configurations and environment setup
from dotenv import load_dotenv
load_dotenv()
from firebase import config
from utils import fileUploader
from app.users import UserManager
from app import track,artist
import os
app = Flask(__name__)

class APIServer:
    userManager = UserManager()
    def __init__(self,port):
        self.port = port

    def start(self):
        app.run(port = self.port)
    
    @app.route('/ping')
    def test():
        return 'pong'

    # Users endpoints

    # create user api
    @app.route('/user/create')
    def createUser():
        if request.method == 'POST':
            try:
                userManager.createUser( request.body.uid, request.body.email, request.body.displayName)
                return {"message":"success"},200
            except Exception as e:
                print(e)
                response_msg=jsonify({"error":"400","message":"Bad request"}),400
                return response_msg
    
    # update user endpoint
    @app.route('/user/update')
    def updateUser():
        if request.method == 'POST':
            try:
                userManager.updateUser(request.body.uid, request.body.email, request.body.displayName)
                return {"message":"success"},200
            except Exception as e:
                print(e)
                response_msg=jsonify({"error":"400","message":"Bad request"}),400
                return response_msg
    
    # get user endpoint
    @app.route('/user/:uid')
    def getUser(uid):
        return userManager.getUserData(uid)

    @app.route('/user/:uid/recommendations')
    def getRecommendations(uid):
        return userManager.getRecommendations(uid)

    @app.route('/user/like',methods=['POST'])
    def setLike():
        uid = request.args.get('uid')
        trackId = request.args.get('trackId')
        action = request.args.get('action')
        user = userManager.getUser(uid)
        if (action=='like'):
            user.likeSong(trackId)
        else:
            user.unlikeSong(trackId)
    
    @app.route('/user/playlists',methods=['POST'])
    def managePlaylist():
        uid = request.args.get('uid')
        trackId = request.args.get('playlistId')
        action = request.args.get('action')
        user = userManager.getUser(uid)
        if (action=='addPlaylist'):
            user.addPlaylist(playlistId)
        else:
            user.removePlaylist(trackId)

    @app.route('/user/history',methods=['POST'])
    def manageHistory():
        uid = request.args.get('uid')
        trackId = request.args.get('trackId')
        user = userManager.getUser(uid)
        user.addToHistory(trackId)

    # delete user endpoint
    @app.route('/user/delete')
    def deleteUser(uid):
        if request.method == 'POST':
            try:
                userManager.deleteUser(request.body.uid)
                return {"message":"success"},200
            except Exception as e:
                print(e)
                response_msg=jsonify({"error":"400","message":"Bad request"}),400
                return response_msg
    
    # track endpoints
    @app.route('/addtrack',methods=['POST'])
    def addTrack():
        if request.method == 'POST':
            try:
                tnm=request.form['tname']
                artist=request.form['artist']
                genre=request.form['genre']
                desc=request.form['desc']
                cover=request.files['cover']
                mp3file=request.files['mp3file']
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

                uploader=fileUploader.FileUploader()
                upload_folder ="app\\uploads"
                cover.save(os.path.join(upload_folder,cover.filename))
                coverurl = uploader.uploaderimg(os.path.join(upload_folder,cover.filename),cover)
                mp3file.save(os.path.join(upload_folder,mp3file.filename))
                mp3fileurl = uploader.uploadertrack(os.path.join(upload_folder,mp3file.filename),mp3file)
                
                trackManager=track.TrackManager()
                trackManager.addNewTrack(tnm=tnm,artist=artist,genre=genre,desc=desc,coverurl=coverurl,mp3fileurl=mp3fileurl)

                response_msg=jsonify({"status":"200 ok","message":"success"}),200
                return response_msg 
            except Exception as e:
                print(e)
                response_msg=jsonify({"error":"400","message":"Bad request"}),400
                return response_msg

    @app.route('/gettracks',methods=['GET'])
    def getTracks():
        try:
            trackManager=track.TrackManager()
            return trackManager.getTracks(),200
        except Exception as e:
            print(e)
            response_msg=jsonify({"error":"400","message":"Bad request"}),400
            return response_msg

    #artist endpoints

    @app.route('/addartist',methods=['POST'])
    def addArtist():
        try:
            anm=request.form['aname']
            artistManager=artist.ArtistManager()
            artistManager.addNewArtist(anm=anm)
            response_msg=jsonify({"status":"200 ok","message":"success"}),200
            return response_msg
        except Exception as e:
            print(e)
            response_msg=jsonify({"error":"400","message":"Bad request"}),400
            return response_msg

    @app.route('/getartists',methods=['GET'])
    def getArtists():
        try:
            artistManager=artist.ArtistManager()
            return artistManager.getArtists(),200
        except Exception as e:
            print(e)
            response_msg=jsonify({"error":"400","message":"Bad request"}),400
            return response_msg
    
server = APIServer(port = 5000)
server.start()