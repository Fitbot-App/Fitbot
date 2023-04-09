const express = require('express');
const path = require('path');
require('dotenv').config();
const morgan = require('morgan');
const cors = require('cors');
const bodyParser = require('body-parser');
const { Configuration, OpenAIApi } = require('openai');

const app = express();
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(cors());

app.use('*', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'public/index.html'));
});

const configuration = new Configuration({
  apiKey: process.env.REACT_APP_OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);
app.post('/pickExercise', async (req, res) => {
  const { prompt } = req.body;
  const completion = await openai.createCompletion({
    model: 'text-davinci-003',
    prompt: prompt,
    max_tokens: 200,
    temperature: 0.65,
  });
  res.send(completion.data.choices[0].text);
});

app.post('/finalize', async (req, res) => {
  const { prompt } = req.body;
  const completion = await openai.createCompletion({
    model: 'text-davinci-003',
    prompt: prompt,
    max_tokens: 200,
    temperature: 0.65,
  });
  res.send(completion.data.choices[0].text);
});

app.post('/home', async (req, res) => {
  const { prompt } = req.body;
  const completion = await openai.createCompletion({
    model: 'text-davinci-003',
    prompt: prompt,
    max_tokens: 200,
    temperature: 0.85,
  });
  res.send(completion.data.choices[0].text);
});

app.use((err, req, res, next) => {
  console.error(err);
  console.error(err.stack);
  res.status(err.status || 500).send(err.message || 'Internal server error.');
});
// 'prompt' is coming from axios post - from react js state - its input field value or query or question

// Start the server ////////////////////

const port = process.env.PORT || 3001;

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
  console.log(`http://localhost:${port}`);
});
