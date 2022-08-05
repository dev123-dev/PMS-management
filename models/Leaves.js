const mongoose = require("mongoose");
ObjectId = mongoose.Schema.ObjectId;

const LeavesSchema = new mongoose.Schema({
  empId: {
    type: ObjectId,
  },
  leaveDate: {
    type: String,
  },
  leavecategoryName: {
    type: String,
  },
  leavecategoryId: {
    type: ObjectId,
  },
  leaveStatus: {
    default: "Active",
    type: String,
  },
  leaveType: {
    type: String,
  },
  leaveReason: {
    type: String,
  },
  leaveEnteredById: {
    type: ObjectId,
  },
  leaveEditedById: {
    type: ObjectId,
  },
  leaveEditedDateTime: {
    type: Date,
  },
  leaveEntredDateTime: {
    type: String,
    default: new Date().toLocaleString("en-GB"),
  },
  leaveDeactiveById: {
    type: ObjectId,
  },
  leaveDeactiveDate: {
    type: Date,
  },
  leaveDeactiveReason: {
    type: String,
  },
});

module.exports = leaves = mongoose.model("leaves", LeavesSchema);
