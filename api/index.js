const express = require('express');
require('dotenv').config();
const morgan = require('morgan');
const cors = require('cors');
const bodyParser = require('body-parser');
const { handleOpenAiRequest } = require('./openaiHandler');

const app = express();
app.use(morgan('dev'));
app.use(bodyParser.json());

app.options('*', cors());
if (process.env.NODE_ENV === 'production') {
  app.use(
    cors({
      origin: ['http://fitbotapp.com', 'https://fitbotapp.com'],
      credentials: true,
      methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
      allowedHeaders: ['Content-Type', 'Authorization'],
    })
  );
} else {
  app.use(
    cors({
      origin: true,
      credentials: true,
      methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
      allowedHeaders: ['Content-Type', 'Authorization'],
    })
  );
}

app.post('/api/openaiReq', handleOpenAiRequest);

app.use((err, req, res, next) => {
  console.error(err);
  console.error(err.stack);
  res.status(err.status || 500).send(err.message || 'Internal server error.');
});
const port = process.env.PORT || 3001;

if (process.env.NODE_ENV !== 'production') {
  app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
    console.log(`http://localhost:${port}`);
  });
}

module.exports = app;
