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
    type: String, //Next call Date
  },
  callNote: {
    type: String,
  },
  callTakenDate: {
    type: String, //Todays Date
  },
  callComeFrom: {
    type: String, //Leads or Clients
  },
  callEnteredDateTime: {
    type: String,
    default: new Date().toLocaleString("en-GB"),
  },
});
module.exports = dctCalls = mongoose.model("dctCalls", DctCallsSchema);
