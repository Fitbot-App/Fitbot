import { useState } from 'react';
import axios from 'axios';

function GenerateWorkout() {
  const [prompt, setPrompt] = useState('');
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // communicate with API
    // post input value 'prompt' to API end point
    try {
      const res = await axios.post('http://localhost:3001/generateWorkout', {
        prompt,
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
        <input
          type='text'
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder='Ask anything... :)'
        />
        <button type='submit'>Ask</button>
      </form>
      <p className='response-area'>{loading ? 'loading...' : response}</p>
    </div>
  );
}

export default GenerateWorkout;
