const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");
const { check, validationResult } = require("express-validator");
const mongoose = require("mongoose");
const EmployeeDetails = require("../../models/EmpDetails");
const EmployeeDetailsHistory = require("../../models/EmpDetailsHistory");
const UserGroup = require("../../models/UserGroups");

const {
  USER_EXISTS,
  STATUS_CODE_200,
  STATUS_CODE_400,
} = require("../../common/constant/constants");

//ADD
router.post("/add-user-group", async (req, res) => {
  let data = req.body;
  try {
    let userGroupDetails = new UserGroup(data);
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
    let allEmployeedata = data.allEmployeedata;
    const historyData = {
      edhId: allEmployeedata._id,
      edhFullName: allEmployeedata.empFullName,
      edhEmpCode: allEmployeedata.empCode,
      edhDepartmentId: allEmployeedata.departmentId,
      edhDesignationId: allEmployeedata.designationId,
      edhDesignationDate: allEmployeedata.empDesignationDate,
      edhJoiningDate: allEmployeedata.empJoiningDate,
      edhDOB: allEmployeedata.empDOB,
      edhAadharNo: allEmployeedata.empAadharNo,
      edhPanNo: allEmployeedata.empPanNo,
      edhPhone: allEmployeedata.empPhone,
      edhEmail: allEmployeedata.empEmail,
      edhAddress: allEmployeedata.empAddress,
      edhState: allEmployeedata.empState,
      edhPincode: allEmployeedata.empPincode,
      edhGroupId: allEmployeedata.usergroupsId,
      edhBankName: allEmployeedata.empBankName,
      edhAccountNo: allEmployeedata.empAccountNo,
      edhBankBranch: allEmployeedata.edhBankBranch,
      edhIFSCCode: allEmployeedata.edhIFSCCode,
      edhPFNo: allEmployeedata.empPFNo,
      edhPFDate: allEmployeedata.empPFDate,
      edhUANNo: allEmployeedata.empUANNo,
      edhESICNo: allEmployeedata.empESICNo,
      edhBasic: allEmployeedata.empBasic,
      edhHRA: allEmployeedata.empHRA,
      edhCA: allEmployeedata.empCA,
      edhDA: allEmployeedata.empDA,
      edhproinc: allEmployeedata.proinc,
      edhCityallowance: allEmployeedata.cityallowance,
      edhOthers: allEmployeedata.Others,
    };
    let employeeDetailsHistory = new EmployeeDetailsHistory(historyData);
    await employeeDetailsHistory.save();
    const updateEmployeeDetails = await EmployeeDetails.updateOne(
      { _id: data.recordId },
      {
        $set: {
          empFullName: data.empFullName,
          empPhone: data.empPhone,
          empAadharNo: data.empAadharNo,
          empPanNo: data.empPanNo,
          empDOB: data.empDOB,
          empEmail: data.empEmail,
          empJoiningDate: data.empJoiningDate,
          departmentId: data.departmentId,
          departmentName: data.departmentName,
          empGroupId: data.empGroupId,
          empDesignationId: data.empDesignationId,
          designationName: data.designationName,
          usergroupsId: data.usergroupsId,
          userGroupName: data.userGroupName,
          empDesignationDate: data.empDesignationDate,
          empCode: data.empCode,
          empAddress: data.empAddress,
          empState: data.empState,
          empPincode: data.empPincode,
          empBankName: data.empBankName,
          empIFSCCode: data.empIFSCCode,
          empAccountNo: data.empAccountNo,
          empBankBranch: data.empBankBranch,
          empPFNo: data.empPFNo,
          cityallowance: data.cityallowance,
          empPFDate: data.empPFDate,
          empESICNo: data.empESICNo,
          empUANNo: data.empUANNo,
          empBasic: data.empBasic,
          empHRA: data.empHRA,
          empDA: data.empDA,
          empCA: data.empCA,
          Others: data.Others,
          proinc: data.proinc,
          profilephoto: data.profilephoto,
          empEditedById: data.empEditedById,
          empEditedDateTime: Date.now(),
        },
      }
    );
    res.json(updateEmployeeDetails);
    // console.log(updateEmployeeDetails);
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
router.post("/get-all-user-groups", async (req, res) => {
  try {
    const allUserGroup = await UserGroup.find({
      userGroupName: { $ne: "Super Admin" },
    });
    res.json(allUserGroup);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Internal Server Error.");
  }
});

router.post("/get-last-entered-emp-code", async (req, res) => {
  try {
    const getActiveEmployeeEmpCode = await EmployeeDetails.find({
      empStatus: {
        $eq: "Active",
      },
    })
      .limit(1)
      .sort({ _id: -1 });
    res.json(getActiveEmployeeEmpCode);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Internal Server Error.");
  }
});
router.get("/get-all-staff-name", async (req, res) => {
  try {
    const allProjectStatus = await EmployeeDetails.find({});
    res.json(allProjectStatus);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Internal Server Error.");
  }
});

router.post("/get-filter-emp-details", async (req, res) => {
  const { empNameSearch } = req.body;
  let query = {};
  if (empNameSearch) {
    query = {
      _id: {
        $eq: empNameSearch,
      },
    };
  }
  try {
    const allUserDetails = await EmployeeDetails.find(query);
    res.json(allUserDetails);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Internal Server Error.");
  }
});
module.exports = router;
