// add firebase config here
import firebase from "firebase/app"
import "firebase/auth"

const app = firebase.initializeApp({
    apiKey: "AIzaSyAA3hkqM63a1DR-tOkuHOxFmxpgbTOFTpo",
    authDomain: "elevate-25d94.firebaseapp.com",
    projectId: "elevate-25d94",
    storageBucket: "elevate-25d94.appspot.com",
    messagingSenderId: "564300801776",
    appId: "1:564300801776:web:9bd69a0cd56a11a3a84435"
})

export const auth = app.auth()
export const googleProvider = new firebase.auth.GoogleAuthProvider();
export default app