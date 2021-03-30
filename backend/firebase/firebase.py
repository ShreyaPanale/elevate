import os

from firebase_admin import firestore

class FirestoreController:
    def __init__(self):
        self.db = firestore.client()

    def getUser(self, uid):
        user = self.db.collection('users').document(uid).get()
        user['likedSongs'] = user.get('likedSongs',[])
        user['playlists'] = user.get('playlists',[])
        user['recommendations'] = user.get('recommendations',[])
        user['history'] = user.get('history',[])
        return user
    
    def saveUser(self, user):
        self.db.collection('users').document(user.uid).set(user.data())

    def deleteUser(self, uid):
        self.db.collection('users').document(user.uid).delete()

    def addNewTrack(self,track):
        doc_ref = self.db.collection(u'tracks').document()
        doc_ref.set({
            u'tname': track.tname,
            u'artist': track.artist,
            u'genre': track.genre,
            u'desc': track.desc,
            u'coverurl': track.coverurl,
            u'mp3fileurl': track.mp3fileurl
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
        self.db.collection(u'tracks').document(id).delete()

    def getTrack(self,tname):
        doc_ref = self.db.collection(u'tracks').document(id)
        doc = doc_ref.get()
        if doc.exists:
            print(f'Document data: {doc.to_dict()}')
        else:
            print(u'No such document!')

    #Artist controller functions

    def addNewArtist(self,artist):
        doc_ref = self.db.collection(u'artists').document()
        doc_ref.set({
            u'aname': artist.aname,
        })

    def getArtists(self):
        artists_ref = self.db.collection(u'artists')
        artists = artists_ref.stream()
        artistarr=[]
        for artist in artists:
            print(f'{artist.id} => {artist.to_dict()}')
            artistarr.append(artist.to_dict())
        return {"data":artistarr}
        
    def deleteArtist(self,id):
        self.db.collection(u'artists').document(id).delete()