import { createContext, useState } from "react";
import { getMe } from "./services/auth.api";
import { useEffect } from "react";
export const AuthContext = createContext()


export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)

    const getAndSetUser = async () => {
        try {
            const data = await getMe();
            setUser(data.user);
        } catch (error) {
            console.warn("User is not logged in yet");
            setUser(null);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        getAndSetUser()
    }, [])

    return (
        <AuthContext.Provider value={{ user, setUser, loading, setLoading }}>
            {children}
        </AuthContext.Provider>
    )
}