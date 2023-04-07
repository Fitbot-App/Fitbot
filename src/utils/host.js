export default process.env.NODE_ENV === 'development'
  ? 'http://localhost:3001'
  : process.env.VERCEL_URL;
