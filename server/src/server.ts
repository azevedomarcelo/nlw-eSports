import express from "express";

const app = express();

app.use(express.json());

app.get('/', (req, res) => {
  return res.json({message: 'Ola Mundo'})
});

app.listen(3333);