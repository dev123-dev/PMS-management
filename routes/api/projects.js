const express = require("express");
const router = express.Router();
const config = require("config");
const { check, validationResult } = require("express-validator");
const mongoose = require("mongoose");
const Project = require("../../models/Project");
const ProjectStatus = require("../../models/ProjectStatus");
const ProjectTrack = require("../../models/ProjectTrack");

//ADD
router.post("/add-project", async (req, res) => {
  let data = req.body;
  try {
    let ProjectDetails = new Project(data);
    output = await ProjectDetails.save();
    res.send(output);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Internal Server Error.");
  }
});

router.post("/add-project-status", async (req, res) => {
  let data = req.body;
  try {
    let ProjectStatusDetails = new ProjectStatus(data);
    output = await ProjectStatusDetails.save();
    res.send(output);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Internal Server Error.");
  }
});

router.post("/add-project-track", async (req, res) => {
  let data = req.body;
  try {
    let ProjectTrackDetails = new ProjectTrack(data);
    output = await ProjectTrackDetails.save();
    res.send(output);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Internal Server Error.");
  }
});

//EDIT
router.post("/edit-project", async (req, res) => {
  try {
    let data = req.body;
    const updateProject = await Project.updateOne(
      { _id: data.recordId },
      {
        $set: {
          projectName: data.projectName,
          clientId: data.clientId,
          parentClientId: data.parentClientId,
          projectLocation: data.projectLocation,
          projectPriority: data.projectPriority,
          projectJobtype: data.projectJobtype,
          projectHours: data.projectHours,
          projectNotes: data.projectNotes,
          projectDeadline: data.projectDeadline,
          projectPrice: data.projectPrice,
          projectQuantity: data.projectQuantity,
          projectUnconfirmed: data.projectUnconfirmed,
          projectVendor: data.projectVendor,
          projectDate: data.projectDate,
          projectMailSent: data.projectMailSent,
          projectEditedById: data.projectEditedById,
          projectEditedDateTime: Date.now(),
        },
      }
    );
    res.json(updateProject);
  } catch (error) {
    res.status(500).json({ errors: [{ msg: "Server Error" }] });
  }
});

router.post("/edit-project-status", async (req, res) => {
  try {
    let data = req.body;
    const updateProjectStatus = await ProjectStatus.updateOne(
      { _id: data.recordId },
      {
        $set: {
          projectStatusType: data.projectStatusType,
          projectStatusCategory: data.projectStatusCategory,
          projectStatusColor: data.projectStatusColor,
          projectStatusStatus: data.projectStatusStatus,
          projectStutusEditedById: data.projectStutusEditedById,
          projectStatusEditedDateTime: Date.now(),
        },
      }
    );
    res.json(updateProjectStatus);
  } catch (error) {
    res.status(500).json({ errors: [{ msg: "Server Error" }] });
  }
});

//DEACTIVATE
router.post("/deactive-project", async (req, res) => {
  try {
    let data = req.body;

    const deactiveProject = await Project.updateOne(
      { _id: data.recordId },
      {
        $set: {
          projectStatus: data.projectStatus,
          projectDeactiveReason: data.projectDeactiveReason,
          projectDeactiveById: data.projectDeactiveById,
          projectDeactiveDate: data.projectDeactiveDate,
          projectDeactiveDateTime: Date.now(),
        },
      }
    );
    res.json(deactiveProject);
  } catch (error) {
    res.status(500).json({ errors: [{ msg: "Server Error" }] });
  }
});

//***************SELECT***************
router.get("/get-all-project-status", async (req, res) => {
  try {
    const allProjectStatus = await ProjectStatus.find({});
    res.json(allProjectStatus);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Internal Server Error.");
  }
});
router.get("/get-active-project-status", async (req, res) => {
  try {
    const activeProjectStatus = await ProjectStatus.find({
      projectStatusStatus: {
        $eq: "Active",
      },
    });
    res.json(activeProjectStatus);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Internal Server Error.");
  }
});

module.exports = router;
