import express from "express";
const app = express();

app.get("/", function (req, res) {
  res.send("It's Working");
});

app.listen(3000);
