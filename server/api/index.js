"use strict";
const router = require("express").Router();

router.use("/generateWorkout", require("./api/generateWorkout"));

router.use((req, res, next) => {
  const error = new Error("Not Found");
  error.status = 404;
  next(error);
});

module.exports = router;
