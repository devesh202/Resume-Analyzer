import { useContext } from "react";
import { AuthContext } from "../auth.context";
import { login, register, logout, getMe } from "../services/auth.api"
export const useAuth = () => {
    const context = useContext(AuthContext)
    const { user, setUser, loading, setLoading } = context

    const handleLogin = async ({ email, password }) => {
        try {
            setLoading(true);
            const data = await login({ email, password })
            setUser(data.user);
        } catch (error) {
            console.error("Error logging in", error);
        } finally {
            setLoading(false);
        }

    }

    const handleRegister = async ({ username, email, password }) => {
        try {
            setLoading(true);
            const data = await register({ username, email, password })
            setUser(data.user);
            setLoading(false);
        } catch (error) {
            console.error("Error registering", error);
        } finally {
            setLoading(false);
        }
    }

    const handleLogout = async () => {
        try {
            setLoading(true);
            await logout();
            setUser(null);
        } catch (error) {
            console.error("Error logging out", error);
        } finally {
            setLoading(false);
        }

    }

    const handleGetMe = async () => {
        try {
            setLoading(true);
            const data = await getMe();
            setUser(data.user);
        } catch (error) {
            console.error("Error getting me", error);
        } finally {
            setLoading(false);
        }

    }

    return { handleLogin, handleRegister, handleLogout, handleGetMe, user, loading }

}