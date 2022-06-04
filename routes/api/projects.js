const express = require("express");
const router = express.Router();
const config = require("config");
const { check, validationResult } = require("express-validator");
const mongoose = require("mongoose");
const ProjectDetails = require("../../models/Project");
const ProjectStatusDetails = require("../../models/ProjectStatus");

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

router.post("/add-menu", async (req, res) => {
  let data = req.body;
  try {
    let MenuDetails = new Menu(data);
    output = await MenuDetails.save();
    res.send(output);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Internal Server Error.");
  }
});

router.post("/add-designation", async (req, res) => {
  let data = req.body;
  try {
    let DesignationDetails = new Designation(data);
    output = await DesignationDetails.save();
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

          departmentEditedById: data.departmentEditedById,
          departmentEditedDateTime: Date.now(),
        },
      }
    );
    res.json(updateDepartment);
  } catch (error) {
    res.status(500).json({ errors: [{ msg: "Server Error" }] });
  }
});

router.post("/edit-menu", async (req, res) => {
  try {
    let data = req.body;
    const updateMenu = await Menu.updateOne(
      { _id: data.recordId },
      {
        $set: {
          menuName: data.menuName,
          menuDesc: data.departmentDesc,
          menuStatus: data.menuStatus,
          menuEditedById: data.menuEditedById,
          menuEditedDateTime: Date.now(),
        },
      }
    );
    res.json(updateMenu);
  } catch (error) {
    res.status(500).json({ errors: [{ msg: "Server Error" }] });
  }
});

router.post("/edit-designation", async (req, res) => {
  try {
    let data = req.body;
    const updateDesignation = await Designation.updateOne(
      { _id: data.recordId },
      {
        $set: {
          designationName: data.designationName,
          designationDesc: data.designationDesc,
          designationStatus: data.designationStatus,
          designationEditedById: data.designationEditedById,
          designationEditedDateTime: Date.now(),
        },
      }
    );
    res.json(updateDesignation);
  } catch (error) {
    res.status(500).json({ errors: [{ msg: "Server Error" }] });
  }
});
module.exports = router;
