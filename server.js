import express from 'express';
import path from 'path';
import router from './routes/index.js';

const app = express();
const port = 3000;
const __dirname = path.resolve();

app.use(express.static(path.join(__dirname, 'public')));
app.use('/api', router);

app.get('/', (req, res) => {
  res.sendFile('index.html');
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
