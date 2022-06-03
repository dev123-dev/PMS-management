const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");
const { check, validationResult } = require("express-validator");
const mongoose = require("mongoose");
const EmployeeDetails = require("../../models/EmpDetails");
const UserGroups = require("../../models/UserGroups");

const {
  USER_EXISTS,
  STATUS_CODE_200,
  STATUS_CODE_400,
} = require("../../common/constant/constants");

//ADD
router.post("/add-user-groups", async (req, res) => {
  let data = req.body;
  try {
    let userGroupDetails = new UserGroups(data);
    output = await userGroupDetails.save();
    res.send(output);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Internal Server Error.");
  }
});
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

//EDIT
router.post(
  "/edit-user-groups",
  [check("userGroupId", "Invalid Request").not().isEmpty()],
  async (req, res) => {
    try {
      let data = req.body;
      const updateUserGroup = await UserGroup.updateOne(
        { _id: data.recordId },
        {
          $set: {
            userGroupName: data.userGroupName,
            userGroupEnteredById: data.userGroupEnteredById,
            userGroupDateTime: Date.now(),
          },
        }
      );
      res.json(updateUserGroup);
    } catch (error) {
      res.status(500).json({ errors: [{ msg: "Server Error" }] });
    }
  }
);
module.exports = router;
