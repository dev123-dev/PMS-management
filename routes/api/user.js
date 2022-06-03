const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");
const { check, validationResult } = require("express-validator");
const mongoose = require("mongoose");
const EmployeeDetails = require("../../models/EmpDetails");

const {
  USER_EXISTS,
  STATUS_CODE_200,
  STATUS_CODE_400,
} = require("../../common/constant/constants");

router.post("/add-user", async (req, res) => {
  let data = req.body;
  try {
    let userExists = await EmployeeDetails.findOne({ userName: data.userName });
    if (userExists) {
      return res
        .status(STATUS_CODE_400)
        .json({ errors: [{ msg: USER_EXISTS }] });
    }
    let empDetails = new EmployeeDetails(data);
    const salt = await bcrypt.genSalt(10);
    empDetails.password = await bcrypt.hash(data.password, salt);
    output = await empDetails.save();

    return res.status(STATUS_CODE_200).json({
      msg: "User Added Successfull",
    });
    res.send(output);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Internal Server Error.");
  }
});

module.exports = router;
