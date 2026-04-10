# Fitbot

Fitbot is a React fitness app for building workouts, saving them to Firebase, and generating AI-assisted workout suggestions.

## Stack

- React 18 with React Router
- Redux Toolkit with `redux-persist`
- Firebase Auth and Firestore
- Express API for local development
- OpenAI chat completions for workout generation

## Project Structure

- `src/index.js`: app entrypoint
- `src/Routes.js`: route definitions
- `src/AuthContext.js`: authentication state and actions
- `src/services/workouts.js`: shared workout generation and persistence logic
- `src/utils/workoutFormatting.js`: shared parsing and formatting helpers
- `api/index.js`: Express server for local development
- `api/openaiReq.js`: serverless API entrypoint

## Environment Variables

Create a local `.env` file with:

```bash
OPENAI_API_KEY=your_server_side_openai_key
```

Notes:

- The backend now expects `OPENAI_API_KEY` for OpenAI requests.
- `REACT_APP_OPENAI_API_KEY` is still accepted as a fallback for backward compatibility, but it should be removed over time.
- Firebase configuration is currently stored in `src/firebase.js`.

## Available Scripts

### `npm start`

Runs the local Express API and the React development server.

### `npm test`

Runs the React test runner.

### `npm run build`

Builds the frontend for production.

## Current Cleanup Direction

- Centralize OpenAI request handling in one backend handler
- Move workout generation and persistence into shared frontend services
- Remove duplicated parsing logic from components
- Continue extracting shared UI hooks and layout primitives in follow-up refactors

## Next Recommended Refactors

- Extract repeated `useMediaQuery` logic into a shared hook
- Move Firebase user profile reads into a dedicated service or hook
- Add linting and a small test suite around workout formatting and service behavior
