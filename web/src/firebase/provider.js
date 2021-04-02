import React,{useContext,useState,useEffect} from 'react';
import {auth,googleProvider} from './'
export const AuthContext = React.createContext();

export const useAuth = () => {
    return useContext(AuthContext)
}

export const AuthProvider = ({children}) => {
    const [currentUser, setCurrentUser] = React.useState();
    const [loading, setLoading] = useState(true)
    const [errors, setErrors] = useState("");

     async function signup(email, password) {
        try {
          await auth.createUserWithEmailAndPassword(email, password)
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
          await auth.signInWithPopup(googleProvider)
        } 
        catch(e) {
          setErrors(e.message)
        }
      }

      useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(user => {
          setCurrentUser(user)
          setLoading(false)
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
                setErrors
            }} 
        >
            {!loading && children}
        </AuthContext.Provider>
    )
}