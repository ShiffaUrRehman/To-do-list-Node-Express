const { Item } = require("../model/todoModel");

// @desc    Get all ToDo items
// @route   GET /api/todo
const getItems = async (req, res) => {
  try {
    let query = {};
    let sort = {};

    query.isComplete = req.query.isComplete ?? false;
    if ("startDate" in req.query || "endDate" in req.query) {
      if ("startDate" in req.query && "endDate" in req.query) {
        query.createdAt = {
          $gte: new Date(req.query.startDate),
          $lte: new Date(req.query.endDate),
        };
      } else {
        return res
          .status(400)
          .send({ message: "Please provide both Start Date and End Date" });
      }
    }

    if ("sort" in req.query) {
      if (req.query.sort === "asc") {
        sort.createdAt = 1;
      } else if (req.query.sort === "desc") {
        sort.createdAt = -1;
      }
    }
    if ("priority" in req.query) {
      if (req.query.priority === "asc") {
        sort.priority = 1;
      } else if (req.query.priority === "desc") {
        sort.priority = -1;
      }
    }
    if ("desc" in req.query) {
      query.description = { $regex: req.query.desc, $options: "i" };
    }
    const items = await Item.find(query).sort(sort);
    res.status(200).send(items);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

// @desc    Get a ToDo item
// @route   GET /api/todo/:id
const getItem = async (req, res) => {
  try {
    const item = await Item.findById(req.params.id);
    if (!item) res.status(404).send({ message: "Item not found" });
    else res.status(200).send(item);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

// @desc    Create a ToDo item
// @route   POST /api/todo
const createItem = async (req, res) => {
  try {
    const item = new Item({
      description: req.body.description,
      priority: req.body.priority,
    });
    const result = await item.save();
    res.status(201).send(result);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

// @desc    Update a ToDo item
// @route   PUT /api/todo/:id
const updateItem = async (req, res) => {
  try {
    const item = await Item.findByIdAndUpdate(req.params.id, {
      description: req.body.description,
      priority: req.body.priority,
    });
    if (!item) res.status(404).send({ message: "Item not found" });
    else res.status(200).send(item);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

// @desc    Delete a ToDo item
// @route   DELETE /api/todo/:id
const deleteItem = async (req, res) => {
  try {
    const result = await Item.findByIdAndDelete(req.params.id);
    if (!result) res.status(404).send({ message: "Item not found" });
    else res.status(200).send(result);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

// @desc    Mark a ToDo item as done/undone
// @route   PUT /api/todo/done/:id
const markItem = async (req, res) => {
  try {
    const result = await Item.findById(req.params.id);
    if (!result) res.status(404).send({ message: "Item not found" });
    else {
      result.isDone = !result.isDone;
      const final = await result.save();
      if (!final) res.status(404).send({ message: "Failed to save item" });
      res.status(200).send(final);
    }
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

// @desc    Mark all ToDo item marked as done to complete
// @route   PUT /api/todo
const completeItems = async (req, res) => {
  try {
    const results = await Item.updateMany(
      { isDone: true, isComplete: false },
      { $set: { isComplete: true } }
    );
    if (!results) res.status(404).send({ message: "Failed to update items" });
    else {
      res.status(200).send(results);
    }
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

module.exports.getItems = getItems;
module.exports.createItem = createItem;
module.exports.deleteItem = deleteItem;
module.exports.getItem = getItem;
module.exports.updateItem = updateItem;
module.exports.markItem = markItem;
module.exports.completeItems = completeItems;
