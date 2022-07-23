const mongoose = require("mongoose");
ObjectId = mongoose.Schema.ObjectId;

const LeavesSchema = new mongoose.Schema({
  empId: {
    type: ObjectId,
  },
  leaveDate: {
    type: String,
  },
  leaveType: {
    type: String,
  },
  leaveReason: {
    type: String,
  },
  empDepartmentName: {
    type: String,
  },
  leaveEnteredById: {
    type: ObjectId,
  },
  leaveEntredDateTime: {
    type: String,
    default: new Date().toLocaleString("en-GB"),
  },
});

module.exports = leaves = mongoose.model("leaves", LeavesSchema);
