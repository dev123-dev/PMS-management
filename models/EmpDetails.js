const mongoose = require("mongoose");
ObjectId = mongoose.Schema.ObjectId;
require("mongoose-double")(mongoose);
var SchemaTypes = mongoose.Schema.Types;

const EmpDetailsSchema = new mongoose.Schema({
  empFullName: {
    type: String,
    required: true,
  },
  userName: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  empCode: {
    type: String,
  },
  empDepartmentId: {
    type: ObjectId,
  },
  empDesignationId: {
    type: ObjectId,
  },
  empDesignationDate: {
    type: Date,
  },
  empJoiningDate: {
    type: Date,
  },
  empDOB: {
    type: Date,
  },
  empAadharNo: {
    type: String,
  },
  empPanNo: {
    type: String,
  },
  empPhone: {
    type: Number,
  },
  empEmail: {
    type: String,
  },
  empAddress: {
    type: String,
  },
  empState: {
    type: String,
  },
  empPincode: {
    type: Number,
  },
  empGroupId: {
    type: ObjectId,
  },
  empStatus: {
    type: Number,
    default: "Active",
  },
  empColorCode: {
    type: String,
  },
  empEnteredById: {
    type: ObjectId,
  },
  empDateTime: {
    type: Date,
  },
  empDeactiveReason: {
    type: String,
  },
  empDeactiveById: {
    type: ObjectId,
  },
  empDeactiveDateTime: {
    type: Date,
  },
  empBankName: {
    type: String,
  },
  empAccountNo: {
    type: String,
  },
  empBankBranch: {
    type: String,
  },
  empIFSCCode: {
    type: String,
  },
  empPFNo: {
    type: String,
  },
  empPFDate: {
    type: Date,
  },
  empUANNo: {
    type: Number,
  },
  empESICNo: {
    type: Number,
  },
  empBasic: {
    type: SchemaTypes.Double,
  },
  empHRA: {
    type: SchemaTypes.Double,
  },
  empCA: {
    type: SchemaTypes.Double,
  },
});

module.exports = EmpDetails = mongoose.model("EmpDetails", EmpDetailsSchema);
