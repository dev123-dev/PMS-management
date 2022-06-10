const mongoose = require("mongoose");
ObjectId = mongoose.Schema.ObjectId;

const DepartmentSchema = new mongoose.Schema({
  departmentName: {
    type: String,
    //required: true,
  },
  departmentDesc: {
    type: String,
  },
  departmentEnteredById: {
    type: ObjectId,
  },
  departmentDateTime: {
    type: String,
    default: new Date().toLocaleString("en-GB"),
  },
  departmentEditedById: {
    type: ObjectId,
  },
  departmentEditedDateTime: {
    type: Date,
  },
});

module.exports = department = mongoose.model("department", DepartmentSchema);
