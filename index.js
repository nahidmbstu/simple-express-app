const express = require("express");

const app = express();

const port = process.env.PORT || 3000;

app.get("/", (req, res) => {
  return res.json({ MSG: "HELLO WORLD" });
});

app.listen(port, () => console.log(`app is runing on ${port}`));
