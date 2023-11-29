const router = require("express").Router();
const taskController = require("../controllers/tasks");

router.post("/tasks", taskController.postTasks);
router.get("/tasks", taskController.getTasks);
router.delete("/tasks/cancel/:id/:cancel", taskController.cancelTasks);
router.delete("/tasks/done/:id/:done", taskController.doneTasks);
router.put("/tasks/:id", taskController.putTasks);

module.exports = router;
