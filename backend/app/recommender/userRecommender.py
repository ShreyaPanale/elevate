from .recommender import Recommender 

#Class for Item similarity based Recommender System model
class UserRecommender(Recommender):
    def __init__(self):
        super().__init__()
    
    def create(self, uid):
        self.uid = uid
        
        # RETRIEVING DATA FROM THE DB
        tracks = self.firestore.getAllSongs()
        user = self.firestore.getUser(self.uid)

        # FEATURE WEIGHTS
        genre_weight = 75
        artist_weight = 24.95
        plays_weight = 0.05

        # INITIALISING FEATURE SCORES
        genre_scores = dict()
        artist_scores = dict()

        # PARSING DATA AND COMPUTING SCORES FOR GENRE AND ARTIST
        likedSongs = []
        for i in range(0,len(user['likedSongs']),10):
            x = self.firestore.getMultipleSongs(user['likedSongs'][i:i+10])
            likedSongs.extend(x)
        
        for song in likedSongs:
            if song['genre'] not in genre_scores:
                genre_scores[song['genre']] = 0
            genre_scores[song['genre']] += 1

            if song['artist'] not in artist_scores:
                artist_scores['aid'] = 0
            artist_scores['aid'] += 1

        # COMPUTING THE SIMILARITY SCORES FOR THE ITEM-ITEM FILTERING SYSTEM
        tracksAll = []
        for track in tracks:
            track['score'] = 0
            
            if (track['genre'] in genre_scores):
                track['score'] += genre_weight*genre_scores[track['genre']]
            
            if (track['artist'] in artist_scores):
                track['score'] += artist_weight*artist_scores[track['artist']]

            track['score'] += plays_weight*track['plays']
            
            if track['tid'] in user['likedSongs']:
                track['score'] = -1
            tracksAll.append(track)

        # SORTING THE RECOMMENDATIONS BASED ON COMPUTED SCORE
        tracksAll.sort(key= lambda x : x['score'], reverse=True)
    
        self.recommendations = tracksAll
    
    def recommend(self,limit):
        user_recommendations = self.recommendations[:limit]
        
        # additional logic if any
        return user_recommendations