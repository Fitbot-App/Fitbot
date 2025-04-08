const express = require('express');
require('dotenv').config();
const morgan = require('morgan');
const cors = require('cors');
const bodyParser = require('body-parser');
const { Configuration, OpenAIApi } = require('openai');

const app = express();
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(cors());

// Move configuration inside the route handler to ensure environment variables are available
let configuration;
let openai;

app.post('/api/openaiReq', async (req, res) => {
  try {
    // Initialize OpenAI configuration for each request
    configuration = new Configuration({
      apiKey: process.env.OPENAI_API_KEY,
    });
    openai = new OpenAIApi(configuration);

    const { prompt } = req.body;

    // Add more detailed error logging
    if (!process.env.OPENAI_API_KEY) {
      console.error('Missing OpenAI API Key in environment');
      return res.status(500).json({
        error:
          'OpenAI API key not configured. Please check your environment variables.',
      });
    }

    if (!configuration.apiKey) {
      console.error('Configuration API Key not set properly');
      return res.status(500).json({
        error: 'OpenAI configuration error. Please check the API key setup.',
      });
    }

    const completion = await openai.createChatCompletion({
      model: 'gpt-3.5-turbo',
      messages: [{ role: 'user', content: prompt }],
      max_tokens: 200,
      temperature: 0.65,
    });

    if (!completion.data?.choices?.[0]?.message?.content) {
      throw new Error('Invalid response structure from OpenAI');
    }

    res.json({ result: completion.data.choices[0].message.content });
  } catch (error) {
    console.error('Error with OpenAI API request:', error);
    // More detailed error response
    res.status(500).json({
      error: error.message || 'An error occurred during your request',
      details: process.env.NODE_ENV === 'development' ? error.stack : undefined,
    });
  }
});

app.use((err, req, res, next) => {
  console.error(err);
  console.error(err.stack);
  res.status(err.status || 500).send(err.message || 'Internal server error.');
});
// 'prompt' is coming from axios post - from react js state - its input field value or query or question

// Start the server ////////////////////

const port = process.env.PORT || 3001;

// Modify server startup for Vercel serverless functions
if (process.env.NODE_ENV !== 'production') {
  app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
    console.log(`http://localhost:${port}`);
  });
}

module.exports = app;
