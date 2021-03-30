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
        firestore.deleteUser(uid)

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

    # Retrives user object from the database
    @classmethod
    def fromDB(cls,uid):
        userData = firestore.getUser(uid)
        return cls(userData.email,userData.uid, userData.displayName,userData.likedSongs,userData.playlists,userData.recommendations, userData.history)

    # saving the user on to the database
    def save(self):
        firestore.saveUser(self)
    
    # returning the user details as a dictionary
    def data(self):
        return {'email': self.email,'uid': self.uid,'displayName': self.displayName,'likedSongs': self.likedSongs,'playlists': self.playlists,'recommendations': self.recommendations,'history': self.history}
    
    # adds the liked song to its list
    def likeSong(self, trackId):
        self.likedSongs = self.likedSongs.append(trackId)
        self.save()

    # removes the liked song from its list
    def unLikeSong(self, trackId):
        self.likedSongs = self.likedSongs.remove(trackId)
        self.save()

    # recommendor system, to be implemented
    def getRecommendations(self):
        pass
    
    # adds the created playlist to the user
    def createPlaylist(self, playlistId):
        self.playlists = self.playlists.append(playlistId)
        self.save()

    # removes the playlist from users list
    def removePlaylist(self, playlistId):
        self.playlists = self.playlists.remove(playlistId)
        self.save()

    # adds the song played recently to the users history
    def addToHistory(self,trackId):
        historyLimit = 20 # tracks only the last 20 iterations
        self.history = self.history.append(trackId)[:historyLimit]
        self.save()

