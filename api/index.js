const express = require('express');
require('dotenv').config();
const morgan = require('morgan');
const cors = require('cors');
const bodyParser = require('body-parser');
const { handleOpenAiRequest } = require('./openaiHandler');

const app = express();
app.use(morgan('dev'));
app.use(bodyParser.json());

const allowedProductionOrigins = new Set([
  'http://fitbotapp.com',
  'https://fitbotapp.com',
  'https://www.fitbotapp.com',
]);

function isAllowedOrigin(origin) {
  if (!origin) {
    return true;
  }

  if (allowedProductionOrigins.has(origin)) {
    return true;
  }

  try {
    const { hostname, protocol } = new URL(origin);
    return protocol === 'https:' && hostname.endsWith('.vercel.app');
  } catch (error) {
    return false;
  }
}

const corsOptions = {
  origin(origin, callback) {
    if (process.env.NODE_ENV !== 'production' || isAllowedOrigin(origin)) {
      return callback(null, true);
    }

    return callback(new Error('Not allowed by CORS'));
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
};

app.options('*', cors(corsOptions));
app.use(cors(corsOptions));

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
