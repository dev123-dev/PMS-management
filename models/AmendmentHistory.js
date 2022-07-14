const mongoose = require("mongoose");
ObjectId = mongoose.Schema.ObjectId;

const AmendmentHistorySchema = new mongoose.Schema({
  amendmentCounter: {
    type: Number,
  },
  projectId: {
    type: ObjectId,
  },
  amendmentType: {
    type: String, //Solved,Resolved
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
    default: Date.now().toLocaleString("en-GB"),
  },
});

module.exports = amendmenthistory = mongoose.model(
  "amendmenthistory",
  AmendmentHistorySchema
);
