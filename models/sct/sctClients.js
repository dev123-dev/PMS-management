const mongoose = require("mongoose");
ObjectId = mongoose.Schema.ObjectId;

const SctClientsSchema = new mongoose.Schema({
  sctCompanyName: {
    type: String,
    required: true,
  },
  sctClientName: {
    type: String,
  },
  sctEmailId: {
    type: String,
  },
  sctPhone1: {
    type: Number,
  },
  sctPhone2: {
    type: Number,
  },
  sctBillingEmail: {
    type: String,
  },
  sctWebsite: {
    type: String,
  },
  sctClientAddress: {
    type: String,
  },
  sctClientImportantPoints: {
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
  sctClientStatus: {
    type: String, //Active, Deactive
  },
  sctClientCategory: {
    type: String, //NC,P,F,TC,RC
  },
  sctClientCategoryStatus: {
    type: String, //(FL,VM,CB,DND,NI)
  },
  sctCallDate: {
    type: String,
  },
  sctClientEnteredById: {
    type: ObjectId,
  },
  sctClientEnteredByName: {
    type: String,
  },
  sctClientEnteredDateTime: {
    type: String,
    default: new Date().toLocaleString("en-GB"),
  },
  sctClientEditedById: {
    type: ObjectId,
  },
  sctClientEditedDateTime: {
    type: String,
  },
  sctClientDeactivateById: {
    type: ObjectId,
  },
  sctClientDeactivateReason: {
    type: String,
  },
  sctClientDeactivateDateTime: {
    type: String,
  },
  sctClientAssignedToId: {
    type: ObjectId,
  },
  sctClientAssignedToName: {
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
  clientFolderName: {
    type: String,
  },
  staffs: [
    {
      sctStaffName: {
        type: String,
      },
      sctStaffPhoneNumber: {
        type: Number,
      },
      sctStaffEmailId: {
        type: String,
      },
      sctStaffDesignation: {
        type: String,
      },
      sctStaffStatus: {
        type: String,
        default: "Active",
      },
      sctStaffDeactiveReason: {
        type: String,
      },
      sctStaffDeactivateById: {
        type: ObjectId,
      },
      sctStaffDeactiveByDateTime: {
        type: String,
      },
    },
  ],
});
module.exports = sctClients = mongoose.model("sctClients", SctClientsSchema);
