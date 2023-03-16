const port = 3000;
require("dotenv").config();
const express = require("express");
const morgan = require("morgan");

const app = express();

app
  .use(express.json())
  .use(express.urlencoded({ extended: true }))
  .use(morgan("dev"));

app.use("/api", require("./api"));

app.use((err, req, res, next) => {
  res.status(err.status || 500).send(err.message || "Internal server error.");
});

const server = app.listen(port, () =>
  console.log(`\nlistening on port ${port}\n`)
);
