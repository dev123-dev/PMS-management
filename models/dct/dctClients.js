const mongoose = require("mongoose");
ObjectId = mongoose.Schema.ObjectId;

const DctClientsSchema = new mongoose.Schema({
  dctCompanyName: {
    type: String,
  },
  clientName: {
    type: String,
  },
  clientCompanyFounderName: {
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
  billingEmail: {
    type: String,
  },
  website: {
    type: String,
  },
  address: {
    type: String,
  },
  clientStatus: {
    type: String,
  },
  clientFolderName: {
    type: String,
  },
  clientCurrency: {
    type: String,
  },
  paymentId: {
    type: ObjectId,
  },
  paymentModeName: {
    type: String,
  },
  clientType: {
    type: String, //Test,Regular
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
  dctClientStatus: {
    type: String,
  },
  dctClientCategory: {
    type: String, //Active,Deactive
  },
  dctCallDate: {
    type: String, //NC,P,F,TC,RC
  },
  dctClientEnteredById: {
    type: ObjectId,
  },
  dctClientEnteredByName: {
    type: String,
  },
  dctClientEnteredDateTime: {
    type: String,
    default: new Date().toLocaleString("en-GB"),
  },
  dctClientEditedById: {
    type: ObjectId,
  },
  dctClientEditedDateTime: {
    type: String,
  },
  dctClientDeactivateById: {
    type: ObjectId,
  },
  dctClientDeactivateReason: {
    type: String,
  },
  dctClientDeactivateDateTime: {
    type: String,
  },
  dctClientAssignedToId: {
    type: ObjectId,
  },
  dctClientAssignedToName: {
    type: String,
  },

  //   Services: {
  //     text: { type: String },
  //   },
});
module.exports = dctClients = mongoose.model("dctClients", DctClientsSchema);
