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
        return cls(artistData['aname'],artistData['aid'],artistData['photo'])

    def save(self):
        return firestore.addNewArtist(self)
    
    def data(self):
        return {'aname':self.aname,'aid':self.aid,'photo':self.photo}

    def update(self,aid):
        firestore.updateArtist(self,aid)
    
    def delete(self):
        firestore.deleteArtist(self.aid)


class ArtistManager(object):
    def __init__(self):
        pass

    def addNewArtist(self,anm,photo):
        newArtist=Artist(anm,photo)
        return newArtist.save()

    def deleteArtist(self,id):
        artist=Artist.fromDB(id)
        artist.delete()

    def updateArtist(self,aid,anm,photo):
        updatedArtist=Artist(anm,photo)
        updatedArtist.update(aid)
        
    def getArtists(self):
        return firestore.getArtists()

    def getArtist(self,aid):
        return Artist.fromDB(aid)

    def getArtistData(self,aid):
        artist=Artist.fromDB(aid)
        return artist.data()