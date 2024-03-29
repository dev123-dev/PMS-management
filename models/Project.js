const mongoose = require("mongoose");
ObjectId = mongoose.Schema.ObjectId;
require("mongoose-double")(mongoose);
var SchemaTypes = mongoose.Schema.Types;

const ProjectSchema = new mongoose.Schema({
  projectName: {
    type: String,
    required: true,
  },
  clientId: {
    type: ObjectId,
  },
  oldClientId: {
    type: ObjectId,
  },
  clientName: {
    type: String,
  },
  staffId: {
    type: ObjectId,
  },
  staffName: {
    type: String,
  },
  Reviewer: {
    type: String,
  },
  ReviewerId: {
    type: ObjectId,
  },
  parentClientId: {
    type: ObjectId,
  },
  parentClientName: {
    type: String,
  },
  projectLocation: {
    type: String,
  },
  projectPriority: {
    type: String,
  },
  projectBelongsToId: {
    type: ObjectId,
  },
  // projectHours: {
  //   type: String,
  // },
  clientFolderName: {
    type: String,
  },
  projectNotes: {
    type: String,
  },
  inputpath: {
    type: String,
  },
  projectDeadline: {
    type: String,
  },
  projectPrice: {
    type: SchemaTypes.Double,
  },
  projectQuantity: {
    type: Number,
  },
  projectUnconfirmed: {
    type: Boolean,
  },
  outputformat: {
    type: String,
  },

  projectVendor: {
    type: String,
  },
  projectTime: {
    type: String,
  },
  projectDate: {
    type: String,
  },
  projectEnteredDateTime: {
    type: String,
    default: new Date().toLocaleString("en-GB"),
  },
  projectEnteredById: {
    type: ObjectId,
  },
  projectEnteredByName: {
    type: String,
  },
  // projectEnteredDate: {
  //   type: String,
  // },
  // projectEntryTime: {
  //   type: String,
  // },
  clientTime: {
    type: String,
  },
  clientDate: {
    type: String,
  },
  projectTimeTaken: {
    type: String,
  },
  eDate: {
    type: String,
  },
  aDate: {
    type: String,
  },
  wDate: {
    type: String,
  },
  wEndDate: {
    type: String,
  },
  QCDate: {
    type: String,
  },
  QCEndDate: {
    type: String,
  },
  UDate: {
    type: String,
  },
  ptEstimatedTime: {
    type: String,
  },
  ptEstimatedDateTime: {
    type: String,
  },
  projectEditedById: {
    type: ObjectId,
  },
  projectEditedDateTime: {
    type: Date,
  },
  projectStatus: {
    type: String,
    default: "Active",
  },
  clientTypeVal: {
    type: String,
  },

  projectStatusId: {
    type: ObjectId,
  },
  projectStatusType: {
    type: String,
  },
  projectDeactiveReason: {
    type: String,
  },
  projectDeleteById: {
    type: ObjectId,
  },
  projectDeleteDate: {
    type: String,
  },
  projectDeleteDateTime: {
    type: Date,
  },
  projectVerificationStatus: {
    type: String,
  },
  projectVerifiedById: {
    type: ObjectId,
  },
  projectVerifiedDateTime: {
    type: Date,
  },
  timeOutMsgSent: {
    type: Number,
    default: 0,
  },
  billingData: [],
  oldClientFolderName: {
    type: String,
  },

  screenshot: [
    {
      PhotoUpload: {
        type: String,
      },
      imageNotes: {
        type: String,
      },

      fileType: {
        type: String,
      },
    },
  ],
});

module.exports = project = mongoose.model("project", ProjectSchema);
