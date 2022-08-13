const mongoose = require("mongoose");
ObjectId = mongoose.Schema.ObjectId;

const DctCallsSchema = new mongoose.Schema({
  callToId: {
    type: ObjectId,
  },
  callToName: {
    type: String,
  },
  callToStaffId: {
    type: ObjectId,
  },
  callToStaffName: {
    type: String,
  },
  callFromId: {
    type: ObjectId,
  },
  callFromName: {
    type: String,
  },
  callCategory: {
    type: String,
  },
  callStatus: {
    type: String,
  },
  callDate: {
    type: Date,
  },
  callNote: {
    type: String,
  },
  callEnteredDate: {
    type: String,
  },
  callDateTime: {
    type: String,
    default: new Date().toLocaleString("en-GB"),
  },
});
module.exports = dctCalls = mongoose.model("dctCalls", DctCallsSchema);
