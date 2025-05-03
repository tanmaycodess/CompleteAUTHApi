import dotenv from 'dotenv';
dotenv.config({ path: '.env.development.local' }); 

import express from 'express';
import cors from 'cors';
import session from 'express-session';
import MongoStore from 'connect-mongo';
import passport from './utils/passport.js';
import routes from './routes/routes.js';



const app = express();

// Middleware
app.use(cors({
  origin: process.env.CLIENT_URL,
  credentials: true
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  store: MongoStore.create({
    mongoUrl: process.env.MONGODB_URI,
    collectionName: 'sessions',
    ttl: 24 * 60 * 60
  }),
  cookie: {
    maxAge: 1000 * 60 * 60 * 24,
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax'
  }
}));

app.use(passport.initialize());
app.use(passport.session());

routes(app);

app.get('/', (req, res) => {
  res.send('API is working fine ✅');
});

export default app;
