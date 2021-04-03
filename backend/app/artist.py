from firebase import firebase;

firestore = firebase.FirestoreController()

class Artist(object):
    def __init__(self,aname,photo,aid=""):
        self.aname=aname
        self.aid=aid
        self.photo=photo
          
    @classmethod
    def fromDB(cls,aid):
        artistData=firestore.getArtist(aid)
        print(artistData)
        return cls(artistData['aname'],artistData['aid'],artistData['photo'])

    def save(self):
        return firestore.addNewArtist(self)
    
    def data(self):
        return {'aname':self.aname,'aid':self.aid,'photo':self.photo}

    def getTracks(self):
        #return tracks by this artist 
        pass

class ArtistManager(object):
    def __init__(self):
        pass

    def addNewArtist(self,anm,photo):
        newArtist=Artist(anm,photo)
        return newArtist.save()

    def deleteArtist(self,id):
        firestore.deleteArtist(id)
        
    def getArtists(self):
        return firestore.getArtists()

    def getArtist(self,aid):
        return Artist.fromDB(aid)

    def getArtistData(self,aid):
        artist=Artist.fromDB(aid)
        return artist.data()