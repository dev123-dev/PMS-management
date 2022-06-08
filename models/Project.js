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
  // projectHours: {
  //   type: String,
  // },
  clientFolderName: {
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
    type: String,
  },
  projectEnteredDateTime: {
    type: Date,
    default: Date.now(),
  },
  projectEnteredById: {
    type: ObjectId,
  },
  // projectEnteredDate: {
  //   type: String,
  // },
  // projectEntryTime: {
  //   type: String,
  // },
  clientTime: {
    type: String,
  },
  clientDate: {
    type: String,
  },
  projectTimeTaken: {
    type: String,
  },
  eDate: {
    type: String,
  },
  aDate: {
    type: String,
  },
  wDate: {
    type: String,
  },
  wEndDate: {
    type: String,
  },
  QCDate: {
    type: String,
  },
  QCEndDate: {
    type: String,
  },
  UDate: {
    type: String,
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
  projectStatus: {
    type: String,
  },
  projectStatusId: {
    type: ObjectId,
  },
  projectDeactiveReason: {
    type: String,
  },
  projectDeactiveById: {
    type: ObjectId,
  },
  projectDeactiveDate: {
    type: String,
  },
  projectDeactiveDateTime: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = project = mongoose.model("project", ProjectSchema);
