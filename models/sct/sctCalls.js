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
  sctcallToNumber: {
    type: String,
  },
  sctCallCategory: {
    type: String,
  },
  sctCallStatus: {
    type: String,
  },
  sctLeadsCategory: {
    type: String, //Hot,Cool,Normal
  },
  sctCallDate: {
    type: String,
  },
  sctCallTime: {
    type: String,
  },
  sctCallNote: {
    type: String,
  },
  sctExpectedMonth: {
    type: String,
  },
  sctExpectedMonthYear: {
    type: String,
  },
  sctCallSalesValue: {
    type: Number,
  },
  sctCallReasonForChange: {
    type: String,
  },
  sctCallComeFrom: {
    type: String, //Leads or Clients
  },
  sctCallTakenDate: {
    type: String, //Todays Date
  },
  sctCallEnteredDate: {
    type: String,
  },
  sctCallDateTime: {
    type: String,
    // default: new Date().toLocaleString("en-GB"),
  },
});
module.exports = sctCalls = mongoose.model("sctCalls", SctCallsSchema);
