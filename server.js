import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import { userRoutes } from './routes/index';
import { PORT } from './config';

const app = express();
app.disable('x-powered-by');

mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGODB_URI || `mongodb://localhost:27017/portfolio`, { useNewUrlParser: true, useUnifiedTopology: true }).then(console.log('Connected to database.'));

app.use(bodyParser.json());

const apiRouter = express.Router();
app.use('/api', apiRouter);
apiRouter.use('/users', userRoutes);

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