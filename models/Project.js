const mongoose = require("mongoose");
ObjectId = mongoose.Schema.ObjectId;
require("mongoose-double")(mongoose);
var SchemaTypes = mongoose.Schema.Types;

const ProjectSchema = new mongoose.Schema({
  projectName: {
    type: String,
    required: true,
  },
  clientId: {
    type: ObjectId,
  },
  parentClientId: {
    type: ObjectId,
  },
  projectLocation: {
    type: String,
  },
  projectPriority: {
    type: String,
  },
  projectJobtype: {
    type: String,
  },
  projectHours: {
    type: String,
  },
  projectNotes: {
    type: String,
  },
  projectDeadline: {
    type: String,
  },
  projectPrice: {
    type: SchemaTypes.Double,
  },
  projectQuantity: {
    type: Number,
  },
  projectUnconfirmed: {
    type: String,
  },
  projectVendor: {
    type: String,
  },
  projectTime: {
    type: String,
  },
  projectDate: {
    type: Date,
  },
  projectDateTime: {
    type: Date,
    default: Date.now(),
  },
  projectEnteredById: {
    type: ObjectId,
  },
  projectEnteredDate: {
    type: Date,
  },
  projectEntryTime: {
    type: String,
  },
  projectTimeTaken: {
    type: String,
  },
  projectMailSent: {
    type: String,
  },
  eDate: {
    type: Date,
  },
  aDate: {
    type: Date,
  },
  wDate: {
    type: Date,
  },
  wEndDate: {
    type: Date,
  },
  QCDate: {
    type: Date,
  },
  QCEndDate: {
    type: Date,
  },
  UDate: {
    type: Date,
  },
  ptEstimatedTime: {
    type: String,
  },
  projectEditedById: {
    type: ObjectId,
  },
  projectEditedDateTime: {
    type: Date,
  },
  projectDeactiveById: {
    type: ObjectId,
  },
  projectDeactiveDate: {
    type: Date,
  },
  projectDeactiveDateTime: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = project = mongoose.model("project", ProjectSchema);
