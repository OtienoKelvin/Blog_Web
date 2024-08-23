import axios from 'axios';
import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext();

export const AuthContextProvider = ({children}) => {
    const [currentUser, setCurrentUser] = useState(() => {
        const storedUser = localStorage.getItem('user');
        return storedUser ? JSON.parse(storedUser) : null;
    });

    const login = async (inputs) => {
        try {
            const res = await axios.post('/auth/login', inputs);
            setCurrentUser(res.data);  // Assuming the user data is returned in res.data
        } catch (err) {
            console.error('Login failed:', err);
            // Optionally, handle the error further (e.g., set an error state)
        }
    };

    const logout = async () => {
        try {
            await axios.post('/auth/logout');
            setCurrentUser(null);
        } catch (err) {
            console.error('Logout failed:', err);
            // Optionally, handle the error further
        }
    };

    useEffect(() => {
        if (currentUser) {
            localStorage.setItem('user', JSON.stringify(currentUser));
        } else {
            localStorage.removeItem('user');
        }
    }, [currentUser]);

    return (
        <AuthContext.Provider value={{currentUser, login, logout}}>
            {children}
        </AuthContext.Provider>
    );
};


