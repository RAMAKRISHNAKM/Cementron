import {config} from 'dotenv';
config();
import {genkit} from 'genkit';
import {googleAI} from '@genkit-ai/googleai';

export const ai = genkit({
  plugins: [googleAI({
    // You can specify your API key here, but it's recommended to use the GEMINI_API_KEY environment variable.
  })],
  // You can override the model here if needed.
});
