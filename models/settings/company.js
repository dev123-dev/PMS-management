const mongoose = require("mongoose");
ObjectId = mongoose.Schema.ObjectId;

const companyDetailsSchema = new mongoose.Schema({
  companyName: {
    type: String,
  },
  companyPhone: {
    type: String,
  },
  companyDescription: {
    type: String,
  },
  companyShortForm: {
    type: String,
  },
  companyStatus: {
    type: String,
    default: "Active",
  },
  companyAddress: {
    type: String,
  },
  companyGSTIn: {
    type: String,
  },
  companyPanNo: {
    type: String,
  },
  companyEnteredById: {
    type: ObjectId,
  },
  companyEnteredByName: {
    type: String,
  },
  companyEnteredDateTime: {
    type: String,
    default: new Date().toLocaleString("en-GB"),
  },
  companyEditedById: {
    type: ObjectId,
  },
  companyEditedDateTime: {
    type: String,
  },
  companyDeactivateById: {
    type: ObjectId,
  },
  companyDeactivateDateTime: {
    type: String,
  },
  companyDeactivateReason: {
    type: String,
  },
});
module.exports = companyDetails = mongoose.model(
  "companyDetails",
  companyDetailsSchema
);
