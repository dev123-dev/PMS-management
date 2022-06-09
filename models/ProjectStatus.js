const mongoose = require("mongoose");
ObjectId = mongoose.Schema.ObjectId;

const ProjectStatusSchema = new mongoose.Schema({
  projectStatusType: {
    type: String,
    required: true,
  },
  projectStatusCategory: {
    type: String,
  },
  projectStatusColor: {
    type: String,
  },
  projectStatusStatus: {
    type: String,
    default: "Active",
  },
  projectStutusEnteredById: {
    type: ObjectId,
  },
  projectStatusDateTime: {
    type: Date,
    default: Date.now(),
  },
  projectStutusEditedById: {
    type: ObjectId,
  },
  projectStatusEditedDateTime: {
    type: Date,
  },
  projectStutusDeactiveReason: {
    type: String,
  },
  projectStutusDeactiveById: {
    type: ObjectId,
  },
  projectStatusDeactiveDateTime: {
    type: Date,
  },
});

module.exports = projectstatus = mongoose.model(
  "projectstatus",
  ProjectStatusSchema
);
