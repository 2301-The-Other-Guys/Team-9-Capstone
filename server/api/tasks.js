const router = require("express").Router();
const {
  models: { Task },
} = require("../db");

//find all belonging to user
router.get("/", async (req, res, next) => {
  // const { userId } = req.params;{ where: { userId } }
  try {
    const tasks = await Task.findAll();
    res.json(tasks);
  } catch (err) {
    next(err);
  }
});
//find one
router.get("/:id", async (req, res, next) => {
  try {
    const task = await Task.findByPk(req.params.id);
    res.json(task);
  } catch (err) {
    next(err);
  }
});
//create
router.post("/", async (req, res, next) => {
  try {
    const task = await Task.create(req.body);
    res.status(201).send(task);
  } catch (err) {
    next(err);
  }
});
//update
router.put("/:id", async (req, res, next) => {
  try {
    const task = await Task.findByPk(req.params.id);
    await task.update(req.body);
    res.send(task);
  } catch (err) {
    next(err);
  }
});
//delete
router.delete("/:id", async (req, res, next) => {
  try {
    const task = await Task.findByPk(req.params.id);
    await task.destroy();
  } catch (err) {
    next(err);
  }
});
module.exports = router;