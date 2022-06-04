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
router.post("/add-employee", async (req, res) => {
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

router.post("/edit-employee", async (req, res) => {
  try {
    let data = req.body;

    const updateEmployeeDetails = await EmployeeDetails.updateOne(
      { _id: data.recordId },
      {
        $set: {
          empFullName: data.empFullName,
          empDepartmentId: data.empDepartmentId,
          empDesignationId: data.empDesignationId,
          empDesignationDate: data.empDesignationDate,
          empJoiningDate: data.empJoiningDate,
          empDOB: data.empDOB,
          empAadharNo: data.empAadharNo,
          empPanNo: data.empPanNo,
          empPhone: data.empPhone,
          empEmail: data.empEmail,
          empAddress: data.empAddress,
          empState: data.empState,
          empPincode: data.empPincode,
          empGroupId: data.empGroupId,
          empStatus: data.empStatus,
          empColorCode: data.empColorCode,
          empEnteredById: data.empEnteredById,
          empDate: data.empDate,
          empDateTime: Date.now(),
          empBankName: data.empBankName,
          empAccountNo: data.empAccountNo,
          empBankBranch: data.empBankBranch,
          empIFSCCode: data.empIFSCCode,
          empPFNo: data.empPFNo,
          empPFDate: data.empPFDate,
          empUANNo: data.empUANNo,
          empESICNo: data.empESICNo,
          empBasic: data.empBasic,
          empHRA: data.empHRA,
          empCA: data.empCA,
        },
      }
    );
    res.json(updateEmployeeDetails);
  } catch (error) {
    res.status(500).json({ errors: [{ msg: "Server Error" }] });
  }
});

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
            userGroupEditedById: data.userGroupEditedById,
            userGroupEditedDateTime: Date.now(),
          },
        }
      );
      res.json(updateUserGroup);
    } catch (error) {
      res.status(500).json({ errors: [{ msg: "Server Error" }] });
    }
  }
);

//DEACTIVATE
router.post("/deactive-employee", async (req, res) => {
  try {
    let data = req.body;

    const deactiveUser = await EmployeeDetails.updateOne(
      { _id: data.recordId },
      {
        $set: {
          empStatus: data.empStatus,
          empDeactiveReason: data.empDeactiveReason,
          empDeactiveById: data.empDeactiveById,
          empDeactiveDateTime: Date.now(),
        },
      }
    );
    res.json(deactiveUser);
  } catch (error) {
    res.status(500).json({ errors: [{ msg: "Server Error" }] });
  }
});

//SELECT
//Get all users
router.post("/get-all-employee", async (req, res) => {
  try {
    const getEmployeeDetails = await EmployeeDetails.find();
    res.json(getEmployeeDetails);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Internal Server Error.");
  }
});

router.post("/get-active-employee", async (req, res) => {
  try {
    const getActiveEmployeeDetails = await EmployeeDetails.find({
      empStatus: {
        $eq: "Active",
      },
    });
    res.json(getActiveEmployeeDetails);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Internal Server Error.");
  }
});

//Get All User Groups
router.get("/get-all-user-groups", async (req, res) => {
  try {
    const allUserGroup = await UserGroups.find({});
    res.json(allUserGroup);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Internal Server Error.");
  }
});

module.exports = router;
