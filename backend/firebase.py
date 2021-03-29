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

    def addNewTrack(self,track):
        doc_ref = self.db.collection(u'tracks').document()
        doc_ref.set({
            u'tname': track.tname,
            u'artist': track.artist,
            u'genre': track.genre,
            u'desc': track.desc
            u'coverurl': track.coverurl
            u'mp3fileurl': track,mp3fileurl
        })

    def getTracks(self):
        tracks_ref = db.collection(u'tracks')
        tracks = tracks_ref.stream()
        for track in tracks:
            print(f'{track.id} => {track.to_dict()}')
        
    def deleteTrack(self,id):
        db.collection(u'tracks').document(id).delete()

    def getTrack(self,tname):
        doc_ref = db.collection(u'tracks').document(id)
        doc = doc_ref.get()
        if doc.exists:
            print(f'Document data: {doc.to_dict()}')
        else:
            print(u'No such document!')