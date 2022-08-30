const mongoose = require("mongoose");
ObjectId = mongoose.Schema.ObjectId;

const SctLeadsSchema = new mongoose.Schema({
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
  sctWebsite: {
    type: String,
  },
  sctLeadAddress: {
    type: String,
  },
  sctImportantPoints: {
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
  districtId: {
    type: ObjectId,
  },
  sctLeadStatus: {
    type: String, //Active, Deactive
    default: "Active",
  },
  sctLeadCategory: {
    type: String, //NC,P,F,TC,RC
  },
  sctLeadCategoryStatus: {
    type: String, //(FL,VM,CB,DND,NI)
  },
  sctCallDate: {
    type: String,
  },
  sctLeadEnteredById: {
    type: ObjectId,
  },
  sctLeadEnteredByName: {
    type: String,
  },
  sctLeadEnteredDateTime: {
    type: String,
    default: new Date().toLocaleString("en-GB"),
  },
  sctLeadEditedById: {
    type: ObjectId,
  },
  sctLeadEditedDateTime: {
    type: String,
  },
  sctLeadDeactivateById: {
    type: ObjectId,
  },
  sctLeadDeactivateByDateTime: {
    type: String,
  },
  sctLeadDeactiveReason: {
    type: String,
  },
  sctLeadAssignedToId: {
    type: ObjectId,
  },
  sctLeadAssignedToName: {
    type: String,
  },
  sctCallSchedule: {
    type: String, //Morning or afternoon
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
      sctStaffDeactiveReason: {
        type: String,
      },
      sctStaffStatus: {
        type: String,
        default: "Active",
      },
      sctstaffRegion: {
        type: String,
      },
      sctstaffRegionId: {
        type: ObjectId,
      },
      sctstaffCountryCode: {
        type: String,
      },
      sctstaffStateId: {
        type: ObjectId,
      },
      sctstaffDistrictId: {
        type: ObjectId,
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
module.exports = sctLeads = mongoose.model("sctLeads", SctLeadsSchema);
