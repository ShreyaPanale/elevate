from firebase import firebase

firestore = firebase.FirestoreController()

class Track(object):
    def __init__(self,tname,artist,genre,desc,coverurl,mp3fileurl,duration,plays=0):
        self.tname=tname
        self.artist=artist
        self.genre=genre
        self.desc=desc
        self.coverurl=coverurl
        self.mp3fileurl=mp3fileurl
        self.plays=plays
        self.duration=duration
        
    @classmethod
    def fromDB(cls,tid):
        trackData = firestore.getTrack(tid)
        return cls(trackData['tname'],trackData['artist'],trackData['genre'],trackData['desc'],trackData['coverurl'],trackData['mp3fileurl'],trackData['plays'],trackData['duration'])
    
    def saveTrack(self):
        firestore.addNewTrack(self)

    def data(self):
        return {'tname':self.tname,'artist':self.artist,'genre':self.genre,'desc':self.desc,'coverurl':self.coverurl,'mp3fileurl':self.mp3fileurl,'plays':self.plays,'duration':self.duration}
    
    def modifyTrack(self):
        pass

class TrackManager(object):
    def __init__(self):
        pass
    def addNewTrack(self,tnm,artist,genre,desc,coverurl,mp3fileurl,duration):
        newTrack=Track(tnm,artist,genre,desc,coverurl,mp3fileurl,duration)
        newTrack.saveTrack()
        
    def getTrack(self,tid):
        return Track.fromDB(tid)
    
    def getTrackData(self,tid):
        track = Track.fromDB(tid)
        return track.data()

    def retrieveTrackArtist(self,tid):
        return firestore.retrieveTrackArtist(tid)
    
    def updateTrack(self,tname,artist,genre,desc):
        pass

    def deleteTrack(self,tid):
        firestore.deleteTrack(tid)
        
    def getTracks(self):
        return firestore.getTracks()
