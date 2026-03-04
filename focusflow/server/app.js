import express from 'express'
import cors from 'cors'
import morgan from 'morgan'

import taskRoutes from './routes/tasks.routes.js'
import authRoutes from './routes/auth.routes.js'

const app = express()

app.use(cors())
app.use(express.json())
app.use(morgan('dev'))

// Routes
app.use('/api', taskRoutes)
app.use('/api/auth', authRoutes)

// Health check
app.get('/ping', (req, res) => {
  res.json({message: 'pong'})
})

// 404 handler (LAST)
app.use((req, res) => {
  res.status(404).json({message: 'Route not found'})
})

export default app
