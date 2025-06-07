require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const morgan = require('morgan');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const { v4: uuidv4 } = require('uuid');

// Import routers
const equipmentRouter = require('./routers/equipmentRouter');
const foodRouter = require('./routers/foodRouter');
const userRouter = require('./routers/userRouter');
const articlesRouter = require('./routers/articlesRouter');
const orderRouter = require('./routers/orderRouter');
const contactRouter = require('./routers/contactRouter');
const cartRouter = require('./routers/cartRouter');
const razorpayRouter = require('./routers/razorpayRouter');
const verticalRouter = require('./routers/verticalRouter');


const app = express();
let server;

// Validate required environment variables
['PORT', 'DB_URL', 'JWT_SECRET'].forEach((key) => {
  if (!process.env[key]) {
    console.error(`❌ Missing required environment variable: ${key}`);
    process.exit(1);
  }
});

// Middleware
app.use(
  helmet({
    contentSecurityPolicy: false,
    crossOriginEmbedderPolicy: false,
  })
);

app.use(
  cors({
    origin: process.env.FRONTEND_URL || 'http://localhost:3000',
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'Accept'],
  })
);

// Assign unique request IDs
app.use((req, res, next) => {
  req.id = uuidv4();
  next();
});

// Logger
morgan.token('id', (req) => req.id);
morgan.token('body', (req) => JSON.stringify(req.body));
app.use(
  morgan(':id :method :url :status :response-time ms :body', {
    skip: (req) => process.env.NODE_ENV === 'production' || req.url === '/health',
    stream: { write: (msg) => console.log(msg.trim()) },
  })
);

// Rate limiters
const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 500,
  message: { error: 'Too many requests, please try again later.' },
  standardHeaders: true,
  legacyHeaders: false,
});

const productLimiter = rateLimit({
  windowMs: 5 * 60 * 1000,
  max: 200,
  message: { error: 'Too many product requests, please try again shortly.' },
  standardHeaders: true,
  legacyHeaders: false,
  keyGenerator: (req) => req.user?._id || req.ip,
});

const cartLimiter = rateLimit({
  windowMs: 1 * 60 * 1000,
  max: 200,
  message: { error: 'Too many cart operations, please try again shortly.' },
  standardHeaders: true,
  legacyHeaders: false,
  skipFailedRequests: true,
  keyGenerator: (req) => req.user?._id || req.ip,
});

const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
  message: { error: 'Too many authentication attempts, please try again later.' },
  standardHeaders: true,
  legacyHeaders: false,
});

// Apply rate limiters
app.use('/api/users/login', authLimiter);
app.use('/api/users/register', authLimiter);
app.use('/api/cart', cartLimiter);
app.use(['/api/food', '/api/equipment'], productLimiter);
app.use('/api', apiLimiter);

app.use(express.json({ limit: '10mb' }));

// Root route
app.get('/', (req, res) => {
  res.send('API is running. Use /api routes.');
});

// Mount routers
app.use('/api/equipment', equipmentRouter);
app.use('/api/food', foodRouter);
app.use('/api/users', userRouter);
app.use('/api/articles', articlesRouter);
app.use('/api/orders', orderRouter);
app.use('/api/contact', contactRouter);
app.use('/api/cart', cartRouter);
app.use('/api/razorpay', razorpayRouter);
// Mount routers
app.use('/api/equipment', equipmentRouter);
app.use('/api/food', foodRouter);
app.use('/api/users', userRouter);
app.use('/api/articles', articlesRouter);
app.use('/api/orders', orderRouter);
app.use('/api/contact', contactRouter);
app.use('/api/cart', cartRouter);
app.use('/api/razorpay', razorpayRouter);
app.use('/api/vertical', verticalRouter); // ✅ Add this line here


// Health check route
app.get('/health', (req, res) => {
  res.json({
    status: 'success',
    message: 'API is running',
    timestamp: new Date().toISOString(),
    env: process.env.NODE_ENV,
    dbStatus: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected',
  });
});

// Global error handler
app.use((err, req, res, next) => {
  const status = err.status || 500;
  const errorResponse = {
    success: false,
    message: err.message || 'Internal Server Error',
    status,
  };

  if (process.env.NODE_ENV === 'development') {
    errorResponse.stack = err.stack;
    errorResponse.details = err;
    console.error('❌ Error:', {
      path: req.path,
      method: req.method,
      error: err,
    });
  }

  res.status(status).json(errorResponse);
});

// MongoDB connection and server start
const connectDB = async (retries = 5) => {
  try {
    if (mongoose.connection.readyState === 1) {
      console.log('✅ MongoDB already connected');
      return startServer();
    }

    const conn = await mongoose.connect(process.env.DB_URL, {
      serverSelectionTimeoutMS: 5000,
      family: 4,
    });

    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
    startServer();
  } catch (error) {
    console.error(`❌ MongoDB connection error: ${error.message}`);

    if (retries > 0) {
      console.log(`🔄 Retrying connection in 5s... (${retries} attempts remaining)`);
      setTimeout(() => connectDB(retries - 1), 5000);
    } else {
      console.error('❌ Failed to connect after multiple attempts');
      process.exit(1);
    }
  }
};

const startServer = () => {
  const port = process.env.PORT || 5000;
  server = app.listen(port, () => {
    console.log(`🚀 Server running in ${process.env.NODE_ENV || 'development'} mode on port ${port}`);
    console.log(`💻 Local: http://localhost:${port}`);
    console.log(`🌐 Health: http://localhost:${port}/health`);
  });
};

// Graceful shutdown
const shutdownGracefully = async () => {
  try {
    if (server) await new Promise((resolve) => server.close(resolve));
    if (mongoose.connection.readyState === 1) await mongoose.connection.close();

    console.log('✅ Graceful shutdown complete');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error during shutdown:', error);
    process.exit(1);
  }
};

connectDB();

// Handle unhandled errors
process.on('unhandledRejection', (err) => {
  console.error('❌ Unhandled Rejection:', err);
  shutdownGracefully();
});

process.on('uncaughtException', (err) => {
  console.error('❌ Uncaught Exception:', err);
  shutdownGracefully();
});

['SIGTERM', 'SIGINT'].forEach((signal) => {
  process.on(signal, () => {
    console.log(`👋 ${signal} received`);
    shutdownGracefully();
  });
});
