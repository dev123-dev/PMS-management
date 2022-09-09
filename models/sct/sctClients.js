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
  sctLeadId: {
    type: ObjectId,
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
  projectsId: {
    type: ObjectId,
  },
  projectsName: {
    type: String,
  },
  countryId: {
    type: ObjectId,
  },
  countryName: {
    type: String,
  },
  sctcountryCode: {
    type: String,
  },
  stateId: {
    type: ObjectId,
  },
  stateName: {
    type: String,
  },
  districtId: {
    type: ObjectId,
  },
  sctClientStatus: {
    type: String, //Active, Deactive
  },
  sctClientCategory: {
    type: String, //EC,RC
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
  sctClientDeactivateDateTime: {
    type: String,
  },
  sctClientDeactivateReason: {
    type: String,
  },
  sctClientAssignedToId: {
    type: ObjectId,
  },
  sctClientAssignedToName: {
    type: String,
  },
  sctCallSchedule: {
    type: String, //Morning or afternoon
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
    type: String, //Engaged,Regular
  },
  sctStaffs: [
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
      sctStaffRegion: {
        type: String,
      },
      sctStaffRegionId: {
        type: ObjectId,
      },
      sctStaffCountryCode: {
        type: String,
      },
      sctStaffStateId: {
        type: ObjectId,
      },
      sctStaffDistrictId: {
        type: ObjectId,
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
  quarationGenerated: {
    type: Number, //0,1
    default: 0,
  },
});
module.exports = sctClients = mongoose.model("sctClients", SctClientsSchema);
