import express from 'express';

const app = express();
const port = 3000;

app.get('/avatars', (_, res) => {
  console.log('Avatar Service is running');
  res.json({ message: 'Avatar Service is running' });
});

app.listen(port, () => {
  console.log(`Avatar Service listening at http://localhost:${port}`);
});
