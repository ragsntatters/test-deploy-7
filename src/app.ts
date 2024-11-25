import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import { serve, setup } from 'swagger-ui-express'
import securityMiddleware from './middleware/security'
import { errorHandler } from './middleware/error'
import { setupQueueMonitor } from './lib/queue/monitor'
import { config } from './config'
import apiSpec from '../docs/api.yaml'

// Routes
import authRoutes from './routes/auth.routes'
import locationRoutes from './routes/location.routes'
import reviewRoutes from './routes/review.routes'
import postRoutes from './routes/post.routes'
import keywordRoutes from './routes/keyword.routes'
import teamRoutes from './routes/team.routes'
import reportRoutes from './routes/report.routes'
import analyticsRoutes from './routes/analytics.routes'
import billingRoutes from './routes/billing.routes'

const app = express()

// Basic middleware
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())

// CORS configuration
app.use(cors({
  origin: config.frontend.url,
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
  allowedHeaders: ['Content-Type', 'Authorization', 'x-csrf-token', 'x-api-key']
}))

// Apply security middleware
app.use(securityMiddleware)

// API documentation
app.use('/docs', serve, setup(apiSpec))

// Queue monitoring in development
if (config.env === 'development') {
  setupQueueMonitor(app)
}

// Routes
app.use('/api/auth', authRoutes)
app.use('/api/locations', locationRoutes)
app.use('/api/reviews', reviewRoutes)
app.use('/api/posts', postRoutes)
app.use('/api/keywords', keywordRoutes)
app.use('/api/team', teamRoutes)
app.use('/api/reports', reportRoutes)
app.use('/api/analytics', analyticsRoutes)
app.use('/api/billing', billingRoutes)

// Error handling
app.use(errorHandler)

export default app