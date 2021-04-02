import os

from firebase_admin import firestore

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
            u'desc': track.desc,
            u'coverurl': track.coverurl,
            u'mp3fileurl': track.mp3fileurl,
            u'duration':track.duration,
            u'plays':track.plays
        })

    def getTracks(self):
        tracks_ref = self.db.collection(u'tracks')
        tracks = tracks_ref.stream()
        trackarr=[]
        for track in tracks:
            print(f'{track.id} => {track.to_dict()}')
            trackarr.append(track.to_dict())
        return {"data":trackarr}
        
    def deleteTrack(self,id):
        doc_ref=self.db.collection(u'tracks').document(id)
        print(doc_ref)
        if doc_ref.get().exists:
            doc_ref.delete()
        else:
            return {'error':"Track doesn't exist"}

    def getTrack(self,tid):
        doc_ref = self.db.collection(u'tracks').document(tid)
        doc = doc_ref.get()
        if doc.exists:
            print("firebase controller")
            print(doc.to_dict())
            return doc.to_dict()
        else:
            return {'error':'Document not found,Missing track'}

    def retrieveTrackArtist(self,tid):
        track = self.db.collection(u'tracks').document(tid).get().to_dict()
        artist = self.db.collection(u'artists').document(track['artist']).get().to_dict()
        return artist['aname']

    #Artist controller functions

    def addNewArtist(self,artist):
        doc_ref = self.db.collection(u'artists').document()
        doc_ref.set({
            u'aname': artist.aname,
        })

    def getArtist(self,aid):
        doc_ref = self.db.collection(u'artists').document(aid)
        doc = doc_ref.get()
        if doc.exists:
            return doc.to_dict()
        else:
            return {'error':'Document not found,Missing artist'}


    def getArtists(self):
        artists_ref = self.db.collection(u'artists')
        artists = artists_ref.stream()
        artistarr=[]
        for artist in artists:
            print(f'{artist.id} => {artist.to_dict()}')
            artistarr.append(artist.to_dict())
        return {"data":artistarr}
        
    def deleteArtist(self,id):
        doc_ref=self.db.collection(u'artists').document(id)
        if doc_ref.get().exists:
            doc_ref.delete()
        else:
            return {'error':"Artist doesn't exist"}