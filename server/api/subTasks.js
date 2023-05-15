const router = require("express").Router();
const {
  models: { SubTask },
} = require("../db");

// o: is this still being used? ... if not remove

//find all belonging to user
router.get("/", async (req, res, next) => {
  const { taskId } = req.params;
  try {
    const subTask = await SubTask.findAll();
    res.json(subTask);
  } catch (err) {
    next(err);
  }
});
//find one
router.get("/:id", async (req, res, next) => {
  try {
    const subTask = await SubTask.findByPk(req.params.id);
    res.json(subTask);
  } catch (err) {
    next(err);
  }
});
//create
router.post("/", async (req, res, next) => {
  try {
    const subTask = await SubTask.create(req.body);
    res.status(201).send(subTask);
  } catch (err) {
    next(err);
  }
});
//update
router.put("/:id", async (req, res, next) => {
  try {
    const subTask = await SubTask.findByPk(req.params.id);
    await subTask.update(req.body);
    res.send(subTask);
  } catch (err) {
    next(err);
  }
});
//delete
router.delete("/:id", async (req, res, next) => {
  try {
    const subTask = await SubTask.findByPk(req.params.id);
    await subTask.destroy();
  } catch (err) {
    next(err);
  }
});

module.exports = router;
