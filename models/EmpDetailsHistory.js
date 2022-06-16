const mongoose = require("mongoose");
ObjectId = mongoose.Schema.ObjectId;
require("mongoose-double")(mongoose);
var SchemaTypes = mongoose.Schema.Types;

const EmpDetailsHistorySchema = new mongoose.Schema({
  edhId: {
    type: ObjectId,
  },
  edhFullName: {
    type: String,
    required: true,
  },
  edhEmpCode: {
    type: String,
  },
  edhDepartmentId: {
    type: ObjectId,
  },
  edhDesignationId: {
    type: ObjectId,
  },
  edhDesignationDate: {
    type: String,
  },
  edhJoiningDate: {
    type: String,
  },
  edhDOB: {
    type: String,
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
    type: String,
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
  edhDA: {
    type: SchemaTypes.Double,
  },
  edhproinc: {
    type: SchemaTypes.Double,
  },
  edhCityallowance: {
    type: SchemaTypes.Double,
  },
  edhOthers: {
    type: SchemaTypes.Double,
  },
});

module.exports = empdetailshistory = mongoose.model(
  "empdetailshistory",
  EmpDetailsHistorySchema
);
