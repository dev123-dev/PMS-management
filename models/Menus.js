const mongoose = require("mongoose");
ObjectId = mongoose.Schema.ObjectId;

const MenuSchema = new mongoose.Schema({
  menuName: {
    type: String,
    required: true,
  },
  menuDesc: {
    type: String,
    required: true,
  },
  menuEnteredById: {
    type: ObjectId,
  },
  menuDateTime: {
    type: Date,
    default: Date.now(),
  },
  menuEditedById: {
    type: ObjectId,
  },
  menuEditedDateTime: {
    type: Date,
  },
});

module.exports = menu = mongoose.model("menu", MenuSchema);
