const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const auth = require("../../middleware/auth");
const jwt = require("jsonwebtoken");
//const config = require('config');
const { check, validationResult } = require("express-validator");
const EmployeeDetails = require("../../models/EmpDetails");
const LoginHistory = require("../../models/LoginHistory");
var nodemailer = require("nodemailer");
const { networkInterfaces } = require("os");
const nets = networkInterfaces();

const {
  SERVER_ERROR,
  USERNAME_REQUIRED_INVALID,
  PASSWORD_INVALID,
  USERNAME,
  PASSWORD,
  USER_EXISTS,
  INVALID_CREDENTIALS,
  JWT_SECRET,
  STATUS_CODE_200,
  STATUS_CODE_400,
  STATUS_CODE_500,

  EXPIRES_IN,
} = require("../../common/constant/constants");

const {
  LOGIN,
  LOAD_USER,
  GET_ALL_USERS,
  FILTER_USERS,
  CHANGE_PWD,
} = require("../../common/constant/api-constants");

// @route    POST api/auth
// @desc     Authenticate user & get token
// @access   Public
router.post(
  LOGIN,
  [
    check(USERNAME, USERNAME_REQUIRED_INVALID).exists(),
    check(PASSWORD, PASSWORD_INVALID).exists(),
  ],

  async (req, res) => {
    // const errors = validationResult(req);
    // if (!errors.isEmpty()) {
    //   return res.status(STATUS_CODE_400).json({ errors: errors.array() });
    // }

    //retriving Data
    const { userName, password } = req.body;
    console.log("userName", userName);

    try {
      //userName Check In DB
      let userDetails = await EmployeeDetails.findOne({
        userName: userName,
      });

      if (!userDetails) {
        return res.status(STATUS_CODE_400).json({
          errors: [{ msg: INVALID_CREDENTIALS }],
        });
      }

      //Match The Passwords
      const isMatch = await bcrypt.compare(password, userDetails.password);

      if (!isMatch) {
        return res
          .status(STATUS_CODE_400)
          .json({ errors: [{ msg: INVALID_CREDENTIALS }] });
      }
      //Create Payload
      const payload = {
        user: {
          id: userDetails._id,
        },
      };

      jwt.sign(payload, JWT_SECRET, { expiresIn: EXPIRES_IN }, (err, token) => {
        if (err) {
          throw err;
        }
        res.json({ token });
      });
      // let ipAddress = "";
      // for (const name of Object.keys(nets)) {
      //   for (const net of nets[name]) {
      //     if (net.family === "IPv4" && !net.internal) {
      //       ipAddress = net.address;
      //     }
      //   }
      // }
      // var today = new Date();
      // var dd = today.getDate();
      // var mm = today.getMonth() + 1;
      // var yyyy = today.getFullYear();
      // if (dd < 10) {
      //   dd = "0" + dd;
      // }
      // if (mm < 10) {
      //   mm = "0" + mm;
      // }
      // var todayDateymd = yyyy + "-" + mm + "-" + dd;
      // const loginData = {
      //   userId: userDetails._id,
      //   userName: userDetails.userFullName,
      //   loginDate: todayDateymd,
      //   ipAddress: ipAddress,
      // };
      // let LoginHistorySave = new LoginHistory(loginData);
      // await LoginHistorySave.save();
    } catch (err) {
      console.error(err.message);
      res.status(STATUS_CODE_500).json({ errors: [{ msg: "Server Error" }] });
    }
  }
);

// @route    GET api/auth
// @desc     Get Authenticated User
// @access   Private
router.get("/load-user", auth, async (req, res) => {
  try {
    const user = await EmployeeDetails.findById(req.user.id).select(
      "-password"
    );
    res.json(user);
  } catch (err) {
    res.status(STATUS_CODE_500).send(SERVER_ERROR);
  }
});

// @route    GET api/auth
// @desc     Get All Users
// @access   Private
router.get(GET_ALL_USERS, auth, async (req, res) => {
  try {
    const user = await UserDetails.find().select("-password"); //.select('-password');
    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(STATUS_CODE_500).send(SERVER_ERROR);
  }
});

// @route    POST api/users
// @desc     Change Password
// @access   Private
router.post(
  CHANGE_PWD,
  auth,
  [check("password", "Invalid Request").not().isEmpty()],
  async (req, res) => {
    //validating the Request
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(STATUS_CODE_400).json({ errors: errors.array() });
    }
    //assigning the data from body
    let data = req.body;
    try {
      //Preparing The Salt
      const salt = await bcrypt.genSalt(10);
      //Hashing the Password
      const password = await bcrypt.hash(data.password, salt);

      await UserDetails.findOneAndUpdate(
        { _id: req.user.id },
        { password: password }
      );
      res.json({ msg: "Password changed succesfully" });
    } catch (err) {
      console.error(err.message);
      res.status(STATUS_CODE_500).send(SERVER_ERROR);
    }
  }
);
module.exports = router;
