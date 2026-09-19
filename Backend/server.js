const app = require('./src/app')
const connectToDB = require('./src/config/database')
const morgan = require('morgan')
require('dotenv').config()
app.use(morgan('dev'))
connectToDB()

const PORT = process.env.PORT || 3000
const server = app.listen(PORT, ()=>{
    console.log(`Server running on port ${PORT}`)
})

process.on('uncaughtException', (err) => {
    console.error('Uncaught Exception:', err)
    server.close(() => process.exit(1))
})

process.on('unhandledRejection', (reason) => {
    console.error('Unhandled Rejection:', reason)
    server.close(() => process.exit(1))
})