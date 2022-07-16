const mongoose = require("mongoose");
ObjectId = mongoose.Schema.ObjectId;

const StateSchema = new mongoose.Schema({
  stateName: {
    type: String,
    required: true,
  },
  stateStatus: {
    type: String,
    default: "Active",
  },
  stateBelongsTo: {
    type: String, //SCT,DCT
  },
  stateEnteredById: {
    type: ObjectId,
  },
  stateEnteredByName: {
    type: String,
  },
  stateEnteredDateTime: {
    type: Date,
    default: new Date().toLocaleString("en-GB"),
  },
  stateEditedById: {
    type: ObjectId,
  },
  stateEditedDateTime: {
    type: Date,
  },
  stateDeactiveById: {
    type: ObjectId,
  },
  stateDeactivateDateTime: {
    type: Date,
  },
  stateDeactivateReason: {
    type: String,
  },
});

module.exports = state = mongoose.model("state", StateSchema);
