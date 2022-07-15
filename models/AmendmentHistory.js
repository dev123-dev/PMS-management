const mongoose = require("mongoose");
ObjectId = mongoose.Schema.ObjectId;

const AmendmentHistorySchema = new mongoose.Schema({
  projectId: {
    type: ObjectId,
  },
  amendmentType: {
    type: String, //Resolved,UnResolved
  },
  discussionPoints: {
    type: String,
  },
  amendmentEnteredById: {
    type: ObjectId,
  },
  amendmentEnteredByName: {
    type: String,
  },
  amendmentDateTime: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = amendmenthistory = mongoose.model(
  "amendmenthistory",
  AmendmentHistorySchema
);
