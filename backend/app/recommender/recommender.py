from firebase import firebase

class Recommender(object):
    def __init__(self):
        self.uid = None
        self.recommendations = None
        self.firestore = firebase.FirestoreController();

    # Create and initialize the user recommendations
    def create(self, uid):
        pass

    # Sort and limit the recommendations acc to user parameters
    def recommend(self, limit):    
        pass
