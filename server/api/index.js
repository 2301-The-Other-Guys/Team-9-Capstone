const User = require("../db/models/User");

const router = require("express").Router();
module.exports = router;

// o: some sample to get req.user set on every request (please test before
//  adding)

router.use("/users", require("./users"));
router.use("/tasks", require("./tasks"));

router.use((req, res, next) => {
  const error = new Error("Not Found");
  error.status = 404;
  next(error);
});
