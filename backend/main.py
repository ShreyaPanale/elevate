import os

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
    

server = APIServer(port = 5000)
server.start()