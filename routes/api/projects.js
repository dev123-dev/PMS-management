const express = require("express");
const router = express.Router();
const config = require("config");
const { check, validationResult } = require("express-validator");
const mongoose = require("mongoose");
const Project = require("../../models/Project");
const ProjectStatus = require("../../models/ProjectStatus");
const ProjectTrack = require("../../models/ProjectTrack");
const ClientDetails = require("../../models/Client");

//ADD
router.post("/add-project", async (req, res) => {
  let data = req.body;
  try {
    let ProjectDetails = new Project(data);
    output = await ProjectDetails.save();
    const trackData = {
      projectId: output._id,
      projectTrackLatestChange: data.projectNotes,
      projectStatusType: data.projectStatusType,
      projectTrackStatusId: data.projectStatusId,
      projectStatusChangedbyName: data.projectEnteredByName,
      projectStatusChangedById: data.projectEnteredById,
    };
    let ProjectTrackDetails = new ProjectTrack(trackData);
    output = await ProjectTrackDetails.save();

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
    const updateProject = await Project.updateOne(
      { _id: data.projectId },
      {
        $set: {
          projectStatusId: data.projectTrackStatusId,
          projectStatusType: data.projectStatusType,
          ptEstimatedTime: data.ptEstimatedTime,
          ptEstimatedDateTime: data.ptEstimatedDateTime,
        },
      }
    );
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
          clientName: data.clientName,
          parentClientId: data.parentClientId,
          parentClientName: data.parentClientName,
          clientFolderName: data.clientFolderName,
          projectPriority: data.projectPriority,
          projectNotes: data.projectNotes,
          projectDeadline: data.projectDeadline,
          projectQuantity: data.projectQuantity,
          clientTypeVal: data.clientTypeVal,
          projectTime: data.projectTime,
          projectDate: data.projectDate,
          clientTime: data.clientTime,
          clientDate: data.clientDate,
          projectUnconfirmed: data.projectUnconfirmed,
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

router.post("/verify-project", async (req, res) => {
  try {
    let data = req.body;

    await Project.updateOne(
      { _id: data.recordId },
      {
        $set: {
          projectVerificationStatus: "Verified",
          projectVerifiedById: data.projectVerifiedById,
          projectVerifiedDateTime: Date.now(),
        },
      }
    );
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

router.post("/deactive-project-status", async (req, res) => {
  try {
    let data = req.body;
    const deactiveProjectStatus = await ProjectStatus.updateOne(
      { _id: data.recordId },
      {
        $set: {
          projectStatusStatus: "Deactive",
          projectStatusDeactiveReason: data.projectStatusDeactiveReason,
          projectStatusDeactiveById: data.projectStatusDeactiveById,
          projectStatusDeactiveDateTime: Date.now(),
        },
      }
    );
    res.json(deactiveProjectStatus);
  } catch (error) {
    res.status(500).json({ errors: [{ msg: "Server Error" }] });
  }
});

router.post("/deactive-project-data", async (req, res) => {
  try {
    let data = req.body;

    const deactiveProject = await Project.updateOne(
      { _id: data.recordId },
      {
        $set: {
          projectStatus: "Delete",
          projectDeleteById: data.projectDeleteById,
          projectDeleteDateTime: data.projectDeleteDateTime,
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

router.get("/get-all-folder-name", async (req, res) => {
  try {
    const allClientFolderDetails = await Project.aggregate([
      {
        $match: {
          $and: [
            { projectStatusType: { $ne: "Uploaded" } },
            { projectStatusType: { $ne: "Amend_Uploaded" } },
            { projectStatusType: { $ne: "AI_Uploaded" } },
            { projectStatus: { $eq: "Active" } },
          ],
        },
      },
      { $group: { _id: "$clientFolderName" } },
    ]).sort({ _id: 1 });
    res.json(allClientFolderDetails);
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

router.post("/get-job-queue-project-details", async (req, res) => {
  const { folderNameSearch, statusCategory, statusType } = req.body;

  let query = {};
  if (statusCategory) {
    if (folderNameSearch) {
      query = {
        $and: [
          { projectStatusType: { $ne: "Uploaded" } },
          { projectStatusType: { $ne: "Amend_Uploaded" } },
          { projectStatusType: { $ne: "AI_Uploaded" } },
          { projectStatus: { $eq: "Active" } },
          { clientFolderName: { $eq: folderNameSearch } },
          { "output.projectStatusCategory": { $eq: statusCategory } },
        ],
      };
    } else {
      query = {
        $and: [
          { projectStatusType: { $ne: "Uploaded" } },
          { projectStatusType: { $ne: "Amend_Uploaded" } },
          { projectStatusType: { $ne: "AI_Uploaded" } },
          { projectStatus: { $eq: "Active" } },
          { "output.projectStatusCategory": { $eq: statusCategory } },
        ],
      };
    }
  } else {
    if (folderNameSearch) {
      query = {
        $and: [
          { projectStatusType: { $ne: "Uploaded" } },
          { projectStatusType: { $ne: "Amend_Uploaded" } },
          { projectStatusType: { $ne: "AI_Uploaded" } },
          { projectStatus: { $eq: "Active" } },
          { clientFolderName: { $eq: folderNameSearch } },
        ],
      };
    } else {
      query = {
        $and: [
          { projectStatusType: { $ne: "Uploaded" } },
          { projectStatusType: { $ne: "Amend_Uploaded" } },
          { projectStatusType: { $ne: "AI_Uploaded" } },
          { projectStatus: { $eq: "Active" } },
        ],
      };
    }
  }
  if (statusType !== undefined) {
    query = {
      $and: [
        { projectStatus: { $eq: "Active" } },
        { projectStatusType: { $eq: statusType } },
      ],
    };
  }
  try {
    const getJobQueueDetails = await Project.aggregate([
      {
        $lookup: {
          from: "projectstatuses",
          localField: "projectStatusId",
          foreignField: "_id",
          as: "output",
        },
      },
      { $unwind: "$output" },
      { $match: query },
      { $sort: { "output._id": 1 } },
    ]);
    res.json(getJobQueueDetails);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Internal Server Error.");
  }
});

router.post("/get-daily-jobsheet-project-details", async (req, res) => {
  const { selDate, fromdate, todate, dateType, clientId } = req.body;
  let query = {};
  if (dateType === "Multi Date") {
    if (clientId) {
      query = {
        projectStatus: {
          $eq: "Active",
        },
        projectDate: {
          $gte: fromdate,
          $lte: todate,
        },
        clientId: {
          $eq: mongoose.Types.ObjectId(clientId),
        },
      };
    } else {
      query = {
        projectStatus: {
          $eq: "Active",
        },
        projectDate: {
          $gte: fromdate,
          $lte: todate,
        },
      };
    }
  } else if (dateType === "Single Date") {
    if (selDate) selDateVal = selDate;
    else selDateVal = new Date().toISOString().split("T")[0];

    if (clientId) {
      query = {
        projectStatus: {
          $eq: "Active",
        },
        projectDate: {
          $eq: selDateVal,
        },
        clientId: {
          $eq: mongoose.Types.ObjectId(clientId),
        },
      };
    } else {
      query = {
        projectStatus: {
          $eq: "Active",
        },
        projectDate: {
          $eq: selDateVal,
        },
      };
    }
  } else {
    if (clientId) {
      query = {
        projectStatus: {
          $eq: "Active",
        },
        projectDate: {
          $eq: new Date().toISOString().split("T")[0],
        },
        clientId: {
          $eq: mongoose.Types.ObjectId(clientId),
        },
      };
    } else {
      query = {
        projectStatus: {
          $eq: "Active",
        },
        projectDate: {
          $eq: new Date().toISOString().split("T")[0],
        },
      };
    }
  }
  // get-dailyjobsheet-client
  try {
    const getDailyJobSheetDetails = await Project.find(query);
    res.json(getDailyJobSheetDetails);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Internal Server Error.");
  }
});

router.get("/get-project-status-verification", async (req, res) => {
  const { clientId } = req.body;
  let query = {};
  if (clientId) {
    query = {
      $and: [
        { projectVerificationStatus: { $ne: "Verified" } },
        { projectStatus: { $eq: "Active" } },
        { clientId: { $eq: clientId } },
      ],
    };
  } else {
    query = {
      $and: [
        { projectVerificationStatus: { $ne: "Verified" } },
        { projectStatus: { $eq: "Active" } },
      ],
    };
  }
  try {
    const allProjectStatusVerf = await Project.aggregate([
      {
        $match: query,
      },
      {
        $group: {
          _id: "$projectStatusId",
          projectStatusType: { $first: "$projectStatusType" },
        },
      },
    ]);
    res.json(allProjectStatusVerf);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Internal Server Error.");
  }
});
router.post("/get-verification-project-details", async (req, res) => {
  const { clientId, statusId, dateVal } = req.body;
  let query = {};
  if (dateVal) {
    if (clientId) {
      if (statusId) {
        query = {
          $and: [
            { projectVerificationStatus: { $ne: "Verified" } },
            { projectStatus: { $eq: "Active" } },
            { clientId: { $eq: clientId } },
            { projectStatusId: { $eq: statusId } },
            { projectDate: { $eq: dateVal } },
          ],
        };
      } else {
        query = {
          $and: [
            { projectVerificationStatus: { $ne: "Verified" } },
            { projectStatus: { $eq: "Active" } },
            { clientId: { $eq: clientId } },
            { projectDate: { $eq: dateVal } },
          ],
        };
      }
    } else {
      if (statusId) {
        query = {
          $and: [
            { projectVerificationStatus: { $ne: "Verified" } },
            { projectStatus: { $eq: "Active" } },
            { projectStatusId: { $eq: statusId } },
            { projectDate: { $eq: dateVal } },
          ],
        };
      } else {
        query = {
          $and: [
            { projectVerificationStatus: { $ne: "Verified" } },
            { projectStatus: { $eq: "Active" } },
            { projectDate: { $eq: dateVal } },
          ],
        };
      }
    }
  } else {
    if (clientId) {
      if (statusId) {
        query = {
          $and: [
            { projectVerificationStatus: { $ne: "Verified" } },
            { projectStatus: { $eq: "Active" } },
            { clientId: { $eq: clientId } },
            { projectStatusId: { $eq: statusId } },
          ],
        };
      } else {
        query = {
          $and: [
            { projectVerificationStatus: { $ne: "Verified" } },
            { projectStatus: { $eq: "Active" } },
            { clientId: { $eq: clientId } },
          ],
        };
      }
    } else {
      if (statusId) {
        query = {
          $and: [
            { projectVerificationStatus: { $ne: "Verified" } },
            { projectStatus: { $eq: "Active" } },
            { projectStatusId: { $eq: statusId } },
          ],
        };
      } else {
        query = {
          $and: [
            { projectVerificationStatus: { $ne: "Verified" } },
            { projectStatus: { $eq: "Active" } },
          ],
        };
      }
    }
  }

  try {
    const getVerificationProjectDetails = await Project.find(query);
    res.json(getVerificationProjectDetails);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Internal Server Error.");
  }
});

router.post("/get-all-changes", async (req, res) => {
  const { projectId } = req.body;
  try {
    const ProjectLatestChangeDetails = await ProjectTrack.aggregate([
      {
        $lookup: {
          from: "projects",
          localField: "projectId",
          foreignField: "_id",
          as: "output",
        },
      },
      // { $unwind: "$output" },
      {
        $match: {
          "output._id": {
            $eq: mongoose.Types.ObjectId(projectId),
          },
        },
      },
    ]);
    res.json(ProjectLatestChangeDetails);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Internal Server Error.");
  }
});

router.post("/get-latest-change", async (req, res) => {
  const { projectId } = req.body;
  try {
    const ProjectLatestChangeData = await ProjectTrack.aggregate([
      {
        $lookup: {
          from: "projects",
          localField: "projectId",
          foreignField: "_id",
          as: "output",
        },
      },
      {
        $match: {
          "output._id": {
            $eq: mongoose.Types.ObjectId(projectId),
          },
        },
      },
      { $unwind: "$output" },
      { $sort: { _id: -1 } },
      { $limit: 1 },
    ]);
    res.json(ProjectLatestChangeData);
    // console.log(ProjectLatestChangeData);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Internal Server Error.");
  }
});

module.exports = router;
