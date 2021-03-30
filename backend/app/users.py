from firebase import firebase

# controller to call database updates
firestore = firebase.FirestoreController();

# class to handle creation and deletion of users, as well as getting multiple users.
class UserManager(object):
    def __init__(self):
        pass

    # creating the new user object
    def createUser(self,email,uid,displayName):
        new_user = User(email,uid,displayName);
        new_user.save();

    # getting the user object
    def getUser(self,uid):
        user = User.fromDB(uid)
        return user.data()

    #deleting the user with id = uid
    def deleteUser(self,uid):
        # TOOD: implement delete
        pass

# class to handle user objects and related functions
class User(object):
    def __init__(self,email,uid, displayName,likedSongs=[],playlists=[],recommendations = [], history = []):
        self.email = email
        self.uid = uid
        self.displayName = displayName
        self.likedSongs = likedSongs
        self.playlists = playlists
        self.recommendations = recommendations
        self.history = history

    @classmethod
    def fromDB(cls,uid):
        userData = firestore.getUser(uid)
        return cls(userData.email,userData.uid, userData.displayName,userData.likedSongs,userData.playlists,userData.recommendations, userData.history)

    # saving the user on to the database
    def save(self):
        firestore.saveUser(self)
    
    #returning the user details as a dictionary
    def data(self):
        return {'email': self.email,'uid': self.uid,'displayName': self.displayName,'likedSongs': self.likedSongs,'playlists': self.playlists,'recommendations': self.recommendations,'history': self.history}
    
    def likeSong(self, trackId):
        pass

    def getRecommendations(self):
        pass
    
    def addPlaylist(self, playlistId):
        pass

    def addToHistory(self,playlistId):
        pass