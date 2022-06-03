const express = require("express");
const router = express.Router();
const config = require("config");
const { check, validationResult } = require("express-validator");
const mongoose = require("mongoose");
const ClientDetails = require("../../models/Client");
//ADD
router.post("/add-client", async (req, res) => {
  let data = req.body;
  try {
    let clientDetails = new ClientDetails(data);
    output = await clientDetails.save();
    res.send(output);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Internal Server Error.");
  }
});

router.post("/edit-client", async (req, res) => {
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
module.exports = router;
