import express from 'express';

const app = express();
const port = 3000;

app.get('/habits', (_, res) => {
  console.log('Habits Service is running');
  res.json({ message: 'Habits Service is running' });
});

app.listen(port, () => {
  console.log(`Avatar Service listening at http://localhost:${port}`);
});
