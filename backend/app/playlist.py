from firebase import firebase

#controller
firestore = firebase.FirestoreController()

class Playlist(object):
    def __init__(self,uid,name,tracks=[],pid=""):
        self.uid=uid
        self.pname=name
        self.tracks=tracks
        self.pid=pid
    
    @classmethod
    def fromDB(cls,pid):
        try:
            playlistData=firestore.getPlaylist(pid)
            return cls(playlistData['uid'],playlistData['pname'],playlistData['tracks'],playlistData['pid'])
        except Exception as e:
            print(e)
    
    def save(self):
        return firestore.savePlaylist(self)

    def update(self,pid):
        return firestore.updatePlaylist(self,pid)

    def data(self):
        return {'uid':self.uid,'pname':self.pname,'tracks':self.tracks,'pid':self.pid}



    def addSong(self,pid,trackID):
        self.tracks.append(trackID)
        self.update(pid)

    def removeSong(self,pid,trackID):
        self.tracks.remove(trackID)
        self.update(pid)

    
class PlaylistManager(object):
    def __init__(self):
        pass

    def createPlaylist(self,uid,pname):
        new_playlist = Playlist(uid,pname)
        return new_playlist.save()

    def getPlaylist(self,pid):
        return Playlist.fromDB(pid)
    
    def getPlaylistData(self,pid):
        playlist = Playlist.fromDB(pid)
        return playlist.data()

    def getPlaylistTracks(self,pid):
        return firestore.getPlaylistTracks(pid)

    def deletePlaylist(self,pid):
        firestore.deletePlaylist(pid)