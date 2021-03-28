import os, sys
currentdir = os.path.dirname(os.path.realpath(__file__))
parentdir = os.path.dirname(currentdir)
sys.path.append(parentdir)
 
from firebase import firebase

class Track(object):
    def __init__(self,tname,artist,genre,desc,cover,mp3file):
        self.tname=tname
        self.artist=artist
        self.genre=genre
        self.desc=desc
        self.cover=cover
        self.mp3file=mp3file
        
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
    def addNewTrack(self,tnm,artist,genre,desc,coberurl,mp3fileurl):
        newTrack=Track(tnm,artist,genre,desc,coverurl,mp3fileurl)
        controller=firebase.FirestoreController()
        controller.addNewTrack(newTrack)

    def deleteTrack(self,tname):
        controller=firebase.FirestoreController()
        controller.deleteTracks(tname)
        

    def getTracks(self):
        controller=firebase.FirestoreController()
        controller.getTracks()
