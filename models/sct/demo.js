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
  demoEnteredById: {
    type: ObjectId,
  },
  demoEnteredByDateTime: {
    type: String,
    default: new Date().toLocaleString("en-GB"),
  },
});
module.exports = demo = mongoose.model("demo", DemoSchema);
