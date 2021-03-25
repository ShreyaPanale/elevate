import React from 'react';

export const AuthContext = React.createContext();

export const AuthProvider = ({children}) => {
    //Change to false for logged out
    const [user, setUser] = React.useState(true);
    return (
        <AuthContext.Provider
            value = {{
                user,
                setUser
            }} 
        >
            {children}
        </AuthContext.Provider>
    )
}