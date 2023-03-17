import { useState } from "react";
import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:3000",
});

function GenerateWorkout() {
  const [prompt, setPrompt] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    // communicate with API
    // post input value 'prompt' to API end point
    instance
      .post("/generateWorkout", { prompt })
      .then((res) => {
        setResponse(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Ask anything... :)"
        />
        <button type="submit">Ask</button>
      </form>
      <p className="response-area">{loading ? "loading..." : response}</p>
    </div>
  );
}

export default GenerateWorkout;
