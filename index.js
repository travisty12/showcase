const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();

mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGODB_URI || `mongodb://localhost:27017/portfolio`, { useNewUrlParser: true, useUnifiedTopology: true });

app.use(bodyParser.json());

const PORT = process.env.PORT || 9000;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`)
});