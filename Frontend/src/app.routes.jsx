import { createBrowserRouter } from 'react-router-dom'
import Login from './features/auth/pages/Login'
import Register from './features/auth/pages/Register'
import Protected from './features/auth/components/Protected'
import Home from './features/interview/pages/Home'
import Interview from './features/interview/pages/Interview'
import ErrorBoundary from './features/auth/components/ErrorBoundary'

export const router = createBrowserRouter([
    {
        path: "/",
        element: <Protected><Home /></Protected>,
        errorElement: <ErrorBoundary />,
    },
    {
        path: "/login",
        element: <Login />,
        errorElement: <ErrorBoundary />,
    },
    {
        path: "/register",
        element: <Register />,
        errorElement: <ErrorBoundary />,
    },
    {
        path: "/interview",
        element: <Protected><Interview /></Protected>,
        errorElement: <ErrorBoundary />,
    },
    {
        path: "/interview/result/:id",
        element: <Protected><Interview /></Protected>,
        errorElement: <ErrorBoundary />,
    }
])