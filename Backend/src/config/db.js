const mongoose = require('mongoose')

const connectDB = async () => {
  const uri = process.env.MONGODB_URI

  if (!uri) {
    throw new Error('Missing MONGODB_URI environment variable')
  }

  try {
    await mongoose.connect(uri, {
      autoIndex: true
    })

    mongoose.connection.on('error', (error) => {
      console.error('MongoDB connection error:', error)
    })

    mongoose.connection.on('disconnected', () => {
      console.warn('MongoDB connection lost. Attempting to reconnect...')
    })

    console.log('✅ Connected to MongoDB')
  } catch (error) {
    console.error('❌ Failed to connect to MongoDB', error)
    throw error
  }
}

module.exports = connectDB
