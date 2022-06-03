const mongoose = require("mongoose");
ObjectId = mongoose.Schema.ObjectId;

const GroupRightsSchema = new mongoose.Schema({
  userGroupId: {
    type: ObjectId,
  },
  rightId: {
    type: ObjectId,
  },
});

module.exports = groupright = mongoose.model("groupright", GroupRightsSchema);
