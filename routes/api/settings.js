const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");
const { check, validationResult } = require("express-validator");
const mongoose = require("mongoose");
const Department = require("../../models/Department");
const Designation = require("../../models/Designation");
const Menu = require("../../models/Menus");
const PaymentMode = require("../../models/PaymentMode");
const Rights = require("../../models/Rights");

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

router.post("/add-payment-mode", async (req, res) => {
  let data = req.body;
  try {
    let PaymentModeDetails = new PaymentMode(data);
    output = await PaymentModeDetails.save();
    res.send(output);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Internal Server Error.");
  }
});

router.post("add-rights", async (req, res) => {
  let data = req.body;
  try {
    let RightsData = new Rights(data);
    output = await RightsData.save();
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

router.post("/edit-payment-mode", async (req, res) => {
  try {
    let data = req.body;
    const updatePaymentMode = await PaymentMode.updateOne(
      { _id: data.recordId },
      {
        $set: {
          paymentModeName: data.paymentModeName,
          paymentModeEditedById: data.paymentModeEditedById,
          paymentModeEditedDateTime: Date.now(),
        },
      }
    );
    res.json(updatePaymentMode);
  } catch (error) {
    res.status(500).json({ errors: [{ msg: "Server Error" }] });
  }
});

//DEACTIVATE

router.post("/deactive-designation-data", async (req, res) => {
  try {
    let data = req.body;
    const deactiveDesignationData = await Designation.updateOne(
      { _id: data.recordId },
      {
        $set: {
          designationStatus: "Deactive",
          designationDeactiveReason: data.designationDeactiveReason,
          designationDeactiveById: data.designationDeactiveById,
          designationDeactiveDateTime: data.designationDeactiveDateTime,
        },
      }
    );

    res.json(deactiveDesignationData);
  } catch (error) {
    res.status(500).json({ errors: [{ msg: "Server Error" }] });
  }
});

//***************SELECT***************

//ALL Payment Mode
router.get("/get-all-payment-mode", async (req, res) => {
  try {
    const allPaymentMode = await PaymentMode.find({});
    res.json(allPaymentMode);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Internal Server Error.");
  }
});

//ALL Department
router.get("/get-all-department", async (req, res) => {
  try {
    const allDepartment = await Department.find({});
    res.json(allDepartment);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Internal Server Error.");
  }
});

//ALL Designation
router.get("/get-all-designation", async (req, res) => {
  try {
    const allDesignation = await Designation.find({});
    res.json(allDesignation);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Internal Server Error.");
  }
});

//Active Designation
router.get("/get-active-designation", async (req, res) => {
  try {
    const activeDesignation = await Designation.find({
      designationStatus: {
        $eq: "Active",
      },
    });
    res.json(activeDesignation);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Internal Server Error.");
  }
});

router.get("/get-all-menus", async (req, res) => {
  try {
    const allMenu = await Menu.find({});
    res.json(allMenu);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Internal Server Error.");
  }
});

router.get("/get-active-menus", async (req, res) => {
  try {
    const activeMenu = await Menu.find({
      menuStatus: {
        $eq: "Active",
      },
    });
    res.json(activeMenu);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Internal Server Error.");
  }
});

router.get("/get-all-rights", async (req, res) => {
  try {
    const allRights = await Rights.find({});
    res.json(allRights);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Internal Server Error.");
  }
});

module.exports = router;
