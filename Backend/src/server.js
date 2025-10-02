require('dotenv').config()
const express = require('express')
const cors = require('cors')
const morgan = require('morgan')
const helmet = require('helmet')
const connectDB = require('./config/db')
const authRoutes = require('./routes/auth')

const app = express()
const PORT = process.env.PORT || 5000
const clientOrigin = process.env.CLIENT_URL || 'http://localhost:5173'
const allowedOrigins = (process.env.ALLOWED_ORIGINS || '')
  .split(',')
  .map((origin) => origin.trim())
  .filter(Boolean)
if (!allowedOrigins.includes(clientOrigin)) {
  allowedOrigins.push(clientOrigin)
}

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        return callback(null, true)
      }
      return callback(new Error('Not allowed by CORS'))
    },
    credentials: true
  })
)

app.use(helmet())
app.use(express.json({ limit: '1mb' }))
app.use(morgan('dev'))

app.get('/health', (_req, res) => {
  res.json({ status: 'ok' })
})

app.use('/api/auth', authRoutes)

app.use((req, res) => {
  res.status(404).json({ message: 'Route not found' })
})

app.use((err, _req, res, _next) => {
  console.error('Unexpected error:', err)
  res.status(500).json({ message: 'Unexpected server error' })
})

connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`🚀 Server listening on port ${PORT}`)
    })
  })
  .catch((error) => {
    console.error('Failed to start server:', error)
    process.exit(1)
  })
