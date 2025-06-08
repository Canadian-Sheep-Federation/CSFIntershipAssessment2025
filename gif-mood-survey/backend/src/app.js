const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// Mount the submissions router for all /submissions endpoints
app.use('/submissions', require('./routes/submissions'));

app.get('/', (req, res) => {
  res.send('🎯 GIF Mood Survey API is running!');
});

module.exports = app;
