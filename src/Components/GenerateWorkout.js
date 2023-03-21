// import { useState } from "react";
// import axios from "axios";

// function GenerateWorkout() {
//   const [prompt, setPrompt] = useState("");
//   const [response, setResponse] = useState("");
//   const [loading, setLoading] = useState(false);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);

//     // communicate with API
//     // post input value 'prompt' to API end point
//     try {
//       const res = await axios.post("http://localhost:3001/generateWorkout", {
//         prompt,
//       });
//       setResponse(res.data);
//       setLoading(false);
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   return (
//     <div>
//       <form onSubmit={handleSubmit}>
//         <input
//           type="text"
//           value={prompt}
//           onChange={(e) => setPrompt(e.target.value)}
//           placeholder="Ask anything... :)"
//         />
//         <button type="submit">Ask</button>
//       </form>
//       <p className="response-area">{loading ? "loading..." : response}</p>
//     </div>
//   );
// }

// export default GenerateWorkout;
import React from 'react';
import { useState } from 'react';
import axios from 'axios';
import { GiBroom } from 'react-icons/gi';
import { MdDelete } from 'react-icons/md';

function GenerateWorkout({ count, decrement, remove }) {
  const [selectedOption, setSelectedOption] = useState('');
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await axios.post('http://localhost:3001/generateWorkout', {
        prompt: `can you give me six exercises for my ${selectedOption}. The format of the response
        should be a numbered vertical list of just the exercise names`,
      });
      setResponse(res.data);
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
          <option value=''>Select an option</option>
          <option value='back'>Back</option>
          <option value='core'>Core</option>
          <option value='chest'>Chest</option>
          <option value='legs'>Legs</option>
          <option value='arms'>Arms</option>
          <option value='cardio'>Cardio</option>
        </select>
        <button type='submit' disabled={!selectedOption}>
          Ask
        </button>
      </form>
      {loading ? (
        <p className='generatedResponse'>Loading...</p>
      ) : (
        <p className='generatedResponse'>{response}</p>
      )}
      {response && (
        <button className='clearWorkout' onClick={() => setResponse('')}>
          Clear
          <GiBroom className='broomIcon' color='#37a5ff' />
        </button>
      )}
      {remove !== false && (
        <button className='xButton' onClick={decrement}>
          Remove <MdDelete color='#FF3767' />
        </button>
      )}
    </div>
  );
}

export default GenerateWorkout;
