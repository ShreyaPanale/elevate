import os

import firebase_admin
from firebase_admin import credentials,firestore

cred = credentials.Certificate(os.getenv("CREDS_PATH"))
firebase_admin.initialize_app(cred)

class FirestoreController:
    def __init__(self):
        self.db = firestore.client()

    def getUser(self, id):
        pass
        #return self.db.collection('users').document(id).get()
    
    def createUser(self):
        pass

    def addNewTrack(self):
        pass