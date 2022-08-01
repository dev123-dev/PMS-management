const mongoose = require("mongoose");
ObjectId = mongoose.Schema.ObjectId;

const DctClientsHistorySchema = new mongoose.Schema({
  dclDctCompanyName: {
    type: String,
  },
  dclClientName: {
    type: String,
  },
  dclClientCompanyFounderName: {
    type: String,
  },
  dclEmailId: {
    type: String,
  },
  dclPhone1: {
    type: Number,
  },
  dclPhone2: {
    type: Number,
  },
  dclBillingEmail: {
    type: String,
  },
  dclWebsite: {
    type: String,
  },
  dclAddress: {
    type: String,
  },
  dclClientStatus: {
    type: String,
  },
  dclClientFolderName: {
    type: String,
  },
  dclClientCurrency: {
    type: String,
  },
  dclPaymentId: {
    type: ObjectId,
  },
  dclPaymentModeName: {
    type: String,
  },
  dclClientType: {
    type: String, //Test,Regular
  },
  dclImportantPoints: {
    type: String,
  },
  dclCountryId: {
    type: ObjectId,
  },
  dclCountryName: {
    type: String,
  },
  dclStateId: {
    type: ObjectId,
  },
  dclDistrictId: {
    type: ObjectId,
  },
  dclDctClientStatus: {
    type: String,
  },
  dclDctClientCategory: {
    type: String, //Active,Deactive
  },
  dclDctClientEnteredById: {
    type: ObjectId,
  },
  dclDctClientEnteredByName: {
    type: String,
  },
  dclDctClientEnteredDateTime: {
    type: String,
    default: new Date().toLocaleString("en-GB"),
  },
  dclDctClientEditedById: {
    type: ObjectId,
  },
  dclDctClientEditedDateTime: {
    type: String,
  },
  dclDctClientDeactivateById: {
    type: ObjectId,
  },
  dclDctClientDeactivateReason: {
    type: String,
  },
  dclDctClientDeactivateDateTime: {
    type: String,
  },
  dclDctClientAssignedToId: {
    type: ObjectId,
  },
  dclDctClientAssignedToName: {
    type: String,
  },
});
module.exports = dctClientsHistory = mongoose.model(
  "dctClientsHistory",
  DctClientsHistorySchema
);
