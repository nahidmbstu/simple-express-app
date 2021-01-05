const express = require("express");
const redis = require("redis");
const util = require("util");
const app = express();

const mongoose = require("mongoose");

mongoose.connect("mongodb://db:27017/test", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function () {
  console.log("database Connected");
});

const port = process.env.PORT || 3000;

const client = redis.createClient({ host: "redis", port: 6379 });
client.get = util.promisify(client.get);

client.on("error", function (error) {
  console.error(error);
});

let count = 1;

function countHit() {
  client.set("hit", String(count));
  count++;
}

app.get("/", async (req, res) => {
  countHit();
  const value = await client.get("hit");
  return res.json({
    MSG: `HELLO WORLD From Docker Guy ${new Date().toString()} ${value})}`,
  });
});

app.listen(port, () => console.log(`app is runing on ${port}`));
