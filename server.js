import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import { userRoutes, sessionRoutes } from './routes/index';
import { PORT, SESS_NAME, SESS_SECRET, SESS_LIFETIME } from './config';
import session from 'express-session';
import connectStore from 'connect-mongo';
import socketIo from 'socket.io';
import http from 'http';
import User from './models/user';
import Chat from './models/chat';

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
const server = http.createServer(app);
const io = socketIo(server);

io.on("connection", socket => {
  console.log("New client connected");

  Chat.find().sort({createdAt: -1}).limit(10).exec((err, chats) => {
    if (err) return console.error(err);
    socket.emit('load', chats.map(({_id, user, message, createdAt}) => ({_id, user, message, createdAt})));
  });

  socket.on("newChat", async (packet) => {
    const {session, message, tempId} = packet;
    if (session.userId) {
      let chatUser = await User.find({_id: session.userId});
      if (!chatUser) return console.error('User not found');
    }
    const user = session.username ? session.username : "anonymous";
    const chat = new Chat({
      message,
      user
    })
    chat.save((err) => {
      if (err) return console.error(err);
    });
    const {createdAt, _id} = chat;
    socket.broadcast.emit('push', {_id, user , message, createdAt});
    socket.emit('reconcile',{tempId, _id, createdAt})
  })

  socket.on("disconnect", () => {
    console.log("Client disconnected");
  });
});

server.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`)
});