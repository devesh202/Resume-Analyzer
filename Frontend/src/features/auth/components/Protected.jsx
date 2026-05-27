import { useAuth } from "../hooks/useAuth"
import { Navigate } from "react-router"
// protected component checks whether user is logged in or not

const Protected = ({ children }) => {
    const { user, loading } = useAuth()

    if (loading) {
        return (
            <div className="loading-screen">
                <div className="spinner"></div>
                <h1>Loading Profile...</h1>
            </div>
        )
    }
    if (!user) {
        return <Navigate to="/login" replace />
    }
    return children
}
export default Protected