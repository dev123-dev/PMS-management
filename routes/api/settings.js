const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");
const { check, validationResult } = require("express-validator");
const mongoose = require("mongoose");
const Department = require("../../models/Department");

//ADD
router.post("/add-department", async (req, res) => {
  let data = req.body;
  try {
    let DepartmentDetails = new Department(data);
    output = await DepartmentDetails.save();
    res.send(output);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Internal Server Error.");
  }
});

//EDIT
router.post("/edit-department", async (req, res) => {
  try {
    let data = req.body;
    const updateDepartment = await Department.updateOne(
      { _id: data.recordId },
      {
        $set: {
          departmentName: data.departmentName,
          departmentDesc: data.departmentDesc,
          departmentEnteredById: data.departmentEnteredById,
          departmentDateTime: Date.now(),
        },
      }
    );
    res.json(updateDepartment);
  } catch (error) {
    res.status(500).json({ errors: [{ msg: "Server Error" }] });
  }
});

module.exports = router;
