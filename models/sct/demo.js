const mongoose = require("mongoose");
ObjectId = mongoose.Schema.ObjectId;

const DemoSchema = new mongoose.Schema({
  demoDate: {
    type: String,
  },
  clientId: {
    type: ObjectId,
  },
  clientName: {
    type: String,
  },
  clientDetails: {
    sctCompanyName: {
      type: String,
    },
    sctEmailId: {
      type: String,
    },
    sctPhone1: {
      type: String,
    },
    sctCallToStaffId: {
      type: ObjectId,
    },
    sctCallToStaffName: {
      type: String,
    },
    stateId: {
      type: ObjectId,
    },
    stateName: {
      type: String,
    },
  },
  fromTime: {
    type: String,
  },
  toTime: {
    type: String,
  },
  callDate: {
    type: String,
  },
  demoCategory: {
    type: String, //demo,additionalDemo,trainingDemo
  },
  demoStatus: {
    type: String, //Not Taken, Taken
  },
  sctDemoComeFrom: {
    type: String, //Lead,Client
  },
  demoEnteredById: {
    type: ObjectId,
  },
  demoEnteredByDateTime: {
    type: String,
    // default: new Date().toLocaleString("en-GB"),
  },
});
module.exports = demo = mongoose.model("demo", DemoSchema);
