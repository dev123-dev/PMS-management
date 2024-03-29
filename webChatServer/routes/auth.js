const {
  login,
  register,
  getAllUsers,
  getAllUsersMsgCount,
  logOut,
} = require("../controllers/userController");

const router = require("express").Router();

router.post("/login", login);
router.post("/register", register);
router.get("/allusers/:id", getAllUsers);
router.get("/allusersmsgcount/:id", getAllUsersMsgCount);
router.get("/logout/:id", logOut);

module.exports = router;
