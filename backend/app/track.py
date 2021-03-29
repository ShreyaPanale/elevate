from firebase import firebase

class Track(object):
    def __init__(self,tname,artist,genre,desc,coverurl,mp3fileurl):
        self.tname=tname
        self.artist=artist
        self.genre=genre
        self.desc=desc
        self.coverurl=coverurl
        self.mp3fileurl=mp3fileurl
        
    def saveTrack(self):
        pass
    
    def modifyTrack(self):
        pass

    def getTrack(self):
        controller=firebase.FirestoreController()
        controller.getTrack(self.tname)

class TrackManager(object):
    def __init__(self):
        pass
    def addNewTrack(self,tnm,artist,genre,desc,coverurl,mp3fileurl):
        newTrack=Track(tnm,artist,genre,desc,coverurl,mp3fileurl)
        controller=firebase.FirestoreController()
        controller.addNewTrack(newTrack)

    def deleteTrack(self,tname):
        controller=firebase.FirestoreController()
        controller.deleteTracks(tname)
        
    def getTracks(self):
        controller=firebase.FirestoreController()
        return controller.getTracks()
