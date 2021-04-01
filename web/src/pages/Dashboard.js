import React from 'react'
import { useAuth } from "../firebase/provider";
import { useHistory } from "react-router-dom";

const Dashboard = () => {
    const { logout,currentUser } = useAuth();
    const history = useHistory()
    async function handleLogout() {
        try {
          await logout()
          history.push("/signin")
        } catch {
        }
      }
    return (
        
        <div style={{display:"flex",flexDirection:"column",flexGrow:1,}}>
            <h1>Dashboard, hello {currentUser.email}</h1>
            <button variant="link" onClick={handleLogout}>
                Log Out
            </button>
        </div>
    )
}

export default Dashboard;