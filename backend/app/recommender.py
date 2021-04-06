from firebase import firebase
firestore = firebase.FirestoreController();

class PopularityRecommender():
    def __init__(self):
        self.uid = None
        self.popularity_recommendations = None
        
    #Create the popularity based recommender system model
    def create(self, uid, limit):
        self.uid = uid
        
        #initialise firebase controller
        top = firestore.getTopSongs(limit);

        #Get the top {limit} recommendations
        self.popularity_recommendations = top

    #Use the popularity based recommender system model to make recommendations
    def recommend(self, uid):    
        popularity_recommendations = self.popularity_recommendations
        
        # additional logic if any
        return popularity_recommendations
    

#Class for Item similarity based Recommender System model
class UserRecommender():
    def __init__(self):
        self.uid = None
        self.user_recommendations = None
        self.tracks = None
        self.users = None
        
    def create(self, uid):
        self.uid = uid
        self.tracks = firestore.getAllSongs()
        user = firestore.getUser(self.uid)

        genre_weight = 75
        artist_weight = 20
        plays_weight = 5

        genre_scores = dict()
        artist_scores = dict()
        likedSongs = []

        for i in range(0,len(user['likedSongs']),10):
            x = firestore.getMultipleSongs(user['likedSongs'][i:i+10])
            likedSongs.extend(x)
        
        print(likedSongs, user['likedSongs'])
        for song in likedSongs:
            if song['genre'] not in genre_scores:
                genre_scores[song['genre']] = 0
            genre_scores[song['genre']] += 1

            if song['artist'] not in artist_scores:
                artist_scores['aid'] = 0
            artist_scores['aid'] += 1


        tracksAll = []
        for track in self.tracks:
            track['score'] = 0
            
            if (track['genre'] in genre_scores):
                track['score'] += genre_weight*genre_scores[track['genre']]
            
            if (track['artist'] in artist_scores):
                track['score'] += artist_weight*artist_scores[track['artist']]

            track['score'] += plays_weight*track['plays']
            
            if track['tid'] in user['likedSongs']:
                track['score'] = -1
            tracksAll.append(track)

        tracksAll.sort(key= lambda x : x['score'], reverse=True)
    
        self.user_recommendations = tracksAll
    
    def recommend(self,limit):
        user_recommendations = self.user_recommendations[:limit]
        
        # additional logic if any
        return user_recommendations
    

