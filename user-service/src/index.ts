import express from 'express';

const app = express();
const port = 3000;

app.get('/users', (_, res) => {
  console.log('User Service is running');
  res.json({ message: 'User Service is running' });
});

app.listen(port, () => {
  console.log(`User Service listening at http://localhost:${port}`);
});
