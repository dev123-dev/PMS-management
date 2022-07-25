const mongoose = require("mongoose");
ObjectId = mongoose.Schema.ObjectId;

const DctLeadsHistorySchema = new mongoose.Schema({
  dlhCompanyName: {
    type: String,
  },
  dlhClientId: {
    type: ObjectId,
  },
  dlhClientName: {
    type: String,
  },
  dlhEmailId: {
    type: String,
  },
  dlhPhone1: {
    type: Number,
  },
  dlhPhone2: {
    type: Number,
  },
  dlhWebsite: {
    type: String,
  },
  dlhAddress: {
    type: String,
  },
  dlhImportantPoints: {
    type: String,
  },
  dlhCountryId: {
    type: ObjectId,
  },
  dlhCountryName: {
    type: String,
  },
  dlhStateId: {
    type: ObjectId,
  },
  dlhDistrictId: {
    type: ObjectId,
  },
  dlhDctLeadAddress: {
    type: String,
  },
  dlhDctLeadStatus: {
    type: String, //Active, Deactive
  },
  dlhDctLeadCategory: {
    type: String, //NC, prospect, followup,TC,RC
  },
  dlhDctLeadEnteredById: {
    type: ObjectId,
  },
  dlhDctLeadEnteredByName: {
    type: String,
  },
  dlhDctLeadEnteredDateTime: {
    type: String,
    default: new Date().toLocaleString("en-GB"),
  },
  dlhDctLeadEditedById: {
    type: ObjectId,
  },
  dlhDctLeadEditedDateTime: {
    type: String,
  },
  dlhDctLeadDeactivateById: {
    type: ObjectId,
  },
  dlhDctLeadDeactivateByDateTime: {
    type: String,
  },
});
module.exports = dctLeadsHistory = mongoose.model(
  "dctLeadsHistory",
  DctLeadsHistorySchema
);
