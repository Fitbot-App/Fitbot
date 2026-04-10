const { handleOpenAiRequest } = require('./openaiHandler');

module.exports = async (req, res) => {
  if (req.method === 'POST') {
    return handleOpenAiRequest(req, res);
  }

  return res.status(405).json({ error: 'Method not allowed' });
};
