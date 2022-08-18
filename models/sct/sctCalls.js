const mongoose = require("mongoose");
ObjectId = mongoose.Schema.ObjectId;

const SctCallsSchema = new mongoose.Schema({
  sctCallToId: {
    type: ObjectId,
  },
  sctCallToName: {
    type: String,
  },
  sctCallToStaffId: {
    type: ObjectId,
  },
  sctCallToStaffName: {
    type: String,
  },
  sctCallFromId: {
    type: ObjectId,
  },
  sctCallFromName: {
    type: String,
  },
  sctCallCategory: {
    type: String,
  },
  sctCallStatus: {
    type: String,
  },
  sctCallDate: {
    type: String,
  },
  sctCallNote: {
    type: String,
  },
  sctCallEnteredDate: {
    type: String,
  },
  sctCallDateTime: {
    type: String,
    default: new Date().toLocaleString("en-GB"),
  },
});
module.exports = sctCalls = mongoose.model("sctCalls", SctCallsSchema);
