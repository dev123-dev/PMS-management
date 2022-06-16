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
    // console.log(data);
    // let allEmployeedata = data.allEmployeedata;
    // const historyData = {
    //   edhId: allEmployeedata._id,
    //   edhFullName: allEmployeedata.batchId,
    //   bthBatchName: allEmployeedata.batchName,
    //   bthSavingAmt: allEmployeedata.batchSavingAmt,
    //   bthLoanPaid: allEmployeedata.batchLoanPaid,
    //   bthInterestPaid: allEmployeedata.batchInterestPaid,
    //   bthSubAmt: allEmployeedata.batchSubAmt,
    //   bthBankInterest: allEmployeedata.bankInterest,
    //   bthStationaryExpenses: allEmployeedata.stationaryExpenses,
    //   bthCashInHand: allEmployeedata.cashInHand,
    //   bthPaidToMahasangha: allEmployeedata.paidToMahasangha,
    //   bthTravellingExpenses: allEmployeedata.travellingExpenses,
    //   bthBankCommission: allEmployeedata.bankCommission,
    //   bthOtherExpenses: allEmployeedata.otherExpenses,
    //   bthServiceCharges: allEmployeedata.serviceCharges,
    //   bthOtherContribution: allEmployeedata.batchOtherContribution,
    //   bthLoanAmt: allEmployeedata.batchLoanAmt,
    //   bthLoanStatus: allEmployeedata.batchLoanStatus,
    //   batchMeetingHeldOnDate: allEmployeedata.batchMeetingHeldOnDate,
    //   bthBankDeposit: allEmployeedata.batchBankDeposit,
    //   bthNeftBalance: allEmployeedata.neftBalance,
    //   bthSavingWithdrawals: allEmployeedata.batchSavingWithdrawals,
    //   bthDividendDistributed: allEmployeedata.batchDividendDistributed,
    //   bthOtherLoan: allEmployeedata.batchOtherLoanAmt,
    //   bthOtherLoanPaid: allEmployeedata.batchOtherLoanPaid,
    //   bthOtherLoanInterest: allEmployeedata.batchOtherLoanInterest,
    //   btEnteredById: allEmployeedata.btEnteredById,
    //   btEnteredByName: allEmployeedata.btEnteredByName,
    //   btEnteredDateTime: allEmployeedata.btEnteredDateTime,
    //   institutionId: allEmployeedata.institutionId,
    // };
    // let employeeDetailsHistory = new EmployeeDetailsHistory(historyData);
    // await employeeDetailsHistory.save();
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

module.exports = router;
