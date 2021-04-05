import os

from firebase_admin import firestore

class FirestoreController:
    def __init__(self):
        self.db = firestore.client()

    def getUser(self, uid):
        return self.db.collection('users').document(uid).get().to_dict()
        
    def saveUser(self, user):
        self.db.collection('users').document(user.uid).set(user.data())

    def deleteUser(self, uid):
        self.db.collection('users').document(uid).delete()

    def userAdminStatus(self,uid):
        user=self.db.collection('users').document(uid).get().to_dict()
        if "superUser" in user:
            if(user["superUser"]):
                return True
            else:
                return False
        else:
            return False


    def addNewTrack(self,track):
        doc_ref = self.db.collection(u'tracks').document()
        tid=doc_ref.id
        doc_ref.set({
            u'tname': track.tname,
            u'artist': track.artist,
            u'genre': track.genre,
            u'desc': track.desc,
            u'coverurl': track.coverurl,
            u'mp3fileurl': track.mp3fileurl,
            u'duration':track.duration,
            u'plays':track.plays,
            u'tid':tid
        })
        return doc_ref.id

    def getTracks(self,uid):
        tracks_ref = self.db.collection(u'tracks')
        likedSongs=self.db.collection(u'users').document(uid).get().to_dict()['likedSongs']
        tracks = tracks_ref.stream()
        trackarr=[]
        for track in tracks:
            t=track.to_dict()
            if t['tid'] in likedSongs:
                t['like']=1
            else:
                t['like']=0
            trackarr.append(t)
        return {"data":trackarr}
        
    def getTracksByArtist(self,aid):
        tracks_ref = self.db.collection(u'tracks')
        tracks_ref=tracks_ref.where(u'artist',u'==',aid)
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
        print("am here")
        doc_ref = self.db.collection(u'artists').document()
        aid=doc_ref.id
        doc_ref.set({
            u'aname': artist.aname,
            u'photo': artist.photo,
            u'aid':aid
        })
        return aid

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

    #playlist controller functions

    def getPlaylist(self,pid):
        doc_ref = self.db.collection(u'playlists').document(pid)
        doc = doc_ref.get()
        if doc.exists:
            return doc.to_dict()
        else:
            return {'error':'Document not found,Missing playlist'}

    def getPlaylistTracks(self,pid):
        playlist_ref = self.db.collection(u'playlists').document(pid).get()
        if playlist_ref.exists:
            playlist_ref=playlist_ref.to_dict()
            tids=playlist_ref['tracks']
            tracks=[]
            i=0
            while(1):
                if i+10<=len(tids):
                    temp_ref=self.db.collection(u'tracks').where(u'tid','in',tids[i:i+10])
                    temp=temp_ref.stream()
                    for t in temp:
                        print(temp.to_dict())
                        tracks.append(t.to_dict())
                else:
                    temp_ref=self.db.collection(u'tracks').where(u'tid','in',tids[i:len(tids)])
                    temp=temp_ref.stream()
                    for t in temp:
                        tracks.append(t.to_dict())
                    break
                i=i+10
            res = {
                "pname":playlist_ref['pname'],
                "pid":pid,
                "tracks":tracks
            }
            return {"data":res}
        else:
            return {'error':'Document not found,Missing Playlist'}

    def savePlaylist(self,playlist):
        doc_ref = self.db.collection('playlists').document()
        pd=playlist.data()
        pd['pid']=doc_ref.id
        doc_ref.set(pd)
        return doc_ref.id

    def updatePlaylist(self,playlist,pid):
        doc_ref = self.db.collection('playlists').document(pid)
        doc_ref.set(playlist.data())

    def deletePlaylist(self,pid):
        doc_ref=self.db.collection(u'playlists').document(pid)
        if doc_ref.get().exists:
            doc_ref.delete()
        else:
            return {'error':"Playlist doesn't exist"}

    def getTopSongs(self,limit):
        tracks = self.db.collection('tracks').order_by('plays').limit(limit).stream()
        return [track.to_dict() for track in tracks]
    
    def getAllSongs(self):
        tracks = self.db.collection('tracks').stream()
        return [track.to_dict() for track in tracks]
    
    def getAllUsers(self):
        users = self.db.collection('users').stream()
        return [user.to_dict() for user in users]
    
    def getMultipleSongs(self, trackIds):
        tracks = self.db.collection('tracks').where('tid', 'in', trackIds).stream()
        return [track.to_dict() for track in tracks]