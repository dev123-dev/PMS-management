const mongoose = require("mongoose");
ObjectId = mongoose.Schema.ObjectId;

const ClientSchema = new mongoose.Schema({
  clientName: {
    type: String,
    required: true,
  },
  clientCompanyName: {
    type: String,
  },
  clientCompanyFounderName: {
    type: String,
  },
  clientWebsite: {
    type: String,
  },
  clientBelongsToId: {
    type: ObjectId,
  },
  clientBelongsToName: {
    type: String,
  },
  clientEmail: {
    type: String,
  },
  clientContactNo1: {
    type: Number,
  },
  clientContactNo2: {
    type: Number,
  },
  clientAddress: {
    type: String,
  },
  clientCountry: {
    type: String,
  },
  clientStatus: {
    type: String,
    default: "Active",
  },
  clientDate: {
    type: String,
  },
  clientDateTime: {
    type: Date,
    default: Date.now(),
  },
  clientEnteredById: {
    type: ObjectId,
  },
  clientFolderName: {
    type: String,
  },
  clientCurrency: {
    type: String,
  },
  clientModeofPaymentId: {
    type: ObjectId,
  },
  clientModeofPaymentMode: {
    type: String,
  },
  clientType: {
    type: String,
  },
  clientEnteredById: {
    type: ObjectId,
  },
  clientEnteredDate: {
    type: String,
  },
  clientEnteredDateTime: {
    type: Date,
    default: Date.now(),
  },
  clientEditedById: {
    type: ObjectId,
  },
  clientEditedDateTime: {
    type: Date,
  },
  clientDeactiveById: {
    type: ObjectId,
  },
  clientDeactiveDate: {
    type: Date,
  },
  clientDeactiveReason: {
    type: String,
  },
  clientDeactiveDateTime: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = client = mongoose.model("client", ClientSchema);
