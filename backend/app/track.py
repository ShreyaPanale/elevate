from firebase import firebase

firestore = firebase.FirestoreController()

class Track(object):
    def __init__(self,tname,artist,genre,desc,coverurl,mp3fileurl):
        self.tname=tname
        self.artist=artist
        self.genre=genre
        self.desc=desc
        self.coverurl=coverurl
        self.mp3fileurl=mp3fileurl
        
    @classmethod
    def fromDB(cls,tid):
        trackData = firestore.getTrack(tid)
        return cls(trackData['tname'],trackData['artist'],trackData['genre'],trackData['desc'],trackData['coverurl'],trackData['mp3fileurl'])
    
    def saveTrack(self):
        firestore.addNewTrack(self)
    
    def modifyTrack(self):
        pass

    def addToPlaylist(self,playlistid):
        pass

    def removeFromPlaylist(self,playlistid):
        pass

class TrackManager(object):
    def __init__(self):
        pass
    def addNewTrack(self,tnm,artist,genre,desc,coverurl,mp3fileurl):
        newTrack=Track(tnm,artist,genre,desc,coverurl,mp3fileurl)
        newTrack.saveTrack()
        
    def getTrack(self,trackid):
        return Track.fromDB(trackid)
    
    def deleteTrack(self,tname):
        firestore.deleteTracks(tname)
        
    def getTracks(self):
        return firestore.getTracks()
