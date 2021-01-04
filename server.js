import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import { userRoutes, sessionRoutes } from './routes/index';
import { PORT, SESS_NAME, SESS_SECRET, SESS_LIFETIME } from './config';
import session from 'express-session';
import connectStore from 'connect-mongo';

mongoose.connect(process.env.MONGODB_URI || `mongodb://localhost:27017/portfolio`, { useNewUrlParser: true, useUnifiedTopology: true }).then(console.log('Connected to database.'));
const app = express();
const MongoStore = connectStore(session);
app.disable('x-powered-by');

mongoose.Promise = global.Promise;

app.use(bodyParser.json());
app.use(session({
  name: SESS_NAME,
  secret: SESS_SECRET,
  saveUninitialized: false,
  resave: false,
  store: new MongoStore({
    mongooseConnection: mongoose.connection,
    collection: 'session',
    ttl: parseInt(SESS_LIFETIME) / 1000
  }),
  cookie: {
    sameSite: true,
    secure: process.env.NODE_ENV === 'production',
    maxAge: parseInt(SESS_LIFETIME)
  }
}));

const apiRouter = express.Router();
app.use('/api', apiRouter);
apiRouter.use('/users', userRoutes);
apiRouter.use('/session', sessionRoutes);

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));
  
  const path = require('path');

  
  app.get('*', (req,res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`)
});