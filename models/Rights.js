const mongoose = require("mongoose");
ObjectId = mongoose.Schema.ObjectId;

const RightsSchema = new mongoose.Schema({
  rightName: {
    type: String, //Add,Edit,Delete,View,Status
    required: true,
  },
  rightDesc: {
    type: String,
  },
  rightEnteredById: {
    type: ObjectId,
  },
  rightEnteredDateTime: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = rights = mongoose.model("rights", RightsSchema);
