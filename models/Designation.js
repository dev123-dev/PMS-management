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
  designationStatus: {
    type: String,
    default: "Active",
  },
  designationEnteredById: {
    type: ObjectId,
  },
  designationDateTime: {
    type: Date,
    default: Date.now(),
  },
  designationEditedById: {
    type: ObjectId,
  },
  designationEditedDateTime: {
    type: Date,
  },
});

module.exports = designation = mongoose.model(
  "designation",
  DepsignationSchema
);
