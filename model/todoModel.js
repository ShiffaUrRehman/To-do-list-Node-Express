const mongoose = require("mongoose");

// Schema and Model for items in ToDo list
const Item = mongoose.model(
  "Item",
  mongoose.Schema(
    {
      description: {
        type: String,
        maxlength: 1024,
        required: [true, "Please add a description for the to do"],
      },
      priority: {
        type: Number,
        enum: [1, 2, 3], // 1 => high, 2 => medium, 3 => low
        default: 2,
      },

      isDone: { type: Boolean, default: false },
      isComplete: { type: Boolean, default: false },
    },
    {
      timestamps: true,
    }
  )
);

module.exports.Item = Item;
