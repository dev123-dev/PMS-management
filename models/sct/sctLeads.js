const mongoose = require("mongoose");
ObjectId = mongoose.Schema.ObjectId;
//Add New Column in sctClients & transfer function
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
  sctLeadStatus: {
    type: String, //Active, Deactive
    default: "Active",
  },
  sctLeadCategory: {
    type: String, //NL,P,F,TC,RC
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
});
module.exports = sctLeads = mongoose.model("sctLeads", SctLeadsSchema);
