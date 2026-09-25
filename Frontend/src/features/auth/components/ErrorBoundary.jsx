import { useNavigate } from 'react-router-dom'
import { Component } from 'react'

function ErrorBoundaryContent({ error }) {
    const navigate = useNavigate()
    return (
        <div style={{ padding: '2rem', textAlign: 'center' }}>
            <h1>Something went wrong</h1>
            <p>{error?.message || 'An unexpected error occurred'}</p>
            <button onClick={() => navigate("/")}>Go to Home</button>
        </div>
    )
}

class ErrorBoundary extends Component {
    constructor(props) {
        super(props)
        this.state = { hasError: false, error: null }
    }

    static getDerivedStateFromError(error) {
        return { hasError: true, error }
    }

    componentDidCatch(error, errorInfo) {
        console.error('ErrorBoundary caught:', error, errorInfo)
    }

    render() {
        if (this.state.hasError) {
            return <ErrorBoundaryContent error={this.state.error} />
        }
        return this.props.children
    }
}

export default ErrorBoundary