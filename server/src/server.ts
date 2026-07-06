import app from './app';

const port = process.env.PORT;

app.listen(port, () => {
  console.log(`Hello, Server running on port ${port}`);
});