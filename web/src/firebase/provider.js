import React,{useContext,useState,useEffect} from 'react';
import {auth,googleProvider} from './';
import API from '../api';

export const AuthContext = React.createContext();

export const useAuth = () => {
    return useContext(AuthContext)
}

export const AuthProvider = ({children}) => {
    const [currentUser, setCurrentUser] = React.useState();
    const [loading, setLoading] = useState(true)
    const [errors, setErrors] = useState("");
    const [adminStat, setAdminStat] = React.useState(false)

     async function signup(email, password) {
        try {
          auth.createUserWithEmailAndPassword(email, password).then(async user => {
            let userData = {
              email: user.user.email,
              displayName: user.user.email.split("@")[0],
              uid: user.user.uid
            }
            await API.createUser(userData);
          })
          
        } 
        catch(e) {
          setErrors(e.message)
        }
      }
    
      async function login(email, password) {
        try {
          await auth.signInWithEmailAndPassword(email, password)
        }
        catch(e) {
          setErrors(e.message)
        }
      }
    
      function logout() {
        return auth.signOut()
      }
    
      function resetPassword(email) {
        return auth.sendPasswordResetEmail(email)
      }
      
      async function googleSignin(){
        try {
          await auth.signInWithPopup(googleProvider).then(async user => {
            if(user.additionalUserInfo.isNewUser){
              let userData = {
                email: user.user.email,
                displayName: user.user.displayName,
                uid: user.user.uid
              }
              await API.createUser(userData);
            }
          })
        } 
        catch(e) {
          setErrors(e.message)
        }
      }

      useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(user => {
          setLoading(true)
          setCurrentUser(user)
          if(user){
            API.userAdminStatus(user.uid).then(data => {
              console.log(data.admin)
              if(data.admin)
                setAdminStat(true);
              else
                setAdminStat(false)
              
            });
          }
          else setLoading(false)
        })
    
        return unsubscribe
      }, [])

    return (
        <AuthContext.Provider
            value = {{
                currentUser,
                login,
                signup,
                logout,
                resetPassword,
                googleSignin,
                errors,
                setErrors,
                adminStat
            }} 
        >
            {!loading && children}
        </AuthContext.Provider>
    )
}