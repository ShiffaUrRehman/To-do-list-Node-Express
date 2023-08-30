const express = require("express");
const router = express.Router();
const {
  getItems,
  createItem,
  deleteItem,
  getItem,
  updateItem,
  markItem,
  completeItems,
} = require("../controller/todoController");
const {
  itemSchema,
  validateBody,
  updateItemSchema,
} = require("../middleware/validator");

// Routes for items in ToDo list

router.get("/", getItems);
router.post("/", validateBody(itemSchema), createItem);
router.delete("/:id", deleteItem);
router.get("/:id", getItem);
router.put("/:id", validateBody(updateItemSchema), updateItem);
router.put("/done/:id", markItem);
router.put("/", completeItems);
module.exports = router;
