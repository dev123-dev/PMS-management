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
const EmpLeaves = require("../../models/Leaves");
const EmpLeavesCategory = require("../../models/LeaveCategory");
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
      edhCtAccess: allEmployeedata.empCtAccess,
      edhBankName: allEmployeedata.empBankName,
      edhAccountNo: allEmployeedata.empAccountNo,
      edhBankBranch: allEmployeedata.empBankBranch,
      edhIFSCCode: allEmployeedata.empIFSCCode,
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
          designationId: data.designationId,
          designationName: data.designationName,
          usergroupsId: data.usergroupsId,
          userGroupName: data.userGroupName,
          empDesignationDate: data.empDesignationDate,
          empCode: data.empCode,
          empAddress: data.empAddress,
          empState: data.empState,
          empPincode: data.empPincode,
          empCtAccess: data.empCtAccess,
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

router.post("/get-marketing-employees", async (req, res) => {
  try {
    const getMarketingEmployeeDetails = await EmployeeDetails.find({
      empStatus: "Active",
      userGroupName: "Marketing",
    });
    res.json(getMarketingEmployeeDetails);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Internal Server Error.");
  }
});

router.post("/get-sct-marketing-employees", async (req, res) => {
  try {
    const getMarketingEmployeeDetails = await EmployeeDetails.find({
      empStatus: "Active",
      departmentName: "Software",
      $or: [{ userGroupName: "Sct Marketing" }, { userGroupName: "Marketing" }],
    });
    res.json(getMarketingEmployeeDetails);
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
    const allProjectStatus = await EmployeeDetails.find({
      departmentName: {
        $ne: "Super Administrator",
      },
    });
    res.json(allProjectStatus);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Internal Server Error.");
  }
});

router.post("/get-dct-staff-name", async (req, res) => {
  try {
    const allDctStaffData = await EmployeeDetails.find({
      empStatus: "Active",
      $or: [{ userGroupName: "Dct Marketing" }, { userGroupName: "Marketing" }],
    });
    res.json(allDctStaffData);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Internal Server Error.");
  }
});

router.post("/get-leaves-staff", async (req, res) => {
  const { selDate, fromdate, todate, dateType } = req.body;
  let query = {};
  if (dateType === "Multi Date") {
    query = {
      leaveDate: {
        $gte: fromdate,
        $lte: todate,
      },
    };
  } else if (dateType === "Single Date") {
    if (selDate) selDateVal = selDate;
    else selDateVal = new Date().toISOString().split("T")[0];

    query = {
      leaveDate: {
        $eq: selDateVal,
      },
    };
  } else {
    query = {
      leaveDate: {
        $eq: new Date().toISOString().split("T")[0],
      },
    };
  }
  try {
    const getDJSClientDetails = await EmpLeaves.aggregate([
      {
        $lookup: {
          from: "empdetails",
          localField: "empId",
          foreignField: "_id",
          as: "output",
        },
      },
      { $unwind: "$output" },
      { $match: query },
      {
        $group: {
          _id: "$empId",
          empFullName: { $first: "$output.empFullName" },
        },
      },
      { $sort: { leaveDate: 1 } },
    ]);
    res.json(getDJSClientDetails);
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

//For Leaves

//ADD Leave
router.post("/add-leaves", async (req, res) => {
  let data = req.body;
  let i = 0;
  try {
    for (i = 0; i < data.leaveDateVals.length; i++) {
      data = {
        ...req.body,
        leaveDate: data.leaveDateVals[i],
      };
      let EmpLeavesDetails = new EmpLeaves(data);
      output = await EmpLeavesDetails.save();
    }
    res.send(output);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Internal Server Error.");
  }
});

router.post("/add-leaves-category", async (req, res) => {
  let data = req.body;
  try {
    let LeaveCategoryDetails = new EmpLeavesCategory(data);
    output = await LeaveCategoryDetails.save();
    res.send(output);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Internal Server Error.");
  }
});

router.get("/get-leave-cat-mode", async (req, res) => {
  try {
    const allLeaveTypeMode = await EmpLeavesCategory.find({});
    res.json(allLeaveTypeMode);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Internal Server Error.");
  }
});

router.post(
  "/edit-leave",

  async (req, res) => {
    try {
      let data = req.body;

      const updateLeave = await EmpLeaves.updateOne(
        { _id: data.recordId },
        {
          $set: {
            leaveType: data.leaveType,
            leaveReason: data.leaveReason,
            leavecategoryName: data.leavecategoryName,
            leavecategoryId: data.leavecategoryId,
            leaveEditedById: data.leaveEditedById,
            leaveEditedDateTime: data.leaveEditedDateTime,
            leaveDate: data.leaveDate,
          },
        }
      );
      res.json(updateLeave);
    } catch (error) {
      res.status(500).json({ errors: [{ msg: "Server Error" }] });
    }
  }
);

//Get All Leaves
router.post("/get-all-Leaves", async (req, res) => {
  const { selDate, fromdate, todate, dateType, empId } = req.body;
  let query = {};
  if (dateType === "Multi Date") {
    if (empId) {
      query = {
        leaveDate: {
          $gte: fromdate,
          $lte: todate,
        },
        empId: {
          $eq: mongoose.Types.ObjectId(empId),
        },
        leaveStatus: {
          $eq: "Active",
        },
      };
    } else {
      query = {
        leaveDate: {
          $gte: fromdate,
          $lte: todate,
        },
        leaveStatus: {
          $eq: "Active",
        },
      };
    }
  } else if (dateType === "Single Date") {
    if (selDate) selDateVal = selDate;
    else selDateVal = new Date().toISOString().split("T")[0];

    if (empId) {
      query = {
        leaveDate: {
          $eq: selDateVal,
        },
        empId: {
          $eq: mongoose.Types.ObjectId(empId),
        },
        leaveStatus: {
          $eq: "Active",
        },
      };
    } else {
      query = {
        leaveDate: {
          $eq: selDateVal,
        },
        leaveStatus: {
          $eq: "Active",
        },
      };
    }
  } else {
    if (empId) {
      query = {
        leaveDate: {
          $eq: new Date().toISOString().split("T")[0],
        },
        empId: {
          $eq: mongoose.Types.ObjectId(empId),
        },
        leaveStatus: {
          $eq: "Active",
        },
      };
    } else {
      query = {
        leaveDate: {
          $eq: new Date().toISOString().split("T")[0],
        },
        leaveStatus: {
          $eq: "Active",
        },
      };
    }
  }
  try {
    const allEmpLeves = await EmpLeaves.aggregate([
      {
        $lookup: {
          from: "empdetails",
          localField: "empId",
          foreignField: "_id",
          as: "output",
        },
      },
      { $unwind: "$output" },
      { $match: query },
      { $sort: { leaveDate: 1 } },
    ]);
    res.json(allEmpLeves);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Internal Server Error.");
  }
});

router.post("/deactive-leave", async (req, res) => {
  try {
    let data = req.body;
    const deactiveLeaveDetails = await EmpLeaves.updateOne(
      { _id: data.recordId },
      {
        $set: {
          leaveStatus: "Deactive",
          leaveDeactiveById: data.leaveDeactiveById,
          leaveDeactiveDate: data.leaveDeactiveDate,
          leaveDeactiveReason: data.leaveDeactiveReason,
        },
      }
    );
    res.json(deactiveLeaveDetails);
  } catch (error) {
    res.status(500).json({ errors: [{ msg: "Server Error" }] });
  }
});

module.exports = router;
