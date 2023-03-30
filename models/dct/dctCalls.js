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
  callToNumber: {
    type: String,
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
  dctLeadsCategory: {
    type: String, //Hot,Cool,Normal
  },
  callDate: {
    type: String, //Next call Date
  },
  callNote: {
    type: String,
  },
  callComeFrom: {
    type: String, //Leads or Clients
  },
  callTakenDate: {
    type: String, //Todays Date
  },
  callEnteredDateTime: {
    type: String,
    // default: new Date().toLocaleString("en-GB"),
  },
});
module.exports = dctCalls = mongoose.model("dctCalls", DctCallsSchema);
