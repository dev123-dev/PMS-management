const mongoose = require("mongoose");
ObjectId = mongoose.Schema.ObjectId;

const DepartmentSchema = new mongoose.Schema({
  departmentName: {
    type: String,
    required: true,
  },
  departmentName: {
    type: String,
  },
  departmentEnteredById: {
    type: ObjectId,
  },
  departmentDateTime: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = department = mongoose.model("department", DepartmentSchema);
