import dotenv from 'dotenv'
import app from './app.js'
import {initializeDB} from './config/db.js'

dotenv.config()

// Use PORT from .env or default to 5000
const PORT = process.env.PORT || 5000

const startServer = async () => {
  try {
    // Initialize database
    await initializeDB()

    // Listen on localhost explicitly to avoid network issues
    app.listen(PORT, '0.0.0.0', () => {
      console.log(`🚀 Server running on http://localhost:${PORT}`)
    })
  } catch (error) {
    console.error('❌ Failed to start server:', error)
    process.exit(1)
  }
}

// Start the server
startServer()
