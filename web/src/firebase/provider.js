import React from 'react';

export const AuthContext = React.createContext();

export const AuthProvider = ({children}) => {
    const [user, setUser] = React.useState(true);
    const [admin, setAdmin] = React.useState(true);
    return (
        <AuthContext.Provider
            value = {{
                user,
                setUser,
                admin,
                setAdmin
            }} 
        >
            {children}
        </AuthContext.Provider>
    )
}