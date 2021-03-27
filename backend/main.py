from flask import Flask
from dotenv import load_dotenv
load_dotenv()

app = Flask(__name__)


allowed_extensions_cover = {'png', 'jpg', 'jpeg'}
def allowed_file_cover(filename):
    return '.' in filename and filename.rsplit('.',1)[1].lower() in allowed_extensions_cover

allowed_extensions_track = {'mp3'}
def allowed_file_track(filename):
    return '.' in filename and filename.rsplit('.',1)[1].lower() in allowed_extensions_track

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
                tnm=request.form['tname']
                artist=request.form['artist']
                genre=request.form['genre']
                desc=request.form['desc']
                descrip=request.form['descrip']
                cover=request.files['cover']
                mp3file=request.files['mp3file']

                if cover and allowed_extensions_cover(cover.filename):
                    pass
                else:
                    raise Exception('Invalid file type for image!')
                if mp3file and allowed_extensions_track(track.filename):
                    pass
                else:
                    raise Exception('Invalid file type for track!')

                #Something happens here
                
                response_msg=jsonify({"status":"200 ok","message":"success"}),200
                return response_msg 
            except Exception as e:
                print(e)
                response_msg=jsonify({"error":"400","message":"Bad request"}),400
                return response_msg

server = APIServer(port = 5000)
server.start()