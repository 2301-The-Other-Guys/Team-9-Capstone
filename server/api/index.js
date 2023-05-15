const User = require("../db/models/User");

const router = require("express").Router();
module.exports = router;

router.use("/users", require("./users"));
router.use("/tasks", require("./tasks"));
router.use("/subTasks", require("./subTasks"));

router.use((req, res, next) => {
  const error = new Error("Not Found");
  error.status = 404;
  next(error);
});
