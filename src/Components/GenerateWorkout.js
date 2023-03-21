import React from "react";
import { useState } from "react";
import axios from "axios";

function GenerateWorkout({ count, decrement, remove }) {
  const [selectedOption, setSelectedOption] = useState("");
  const [response, setResponse] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await axios.post("http://localhost:3001/generateWorkout", {
        prompt: `can you give me six exercises for my ${selectedOption}. The format of the response
        should be a numbered vertical list of just the exercise names with a colon after each exercise expcept for the last. Here's an example "1. crunches :" `,
      });
      setResponse(res.data.split(":"));
      setLoading(false);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <select
          value={selectedOption}
          onChange={(e) => setSelectedOption(e.target.value)}
        >
          <option value="">Select an option</option>
          <option value="back">Back</option>
          <option value="core">Core</option>
          <option value="chest">Chest</option>
          <option value="legs">Legs</option>
          <option value="arms">Arms</option>
          <option value="cardio">Cardio</option>
        </select>
        <button type="submit" disabled={!selectedOption}>
          Ask
        </button>
      </form>
      {loading ? (
        <p className="generatedResponse">Loading...</p>
      ) : (
        <p className="generatedResponse">
          {response.map((item) => {
            return item ? (
              <div>
                <span>
                  <p>
                    {item} <button>+</button>
                  </p>
                </span>
              </div>
            ) : null;
          })}
        </p>
      )}
    </div>
  );
}

export default GenerateWorkout;
