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
        print('Am in fromDB Track')
        return cls(trackData['tname'],trackData['artist'],trackData['genre'],trackData['desc'],trackData['coverurl'],trackData['mp3fileurl'])
    
    def saveTrack(self):
        firestore.addNewTrack(self)
    
    def data(self):
        return {'tname':self.tname,'artist':self.artist,'genre':self.genre,'desc':self.desc,'coverurl':self.coverurl,'mp3fileurl':self.mp3fileurl}
    
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
        
    def getTrack(self,tid):
        print("in track manager")
        return Track.fromDB(tid)
    
    def getTrackData(self,tid):
        track = Track.fromDB(tid)
        print("why not")
        print("hello",track.data())
        return track.data()
    
    def deleteTrack(self,tid):
        firestore.deleteTrack(tid)
        
    def getTracks(self):
        return firestore.getTracks()
