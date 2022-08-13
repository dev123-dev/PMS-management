const mongoose = require("mongoose");
ObjectId = mongoose.Schema.ObjectId;

const DctLeadsSchema = new mongoose.Schema({
  companyName: {
    type: String,
    required: true,
  },
  website: {
    type: String,
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
  dctLeadAddress: {
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
  dctLeadStatus: {
    type: String, //Active, Deactive
  },
  dctLeadCategory: {
    type: String, //NC,prospect,followup,TC,RC
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
  dctLeadDeactiveReason: {
    type: String,
  },
  services: [],
  staffs: [
    {
      staffName: {
        type: String,
      },
      staffPhoneNumber: {
        type: Number,
      },
      staffEmailId: {
        type: String,
      },
      staffDesignation: {
        type: String,
      },
    },
  ],
});
module.exports = dctLeads = mongoose.model("dctLeads", DctLeadsSchema);
