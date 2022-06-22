const {
  addMessage,
  getMessages,
  updateChatView,
} = require("../controllers/messageController");
const router = require("express").Router();

router.post("/addmsg/", addMessage);
router.post("/getmsg/", getMessages);
router.post("/updatechatview/", updateChatView);

module.exports = router;
