from firebase import firebase

#controller
firestore = firebase.FirestoreController()

class Playlist(object):
    def __init__(self,uid,tracks=[]):
        self.uid=uid
        self.tracks=tracks
    
    @classmethod
    def fromDB(cls,pid):
        playlistData=firestore.getPlaylist(pid)
        return cls(playlistData['uid'],playlistData['tracks'])
    
    def save(self):
        firestore.savePlaylist(self)

    def data(self):
        return {'uid':self.uid,'tracks':self.trackid}

    def addSong(self,trackID):
        self.tracks.append(trackID)
        self.save()

    def removeSong(self,trackID):
        self.tracks.remove(trackID)
        self.save()

    
class PlaylistManager(object):
    def __init__(self):
        pass

    def createPlaylist(self,uid):
        new_playlist = Playlist(uid)
        new_playlist.save()

    def getPlaylistData(self,pid):
        playlist = Playlist.fromDB(pid)
        return playlist.data()

    def deletePlaylist(self,pid):
        firestore.deletePlaylist(pid)