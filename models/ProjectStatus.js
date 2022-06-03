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
  projectStutusEnteredById: {
    type: ObjectId,
  },
  projectStatusDateTime: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = projectstatus = mongoose.model(
  "projectstatus",
  ProjectStatusSchema
);
