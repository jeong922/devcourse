const express = require("express");
const app = express();
const port = 3000;

// https://expressjs.com/en/4x/api.html
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.post("/test", (req, res) => {
  console.log(req.body);
  res.status(201).json(req.body);
});

app.use((req, res, next) => {
  res.sendStatus(404);
});

app.use((error, req, res, next) => {
  console.error(error);
  res.sendStatus(500);
});

app.listen(port, () => {
  console.log(`http://localhost:${port}`);
});
