const mongoose = require("mongoose");
ObjectId = mongoose.Schema.ObjectId;

const DctLeadsSchema = new mongoose.Schema({
  companyName: {
    type: String,
    required: true,
  },
  clientId: {
    type: ObjectId,
  },
  clientName: {
    type: String,
  },
  emailId: {
    type: String,
  },
  phone1: {
    type: Number,
  },
  phone2: {
    type: Number,
  },
  website: {
    type: String,
  },
  address: {
    type: String,
  },
  importantPoints: {
    type: String,
  },
  countryId: {
    type: ObjectId,
  },
  countryName: {
    type: String,
  },
  stateId: {
    type: ObjectId,
  },
  districtId: {
    type: ObjectId,
  },
  dctLeadAddress: {
    type: String,
  },
  dctLeadStatus: {
    type: String, //Active, Deactive
  },
  dctLeadCategory: {
    type: String, //NC, prospect, followup,TC,RC
  },
  dctLeadEnteredById: {
    type: ObjectId,
  },
  dctLeadEnteredByName: {
    type: String,
  },
  dctLeadEnteredDateTime: {
    type: String,
    default: new Date().toLocaleString("en-GB"),
  },
  dctLeadEditedById: {
    type: ObjectId,
  },
  dctLeadEditedDateTime: {
    type: String,
  },
  dctLeadDeactivateById: {
    type: ObjectId,
  },
  dctLeadDeactivateByDateTime: {
    type: String,
  },
  // Services: {
  //   text: { type: String },
  // },
  // staffs: Array,
  // staffName: { type: String },
  // staffPhoneNumber: { type: Number },
  // staffEmailId: { type: String },
  // staffDesignation: { type: String },
});
module.exports = dctLeads = mongoose.model("dctLeads", DctLeadsSchema);
