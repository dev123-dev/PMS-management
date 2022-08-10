const mongoose = require("mongoose");
ObjectId = mongoose.Schema.ObjectId;

const LeavesCategorySchema = new mongoose.Schema({
  leavecategoryName: {
    type: String,
  },
});

module.exports = leavesCategory = mongoose.model(
  "leavesCategory",
  LeavesCategorySchema
);
