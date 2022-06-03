const mongoose = require("mongoose");
ObjectId = mongoose.Schema.ObjectId;

const DepsignationSchema = new mongoose.Schema({
  designationName: {
    type: String,
    required: true,
  },
  designationDesc: {
    type: String,
    required: true,
  },
  designationEnteredById: {
    type: ObjectId,
  },
  designationDateTime: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = designation = mongoose.model(
  "designation",
  DepsignationSchema
);
