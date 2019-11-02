import express from 'express';
import cors from 'cors';
const app = express();
import path from 'path';
import query from './routes/query';
const port = process.env.PORT || 3000;
app.use(cors());

app.use('/api/query', query);

app.listen(port, () => {
  console.log('Server is up on port ' + port);
});

// app.get('/text', (req, res) => {
