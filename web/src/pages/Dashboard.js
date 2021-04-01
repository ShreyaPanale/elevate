import React from 'react'
import { useAuth } from "../firebase/provider";
import { useHistory } from "react-router-dom";
import AppLayout from '../Layout/AppLayout';

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
        <AppLayout>
        <div style={{display:"flex",flexDirection:"column",flexGrow:1,}}>
            <h1>Dashboard, hello {currentUser.email}</h1>
            <button variant="link" onClick={handleLogout}>
                Log Out
            </button>
        </div>
        </AppLayout>
    )
}

export default Dashboard;