const router = require("express").Router();
module.exports = router;

// o: some sample to get req.user set on every request (please test before
//  adding)
// function authorize(req, res, next) {
//   const user = await User.findByToken(req.headers.authorization)
  
//   if(user) {
//     req.user = user;
//     next()
//   } else {
//     next(new Error("..."))
//   }
// }

// router.use(authorize)

router.use("/users", require("./users"));
router.use("/tasks", require("./tasks"));
router.use("/subTasks", require("./subTasks"));

router.use((req, res, next) => {
  const error = new Error("Not Found");
  error.status = 404;
  next(error);
});
