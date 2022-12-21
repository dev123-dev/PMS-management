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
    type: String,
    // default: Date.now(),
  },
  amendmentCounter: {
    type: Number,
  },
  amendmentType: {
    type: String, //Resolved,UnResolved
    default: "UnResolved",
  },
});

module.exports = projecttrack = mongoose.model(
  "projecttrack",
  ProjectTrackSchema
);
