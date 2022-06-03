const mongoose = require("mongoose");
ObjectId = mongoose.Schema.ObjectId;

const UserGroupSchema = new mongoose.Schema({
  userGroupName: {
    type: String,
    required: true,
  },
  userGroupDateTime: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = userGroup = mongoose.model("userGroup", UserGroupSchema);
