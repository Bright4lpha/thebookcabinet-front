import React, { createContext, useContext, useState, useEffect } from 'react';
import { UserType } from './types/types';

type UserContextType = {
    user: UserType | null;
    setUser: (user: UserType | null) => void;
};

const UserContext = createContext<UserContextType | null>(null);

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState<UserType | null>(null);

    useEffect(() => {
        if (localStorage.getItem('authToken')) {
            // Fetch user data if authToken exists
            import('./services/AuthServices').then(({ getMe }) => {
                getMe().then(fetchedUser => {
                    setUser(fetchedUser);
                });
            });
        }
    }, []);

    return (
        <UserContext.Provider value={{ user, setUser }}>
            {children}
        </UserContext.Provider>
    );
}

export function useUser() {
    return useContext(UserContext);
}