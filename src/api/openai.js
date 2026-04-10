import axios from 'axios';
import host from '../utils/host';

export async function generateFromPrompt(prompt) {
  const response = await axios.post(`${host}/api/openaiReq`, { prompt });

  if (!response.data?.result) {
    throw new Error('Invalid response format from server');
  }

  return response.data.result;
}
