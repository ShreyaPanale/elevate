from firebase import firebase

#controller
firestore = firebase.FirestoreController()

class Playlist(object):
    def __init__(self,uid,name,tracks=[]):
        self.uid=uid
        self.pname=name
        self.tracks=tracks
    
    @classmethod
    def fromDB(cls,pid):
        playlistData=firestore.getPlaylist(pid)
        print(playlistData)
        return cls(playlistData['uid'],playlistData['pname'],playlistData['tracks'])
    
    def save(self):
        return firestore.savePlaylist(self)

    def data(self):
        return {'uid':self.uid,'pname':self.pname,'tracks':self.tracks}

    def addSong(self,trackID):
        self.tracks.append(trackID)
        self.save()

    def removeSong(self,trackID):
        self.tracks.remove(trackID)
        self.save()

    
class PlaylistManager(object):
    def __init__(self):
        pass

    def createPlaylist(self,uid,pname):
        new_playlist = Playlist(uid,pname)
        return new_playlist.save()

    def getPlaylistData(self,pid):
        playlist = Playlist.fromDB(pid)
        print("Playlist Data",playlist.data())
        return playlist.data()

    def deletePlaylist(self,pid):
        firestore.deletePlaylist(pid)