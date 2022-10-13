const mongoose = require("mongoose");
ObjectId = mongoose.Schema.ObjectId;
require("mongoose-double")(mongoose);
var SchemaTypes = mongoose.Schema.Types;

const DailyTargetSchema = new mongoose.Schema({
  projectId: {
    type: ObjectId,
  },
  projectName: {
    type: String,
    required: true,
  },
  inputpath: {
    type: String,
  },
  projectBelongsToId: {
    type: ObjectId,
  },
  dailyTargetDate: {
    type: String,
  },
  projectQuantity: {
    type: Number,
  },
  assignedToId: {
    type: ObjectId,
  },
  assignedTo: {
    type: String,
  },
  estimateQty: {
    type: Number,
  },
  targetSetFor: {
    type: String, //Day Or Night
  },
  estimatedTime: {
    type: String,
  },
  effectJobQueueCount: {
    type: Boolean, //true or false
  },
  projectStatusId: {
    type: ObjectId,
  },
  projectStatusType: {
    type: String,
  },
  projectNotes: {
    type: String,
  },
  workedQty: {
    type: Number,
  },
  workedQtyReason: {
    type: String,
  },
  qcPriority: {
    type: Boolean, //true or false(star)
  },
  dailyTargetEnteredById: {
    type: ObjectId,
  },
  dailyTargetEnteredByName: {
    type: String,
  },
  dailyTargetEnteredDateTime: {
    type: String,
  },
  dailyTargetEditedById: {
    type: ObjectId,
  },
  daillyTargetEditedByName: {
    type: String,
  },
  dailyTargetEditedByDateTime: {
    type: String,
  },
  dailyTargetDeactiveById: {
    type: ObjectId,
  },
  dailyTargetDeactiveByName: {
    type: String,
  },
  dailyTargetDeactiveDateTime: {
    type: String,
  },
  dailyTargetDeactiveReason: {
    type: String,
  },
  clientId: {
    type: ObjectId,
  },
  clientName: {
    type: String,
  },
});

module.exports = dailyTarget = mongoose.model("dailyTarget", DailyTargetSchema);
