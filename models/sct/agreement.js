const mongoose = require("mongoose");
ObjectId = mongoose.Schema.ObjectId;

const AgreementsSchema = new mongoose.Schema({
  clientId: {
    type: ObjectId,
  },
  clientName: {
    type: String,
  },
  clientAddress: {
    type: String,
  },
  agreementNo: {
    type: String,
  },
  agreementDate: {
    type: String,
  },
  agreementDateInWords: {
    type: String,
  },
  companyId: {
    type: ObjectId,
  },
  companyName: {
    type: String,
  },
  companyAddress: {
    type: String,
  },
  fromName: {
    type: String,
  },
  fromDesg: {
    type: String,
  },
  toName: {
    type: String,
  },
  toDesg: {
    type: String,
  },
  status: {
    type: String,
    default: "Active",
  },
  agreementEnteredById: {
    type: ObjectId,
  },
  agreementEnteredByDateTime: {
    type: String,
    default: new Date().toLocaleString("en-GB"),
  },
});
module.exports = agreements = mongoose.model("agreements", AgreementsSchema);
