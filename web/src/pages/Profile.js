import React from 'react'
import { useAuth } from "../firebase/provider";
import { useHistory } from "react-router-dom";

const Profile = () => {
    const history = useHistory();
    const { logout,currentUser } = useAuth();
    async function handleLogout() {
        try {
          await logout()
          history.push("/signin")
        } catch {
        }
      }
    return (
        <div style={{display:"flex",flexDirection:"column",flexGrow:1,}}>
            <h1>Profile</h1>
            <h2>hello {currentUser.email}</h2>
            <button variant="link" onClick={handleLogout}>
                Log Out
            </button>
        </div>
    )
}

export default Profile;