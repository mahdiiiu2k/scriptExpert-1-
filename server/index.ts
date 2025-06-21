import express from 'express';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import MemoryStore from 'memorystore';
import { createServer } from 'http';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const port = process.env.PORT || 5000;

// Session store
const MemoryStoreSession = MemoryStore(session);

// Middleware
app.use(express.json());
app.use(cookieParser());
app.use(session({
  store: new MemoryStoreSession({
    checkPeriod: 86400000 // prune expired entries every 24h
  }),
  secret: process.env.SESSION_SECRET || 'your-secret-key',
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: process.env.NODE_ENV === 'production',
    httpOnly: true,
    maxAge: 24 * 60 * 60 * 1000 // 24 hours
  }
}));

// API routes
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Serve static files in production
if (process.env.NODE_ENV === 'production') {
  const publicPath = join(__dirname, '../dist/public');
  app.use(express.static(publicPath));
  
  app.get('*', (req, res) => {
    res.sendFile(join(publicPath, 'index.html'));
  });
} else {
  // Development mode - let Vite handle the frontend
  app.get('/', (req, res) => {
    res.json({ 
      message: 'Server is running in development mode',
      frontend: 'Run the frontend with Vite separately'
    });
  });
}

const server = createServer(app);

server.listen(port, () => {
  console.log(`Server running on port ${port}`);
  console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
});

export default app;