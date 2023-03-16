const { Configuration, OpenAIApi } = require("openai");

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

const router = require("express").Router();

router.post("/", async (req, res, next) => {
  if (!configuration.apiKey) {
    res.status(500).json({
      error: {
        message: "OpenAI API key not configured.",
      },
    });
    return;
  }

  function generateSuggestions(bodyPart1, bodyPart2) {
    return `make me a workout for ${bodyPart1} and ${bodyPart2} that is no longer than 20 minutes. the output format should 
    be as follows, workout: sets, reps`;
  }

  try {
    const completion = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: generateSuggestions(bodyPart1, bodyPart2),
      temperature: 0.85,
      max_tokens: 250,
    });
    res.status(200).json({ result: completion.data.choices[0].text });
  } catch (error) {
    if (error.response) {
      console.error(error.response.status, error.response.data);
      res.status(error.response.status).json(error.response.data);
    } else {
      console.log("Input is", bodyPart1);
      console.error(`Error with OpenAI API request: ${error.message}`);
      res.status(500).json({
        error: {
          message: "An error occurred during your request.",
        },
      });
    }
  }
});

module.exports = router;
