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
    type: String,
  },
  phone2: {
    type: String,
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
  countryCode: {
    type: String,
  },
  // stateId: {
  //   type: ObjectId,
  // },
  // districtId: {
  //   type: ObjectId,
  // } //praziz,
  dctLeadStatus: {
    type: String, //Active, Deactive
    default: "Active",
  },
  dctLeadCategory: {
    type: String, //NL,P,F,TC,RC
  },
  dctLeadCategoryStatus: {
    type: String, //(FL,VM,CB,DND,NI)
  },
  dctCallDate: {
    type: String,
  },
  dctLeadEnteredById: {
    type: ObjectId,
  },
  dctLeadEnteredByName: {
    type: String,
  },
  dctLeadEnteredDateTime: {
    type: String,
    // default: new Date().toLocaleString("en-GB"),
  },

  dctLeadEnteredDate: {
    type: String,
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
  dctLeadAssignedToId: {
    type: ObjectId,
  },
  dctLeadAssignedToName: {
    type: String,
  },

  dctLeadTransferById: {
    type: ObjectId,
  },
  dctLeadTransferByName: {
    type: String,
  },
  dctLeadTransferDateTime: {
    type: String,
  },
  services: [],
  staffs: [
    {
      staffName: {
        type: String,
      },
      staffPhoneNumber: {
        type: String,
      },
      staffEmailId: {
        type: String,
      },
      staffDesignation: {
        type: String,
      },
      staffDeactiveReason: {
        type: String,
      },
      staffStatus: {
        type: String,
        default: "Active",
      },
      staffRegion: {
        type: String,
      },
      staffRegionId: {
        type: ObjectId,
      },
      staffCountryCode: {
        type: String,
      },
      staffDeactivateById: {
        type: ObjectId,
      },
      staffDeactiveByDateTime: {
        type: String,
      },
    },
  ],
});
module.exports = dctLeads = mongoose.model("dctLeads", DctLeadsSchema);
