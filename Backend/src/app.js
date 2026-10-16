const express = require("express")
const cookieParser = require("cookie-parser")
const cors = require("cors")
const rateLimit = require("express-rate-limit")
const app = express()
app.set('trust proxy', 1)
app.use(express.json())
app.use(cookieParser())
const allowedOrigins = [
    "https://resume-analyzer-two-virid.vercel.app",
    "http://localhost:5173",
    "http://localhost:3000",
    "http://localhost:4173",
    "http://127.0.0.1:5173",
    process.env.CLIENT_URL
].filter(Boolean)

app.use(cors({
    origin: function(origin, callback) {
        if (!origin || allowedOrigins.includes(origin) || origin.endsWith(".vercel.app") || origin.includes("localhost")) {
            return callback(null, true)
        }
        return callback(null, true)
    },
    credentials: true
}))
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
    standardHeaders: true,
    legacyHeaders: false,
})
app.use(limiter)

const authRouter = require("./routes/auth.routes")
const interviewRouter = require("./routes/interview.routes")

app.use('/api/auth', authRouter)
app.use('/api/interview', interviewRouter)

app.get('/api/health', (req, res) => {
    res.status(200).json({ status: 'ok', message: 'Resume Analyzer is running' })
})

app.use((req, res, next) => {
    res.status(404).json({ success: false, message: "Route not found" })
})

app.use((err, req, res, next) => {
    console.error(err.stack)
    res.status(500).json({ success: false, message: "Internal server error" })
})

module.exports = app