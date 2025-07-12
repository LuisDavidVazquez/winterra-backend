import express from 'express';

const app = express();
const port = 3000;

app.get('/community', (_, res) => {
  console.log('Community Service is running');
  res.json({ message: 'Community Service is running' });
});

app.listen(port, () => {
  console.log(`Avatar Service listening at http://localhost:${port}`);
});
