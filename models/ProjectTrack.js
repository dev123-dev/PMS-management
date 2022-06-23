const mongoose = require("mongoose");
ObjectId = mongoose.Schema.ObjectId;

const ProjectTrackSchema = new mongoose.Schema({
  projectId: {
    type: ObjectId,
  },
  projectTrackStatusId: {
    type: ObjectId,
  },
  projectStatusType: {
    type: String,
  },
  ptEstimatedTime: {
    type: String,
  },
  projectStatusChangedbyName: {
    type: String,
  },
  projectStatusChangedById: {
    type: ObjectId,
  },
  projectTrackEnteredById: {
    type: ObjectId,
  },
  projectTrackLatestChange: {
    type: String,
  },
  projectTrackDateTime: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = projecttrack = mongoose.model(
  "projecttrack",
  ProjectTrackSchema
);
