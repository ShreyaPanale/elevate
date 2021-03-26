import os

import firebase_admin
from firebase_admin import credentials
cred = credentials.Certificate(os.getenv("CREDS_PATH"))
firebase_admin.initialize_app(cred)

from flask import Flask
from dotenv import load_dotenv
load_dotenv()

app = Flask(__name__)

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


server = APIServer(port = 5000)
server.start()