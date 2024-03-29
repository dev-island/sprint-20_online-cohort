const router = require("express").Router();
const todosController = require("../controllers/todos.controller");

router.get("/", todosController.listTodos);
router.post("/", todosController.createTodo);
router.get("/:id", todosController.getTodo);

module.exports = router;
