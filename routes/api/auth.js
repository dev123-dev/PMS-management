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
const Company = require("../../models/settings/company");
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

router.post(
  LOGIN,
  [
    check(USERNAME, USERNAME_REQUIRED_INVALID).exists(),
    check(PASSWORD, PASSWORD_INVALID).exists(),
  ],

  async (req, res) => {
    //retriving Data
    const { userName, password } = req.body;

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

      await EmployeeDetails.updateOne(
        { _id: userDetails._id },
        { $set: { empLoginStatus: 1 } }
      );
      // let ipAddress = "";
      // for (const name of Object.keys(nets)) {
      //   for (const net of nets[name]) {
      //     if (net.family === "IPv4" && !net.internal) {
      //       ipAddress = net.address;
      //     }
      //   }
      // }
      var today = new Date();
      var dd = today.getDate();
      var mm = today.getMonth() + 1;
      var yyyy = today.getFullYear();
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
      if (mm == 4 && dd < 5) {
        await Company.updateMany(
          { counterCheck: 0 },
          {
            $set: {
              quotationNoCounter: 0,
              invoiceNoCounter: 0,
              counterCheck: 1,
            },
          }
        );
      } else if (mm == 4 && dd > 5 && dd < 10) {
        await Company.updateMany(
          { counterCheck: 1 },
          {
            $set: {
              counterCheck: 0,
            },
          }
        );
      }
    } catch (err) {
      console.error(err.message);
      res.status(STATUS_CODE_500).json({ errors: [{ msg: "Server Error" }] });
    }
  }
);

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

router.get(GET_ALL_USERS, auth, async (req, res) => {
  try {
    const user = await UserDetails.find().select("-password"); //.select('-password');
    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(STATUS_CODE_500).send(SERVER_ERROR);
  }
});

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

router.post(
  "/edit-pwd",
  auth,
  [check("password", "Invalid Request").not().isEmpty()],
  async (req, res) => {
    const { userId, password } = req.body;
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

      await EmployeeDetails.findOneAndUpdate(
        { _id: userId },
        { password: password }
      );
      res.json({ msg: "Password changed succesfully" });
    } catch (err) {
      console.error(err.message);
      res.status(STATUS_CODE_500).send(SERVER_ERROR);
    }
  }
);

router.post("/logout-done", auth, async (req, res) => {
  try {
    await EmployeeDetails.updateOne(
      { _id: req.user.id },
      { $set: { empLoginStatus: 0 } }
    );
    res.json("Success");
  } catch (error) {
    res.status(500).json({ errors: [{ msg: "Server Error" }] });
  }
});
module.exports = router;
