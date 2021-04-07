from .recommender import Recommender

class PopularityRecommender(Recommender):
    def __init__(self):
        super().__init__()

    #Create the popularity based recommender system model
    def create(self, uid):
        self.uid = uid

        #Get the top recommendations, max 20
        self.recommendations = self.firestore.getTopSongs();

    #Use the popularity based recommender system model to make recommendations
    def recommend(self, limit):    
        popularity_recommendations = self.recommendations[:limit]
        
        # additional logic if any
        return popularity_recommendations