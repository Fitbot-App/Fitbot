const { Configuration, OpenAIApi } = require('openai');

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function getOpenAiClient() {
  const apiKey =
    process.env.OPENAI_API_KEY || process.env.REACT_APP_OPENAI_API_KEY;

  if (!apiKey) {
    const error = new Error(
      'OpenAI API key not configured. Set OPENAI_API_KEY on the server.'
    );
    error.statusCode = 500;
    throw error;
  }

  const configuration = new Configuration({ apiKey });
  return new OpenAIApi(configuration);
}

function normalizeOpenAiError(error) {
  const statusCode = error.response?.status || error.statusCode || 500;
  const apiError = error.response?.data?.error;
  const message =
    apiError?.message || error.message || 'An error occurred during your request';

  const normalizedError = new Error(message);
  normalizedError.statusCode = statusCode;
  normalizedError.type = apiError?.type;
  normalizedError.code = apiError?.code;

  return normalizedError;
}

async function createChatCompletion(prompt, attempt = 0) {
  if (!prompt || typeof prompt !== 'string') {
    const error = new Error('A prompt string is required.');
    error.statusCode = 400;
    throw error;
  }

  const openai = getOpenAiClient();
  let completion;

  try {
    completion = await openai.createChatCompletion({
      model: 'gpt-4o-mini',
      messages: [{ role: 'user', content: prompt }],
      max_tokens: 200,
      temperature: 0.65,
    });
  } catch (error) {
    const normalizedError = normalizeOpenAiError(error);

    if (normalizedError.statusCode === 429 && attempt < 2) {
      await sleep(500 * (attempt + 1));
      return createChatCompletion(prompt, attempt + 1);
    }

    throw normalizedError;
  }

  const result = completion.data?.choices?.[0]?.message?.content;

  if (!result) {
    const error = new Error('Invalid response structure from OpenAI.');
    error.statusCode = 502;
    throw error;
  }

  return result;
}

async function handleOpenAiRequest(req, res) {
  try {
    const result = await createChatCompletion(req.body?.prompt);
    res.json({ result });
  } catch (error) {
    console.error('Error with OpenAI API request:', error);
    res.status(error.statusCode || 500).json({
      error: error.message || 'An error occurred during your request',
      type: error.type,
      code: error.code,
      details: process.env.NODE_ENV === 'development' ? error.stack : undefined,
    });
  }
}

module.exports = {
  handleOpenAiRequest,
};
