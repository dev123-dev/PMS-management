const mongoose = require("mongoose");
ObjectId = mongoose.Schema.ObjectId;

const DctClientsSchema = new mongoose.Schema({
  companyName: {
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
  billingEmail: {
    type: String,
  },
  clientEmail: {
    type: String,
  },
  phone1: {
    type: String,
  },
  phone2: {
    type: String,
  },
  website: {
    type: String,
  },
  address: {
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
  countryCode: {
    type: String,
  },
  stateId: {
    type: ObjectId,
  },
  districtId: {
    type: ObjectId,
  },
  dctClientStatus: {
    type: String, //Active,Deactive
    default: "Active",
  },
  clientFolderName: {
    type: String,
  },
  dctClientCategory: {
    type: String, //TC,RC
  },
  dctClientCategoryStatus: {
    type: String,
  },
  dctCallDate: {
    type: String,
  },
  dctClientEnteredById: {
    type: ObjectId,
  },
  dctClientEnteredByName: {
    type: String,
  },
  dctClientEnteredDateTime: {
    type: String,
    // default: new Date().toLocaleString("en-GB"),
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
      staffDeactiveReason: {
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
  instructions: [
    {
      instructionName: {
        type: String,
      },
      instructionDiscription: {
        type: String,
      },
    },
  ],
});
module.exports = dctClients = mongoose.model("dctClients", DctClientsSchema);
