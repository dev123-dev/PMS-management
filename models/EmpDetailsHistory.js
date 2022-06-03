const mongoose = require("mongoose");
ObjectId = mongoose.Schema.ObjectId;
require("mongoose-double")(mongoose);
var SchemaTypes = mongoose.Schema.Types;

const EmpDetailsHistorySchema = new mongoose.Schema({
  edhFullName: {
    type: String,
    required: true,
  },
  edhDepartmentId: {
    type: ObjectId,
  },
  edhDesignationId: {
    type: ObjectId,
  },
  edhDesignationDate: {
    type: Date,
  },
  edhJoiningDate: {
    type: Date,
  },
  edhDOB: {
    type: Date,
  },
  edhAadharNo: {
    type: String,
  },
  edhPanNo: {
    type: String,
  },
  edhPhone: {
    type: Number,
  },
  edhEmail: {
    type: String,
  },
  edhAddress: {
    type: String,
  },
  edhState: {
    type: String,
  },
  edhPincode: {
    type: Number,
  },
  edhGroupId: {
    type: ObjectId,
  },
  edhStatus: {
    type: String,
  },
  edhEditedById: {
    type: ObjectId,
  },
  edhEditedDateTime: {
    type: Date,
    default: Date.now(),
  },
  edhBankName: {
    type: String,
  },
  edhAccountNo: {
    type: String,
  },
  edhBankBranch: {
    type: String,
  },
  edhIFSCCode: {
    type: String,
  },
  edhPFNo: {
    type: String,
  },
  edhPFDate: {
    type: Date,
  },
  edhUANNo: {
    type: Number,
  },
  edhESICNo: {
    type: Number,
  },
  edhBasic: {
    type: SchemaTypes.Double,
  },
  edhHRA: {
    type: SchemaTypes.Double,
  },
  edhCA: {
    type: SchemaTypes.Double,
  },
});

module.exports = empdetailshistory = mongoose.model(
  "empdetailshistory",
  EmpDetailsHistorySchema
);
