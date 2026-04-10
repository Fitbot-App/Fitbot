const { Configuration, OpenAIApi } = require('openai');

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

async function createChatCompletion(prompt) {
  if (!prompt || typeof prompt !== 'string') {
    const error = new Error('A prompt string is required.');
    error.statusCode = 400;
    throw error;
  }

  const openai = getOpenAiClient();
  const completion = await openai.createChatCompletion({
    model: 'gpt-4o-mini',
    messages: [{ role: 'user', content: prompt }],
    max_tokens: 200,
    temperature: 0.65,
  });

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
      details: process.env.NODE_ENV === 'development' ? error.stack : undefined,
    });
  }
}

module.exports = {
  handleOpenAiRequest,
};
