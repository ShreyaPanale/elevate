from firebase import firebase;

firestore = firebase.FirestoreController()

class Artist(object):
    def __init__(self,aname):
        self.aname=aname
          
    @classmethod
    def fromDB(cls,aid):
        artistData=firestore.getArtist(aid)
        print(artistData)
        return cls(artistData['aname'])

    def save(self):
        firestore.addNewArtist(self)
    
    def data(self):
        return {'aname':self.aname}

    def getTracks(self):
        #return tracks by this artist 
        pass

class ArtistManager(object):
    def __init__(self):
        pass

    def addNewArtist(self,anm):
        newArtist=Artist(anm)
        newArtist.save()

    def deleteArtist(self,id):
        firestore.deleteArtist(id)
        
    def getArtists(self):
        return firestore.getArtists()

    def getArtist(self,aid):
        return Artist.fromDB(aid)

    def getArtistData(self,aid):
        artist=Artist.fromDB(aid)
        return artist.data()