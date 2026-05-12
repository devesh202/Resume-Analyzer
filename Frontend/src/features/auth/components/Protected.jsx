import { useAuth } from "../hooks/useAuth"
import { useNavigate } from "react-router"
// protected component checks whether user is logged in or not

const Protected = ({ children }) => {
    const { user, loading } = useAuth()
    const navigate = useNavigate()

    if (loading) {
        return (<main><h1>loading....</h1></main>)
    }
    if (!user) {
        return navigate("/login")
    }
    return children
}
export default Protected