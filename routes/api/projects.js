const express = require("express");
const router = express.Router();
const config = require("config");
const { check, validationResult } = require("express-validator");
const mongoose = require("mongoose");
const Project = require("../../models/Project");
const ProjectStatus = require("../../models/ProjectStatus");
const ProjectTrack = require("../../models/ProjectTrack");
const ClientDetails = require("../../models/Client");
const DctClientDetails = require("../../models/dct/dctClients");
const AmendmentHistory = require("../../models/AmendmentHistory");
const dctClients = require("../../models/dct/dctClients");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
//ADD

const upload = multer({ dest: "D:/extraaaa/" });

// const upload = multer({ dest: 'uploads/' });

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
          timeOutMsgSent: 0,
          Reviewer: data.Reviewer,
          ReviewerId: data.ReviewerId,
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

router.post("/add-amendment-history", async (req, res) => {
  let data = req.body;
  try {
    let AmendmentHistoryDetails = new AmendmentHistory(data);
    output = await AmendmentHistoryDetails.save();
    res.send(output);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Internal Server Error.");
  }
});

//EDIT

////////////////////////////////123

router.post("/get-existing-project-screenshot", async (req, res) => {
  const { imageId } = req.body;

  try {
    const getExistingProjscreenshot = await Project.findOne(
      {
        _id: mongoose.Types.ObjectId(imageId),
      },
      { screenshot: 1 }
    );
    res.json(getExistingProjscreenshot);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Internal Server Error.");
  }
});

router.post("/delete-proj-screenshot", async (req, res) => {
  let data = req.body;
  console.log("data fedd", data);
  try {
    const updateOL = await Project.updateOne(
      { _id: mongoose.Types.ObjectId(data.feedbackId) },
      { $pull: { screenshot: { _id: data.screenshotId } } }
    );
    res.json(updateOL);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Internal Server Error.");
  }
});

router.post("/edit-project", async (req, res) => {
  try {
    let data = req.body;
    console.log("dataaaa", data);
    let updateProject = {};
    if (data.screenshot.length > 0) {
      updateProject = await Project.updateOne(
        { _id: data.recordId },
        {
          $set: {
            projectName: data.projectName,
            clientId: data.clientId,
            inputpath: data.inputpath,
            clientName: data.clientName,
            parentClientId: data.parentClientId,
            parentClientName: data.parentClientName,
            clientFolderName: data.clientFolderName,
            projectPriority: data.projectPriority,
            projectNotes: data.projectNotes,
            projectDeadline: data.projectDeadline,
            projectQuantity: data.projectQuantity,
            staffName: data.staffName,
            staffId: data.staffId,
            clientTypeVal: data.clientTypeVal,
            projectTime: data.projectTime,
            projectDate: data.projectDate,
            clientTime: data.clientTime,
            clientDate: data.clientDate,
            outputformat: data.outputformat,
            projectUnconfirmed: data.projectUnconfirmed,
            projectEditedById: data.projectEditedById,
            projectEditedDateTime: Date.now(),
          },
          $push: {
            screenshot: data.screenshot,
          },
        }
      );
    } else {
      updateProject = await Project.updateOne(
        { _id: data.recordId },
        {
          $set: {
            projectName: data.projectName,
            clientId: data.clientId,
            inputpath: data.inputpath,
            clientName: data.clientName,
            parentClientId: data.parentClientId,
            parentClientName: data.parentClientName,
            clientFolderName: data.clientFolderName,
            projectPriority: data.projectPriority,
            projectNotes: data.projectNotes,
            projectDeadline: data.projectDeadline,
            projectQuantity: data.projectQuantity,
            staffName: data.staffName,
            staffId: data.staffId,
            clientTypeVal: data.clientTypeVal,
            projectTime: data.projectTime,
            projectDate: data.projectDate,
            clientTime: data.clientTime,
            clientDate: data.clientDate,
            outputformat: data.outputformat,
            projectUnconfirmed: data.projectUnconfirmed,
            projectEditedById: data.projectEditedById,
            projectEditedDateTime: Date.now(),
          },
        }
      ).then((data) => {
        console.log("update ", data);
      });
    }

    res.json(updateProject);
  } catch (error) {
    res.status(500).json({ errors: [{ msg: "Server Error" }] });
  }
});

// router.post("/edit-project", async (req, res) => {
//   try {
//     let data = req.body;

//     updateProject = await Project.updateOne(
//       { _id: data.recordId },
//       {
//         $set: {
//           projectName: data.projectName,
//           clientId: data.clientId,
//           inputpath: data.inputpath,
//           clientName: data.clientName,
//           parentClientId: data.parentClientId,
//           parentClientName: data.parentClientName,
//           clientFolderName: data.clientFolderName,
//           projectPriority: data.projectPriority,
//           projectNotes: data.projectNotes,
//           projectDeadline: data.projectDeadline,
//           projectQuantity: data.projectQuantity,
//           staffName: data.staffName,
//           staffId: data.staffId,
//           clientTypeVal: data.clientTypeVal,
//           projectTime: data.projectTime,
//           projectDate: data.projectDate,
//           clientTime: data.clientTime,
//           clientDate: data.clientDate,
//           outputformat: data.outputformat,
//           projectUnconfirmed: data.projectUnconfirmed,
//           projectEditedById: data.projectEditedById,
//           projectEditedDateTime: Date.now(),
//         },
//       }
//     );
//     res.json(updateProject);
//   } catch (error) {
//     res.status(500).json({ errors: [{ msg: "Server Error" }] });
//   }
// });

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

    const verifyProjectData = await Project.updateOne(
      { _id: data.recordId },
      {
        $set: {
          projectVerificationStatus: "Verified",
          projectVerifiedById: data.projectVerifiedById,
          projectVerifiedDateTime: Date.now(),
          billingData: data.billingData,
        },
      }
    );
    res.json(verifyProjectData);
  } catch (error) {
    res.status(500).json({ errors: [{ msg: "Server Error" }] });
  }
});

router.post("/update-msg-sent", async (req, res) => {
  try {
    let data = req.body;
    const updateMsgSent = await Project.updateOne(
      { _id: data.recordId },
      {
        $set: {
          timeOutMsgSent: data.timeOutMsgSent,
        },
      }
    );
    res.json(updateMsgSent);
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
          projectStatus: "Trash",
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

router.get("/get-all-folder", async (req, res) => {
  try {
    const allClientFolderDetails = await Project.aggregate([
      {
        $match: {
          projectDate: {
            $ne: null,
            $ne: "",
          },
        },
      },

      {
        $addFields: {
          projectDate: {
            $toDate: "$projectDate",
          },
        },
      },
      {
        $group: {
          _id: "$clientFolderName",
          totQty: {
            $sum: 1,
          },
        },
      },
      {
        $sort: {
          _id: 1,
        },
      },
    ]);
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
      { $sort: { "output.statusOrder": 1 } },
    ]);
    res.json(getJobQueueDetails);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Internal Server Error.");
  }
});

router.post("/get-daily-jobsheet-project-details", async (req, res) => {
  const { selDate, fromdate, todate, dateType, clientId, folderId } = req.body;
  let query = {};
  if (dateType === "Multi Date") {
    if (folderId) {
      query = {
        projectStatus: "Active",
        projectDate: {
          $gte: fromdate,
          $lte: todate,
        },
        clientFolderName: folderId,
      };
    } else {
      query = {
        projectStatus: "Active",
        projectDate: {
          $gte: fromdate,
          $lte: todate,
        },
      };
    }
  } else if (dateType === "Single Date") {
    if (selDate) selDateVal = selDate;
    else selDateVal = new Date().toISOString().split("T")[0];

    if (folderId) {
      query = {
        projectStatus: "Active",
        projectDate: selDateVal,
        clientFolderName: folderId,
      };
    } else {
      query = {
        projectStatus: "Active",
        projectDate: selDateVal,
      };
    }
  } else {
    if (folderId) {
      query = {
        projectStatus: "Active",
        projectDate: new Date().toISOString().split("T")[0],
        clientFolderName: folderId,
      };
    } else {
      query = {
        projectStatus: "Active",
        projectDate: new Date().toISOString().split("T")[0],
      };
    }
  }
  query = {
    ...query,
    projectBelongsToId: null,
  };
  // get-dailyjobsheet-client
  try {
    // const getDailyJobSheetDetails = await Project.find(query);
    const getDailyJobSheetDetails = await Project.aggregate([
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
      { $sort: { projectDate: 1 } },
    ]);
    res.json(getDailyJobSheetDetails);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Internal Server Error.");
  }
});

router.post("/get-daily-jobsheet-excel-details", async (req, res) => {
  const { selDate, fromdate, todate, dateType, clientId, folderId } = req.body;
  // console.log("selDate", selDate);
  let query = {};
  if (dateType === "Multi Date") {
    if (folderId) {
      query = {
        projectStatus: "Active",
        projectDate: {
          $gte: fromdate,
          $lte: todate,
        },
        clientFolderName: folderId,
      };
    } else {
      query = {
        projectStatus: "Active",
        projectDate: {
          $gte: fromdate,
          $lte: todate,
        },
      };
    }
  } else if (dateType === "Single Date") {
    if (selDate) selDateVal = selDate;
    else selDateVal = new Date().toISOString().split("T")[0];

    if (folderId) {
      query = {
        projectStatus: "Active",
        projectDate: selDateVal,
        clientFolderName: folderId,
      };
    } else {
      query = {
        projectStatus: "Active",
        projectDate: selDateVal,
      };
    }
  } else {
    if (folderId) {
      query = {
        projectStatus: "Active",
        projectDate: new Date().toISOString().split("T")[0],
        clientFolderName: folderId,
      };
    } else {
      query = {
        projectStatus: "Active",
        projectDate: new Date().toISOString().split("T")[0],
      };
    }
  }
  query = {
    ...query,
    // projectBelongsToId: null,
  };
  // get-dailyjobsheet-client
  try {
    // const getDailyJobSheetDetails = await Project.find(query);
    // console.log(query);
    const getDailyJobSheetExcelExport = await Project.aggregate([
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
      // { $sort: { projectDate: 1 } },
    ]);
    res.json(getDailyJobSheetExcelExport);
    // console.log(getDailyJobSheetExcelExport);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Internal Server Error.");
  }
});

// get-daily-jobsheet-project-details

router.get("/get-project-status-verification", async (req, res) => {
  const { clientId } = req.body;
  let query = {};
  if (clientId) {
    query = {
      $and: [
        { projectVerificationStatus: { $ne: "Verified" } },
        { projectStatus: { $eq: "Active" } },
        { clientId: { $eq: clientId } },
        { "output1.projectStatusCategory": { $ne: "Amend" } },
        { "output1.projectStatusCategory": { $ne: "Dont Work" } },
      ],
    };
  } else {
    query = {
      $and: [
        { projectVerificationStatus: { $ne: "Verified" } },
        { projectStatus: { $eq: "Active" } },
        { "output1.projectStatusCategory": { $ne: "Amend" } },
        { "output1.projectStatusCategory": { $ne: "Dont Work" } },
      ],
    };
  }
  try {
    const allProjectStatusVerf = await Project.aggregate([
      {
        $lookup: {
          from: "projectstatuses",
          localField: "projectStatusId",
          foreignField: "_id",
          as: "output1",
        },
      },
      { $unwind: "$output1" },
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
  const { clientId, statusId, dateVal, folder } = req.body;
  let query = {};
  if (dateVal) {
    if (folder) {
      if (statusId) {
        query = {
          $and: [
            { projectVerificationStatus: { $ne: "Verified" } },
            { projectStatus: { $eq: "Active" } },
            { clientFolderName: { $eq: folder } },
            { projectStatusId: { $eq: statusId } },
            { projectDate: { $eq: dateVal } },
            { "output1.projectStatusCategory": { $ne: "Amend" } },
            { "output1.projectStatusCategory": { $ne: "Dont Work" } },
          ],
        };
      } else {
        query = {
          $and: [
            { projectVerificationStatus: { $ne: "Verified" } },
            { projectStatus: { $eq: "Active" } },
            { clientFolderName: { $eq: folder } },
            { projectDate: { $eq: dateVal } },
            { "output1.projectStatusCategory": { $ne: "Amend" } },
            { "output1.projectStatusCategory": { $ne: "Dont Work" } },
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
            { "output1.projectStatusCategory": { $ne: "Amend" } },
            { "output1.projectStatusCategory": { $ne: "Dont Work" } },
          ],
        };
      } else {
        query = {
          $and: [
            { projectVerificationStatus: { $ne: "Verified" } },
            { projectStatus: { $eq: "Active" } },
            { projectDate: { $eq: dateVal } },
            { "output1.projectStatusCategory": { $ne: "Amend" } },
            { "output1.projectStatusCategory": { $ne: "Dont Work" } },
          ],
        };
      }
    }
  } else {
    if (folder) {
      if (statusId) {
        query = {
          $and: [
            { projectVerificationStatus: { $ne: "Verified" } },
            { projectStatus: { $eq: "Active" } },
            { clientFolderName: { $eq: folder } },
            { projectStatusId: { $eq: statusId } },
            { "output1.projectStatusCategory": { $ne: "Amend" } },
            { "output1.projectStatusCategory": { $ne: "Dont Work" } },
          ],
        };
      } else {
        query = {
          $and: [
            { projectVerificationStatus: { $ne: "Verified" } },
            { projectStatus: { $eq: "Active" } },
            { clientFolderName: { $eq: folder } },
            { "output1.projectStatusCategory": { $ne: "Amend" } },
            { "output1.projectStatusCategory": { $ne: "Dont Work" } },
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
            { "output1.projectStatusCategory": { $ne: "Amend" } },
            { "output1.projectStatusCategory": { $ne: "Dont Work" } },
          ],
        };
      } else {
        query = {
          $and: [
            { projectVerificationStatus: { $ne: "Verified" } },
            { projectStatus: { $eq: "Active" } },
            { "output1.projectStatusCategory": { $ne: "Amend" } },
            { "output1.projectStatusCategory": { $ne: "Dont Work" } },
          ],
        };
      }
    }
  }

  try {
    // const getVerificationProjectDetails = await Project.find(query);
    const getVerificationProjectDetails = await Project.aggregate([
      {
        $lookup: {
          from: "dctclients",
          localField: "clientId",
          foreignField: "_id",
          as: "output",
        },
      },
      { $unwind: "$output" },
      {
        $lookup: {
          from: "projectstatuses",
          localField: "projectStatusId",
          foreignField: "_id",
          as: "output1",
        },
      },
      { $unwind: "$output1" },
      { $match: query },
      // { $sort: { "output._id": 1 } },
    ]);
    res.json(getVerificationProjectDetails);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Internal Server Error.");
  }
});

router.post("/get-verified-project-details", async (req, res) => {
  const { clientId, statusId, dateVal, folder } = req.body;
  let query = {};
  if (dateVal) {
    if (folder) {
      if (statusId) {
        query = {
          $and: [
            { projectVerificationStatus: { $eq: "Verified" } },
            { projectStatus: { $eq: "Active" } },
            { clientFolderName: { $eq: folder } },
            { projectStatusId: { $eq: statusId } },
            { projectDate: { $eq: dateVal } },
          ],
        };
      } else {
        query = {
          $and: [
            { projectVerificationStatus: { $eq: "Verified" } },
            { projectStatus: { $eq: "Active" } },
            { clientFolderName: { $eq: folder } },
            { projectDate: { $eq: dateVal } },
          ],
        };
      }
    } else {
      if (statusId) {
        query = {
          $and: [
            { projectVerificationStatus: { $eq: "Verified" } },
            { projectStatus: { $eq: "Active" } },
            { projectStatusId: { $eq: statusId } },
            { projectDate: { $eq: dateVal } },
          ],
        };
      } else {
        query = {
          $and: [
            { projectVerificationStatus: { $eq: "Verified" } },
            { projectStatus: { $eq: "Active" } },
            { projectDate: { $eq: dateVal } },
          ],
        };
      }
    }
  } else {
    if (folder) {
      if (statusId) {
        query = {
          $and: [
            { projectVerificationStatus: { $eq: "Verified" } },
            { projectStatus: { $eq: "Active" } },
            { clientFolderName: { $eq: folder } },
            { projectStatusId: { $eq: statusId } },
          ],
        };
      } else {
        query = {
          $and: [
            { projectVerificationStatus: { $eq: "Verified" } },
            { projectStatus: { $eq: "Active" } },
            { clientFolderName: { $eq: folder } },
          ],
        };
      }
    } else {
      if (statusId) {
        query = {
          $and: [
            { projectVerificationStatus: { $eq: "Verified" } },
            { projectStatus: { $eq: "Active" } },
            { projectStatusId: { $eq: statusId } },
          ],
        };
      } else {
        query = {
          $and: [
            { projectVerificationStatus: { $eq: "Verified" } },
            { projectStatus: { $eq: "Active" } },
          ],
        };
      }
    }
  }
  if (clientId) {
    query = {
      ...query,
      clientId: clientId,
    };
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
    // const ProjectLatestChangeDetails = await ProjectTrack.aggregate([
    //   {
    //     $lookup: {
    //       from: "projects",
    //       localField: "projectId",
    //       foreignField: "_id",
    //       as: "output",
    //     },
    //   },
    //   // { $unwind: "$output" },
    //   {
    //     $match: {
    //       $or: [
    //         {
    //           "output._id": {
    //             $eq: mongoose.Types.ObjectId(projectId),
    //           },
    //         },
    //         {
    //           "output.projectBelongsToId": {
    //             $eq: mongoose.Types.ObjectId(projectId),
    //           },
    //         },
    //       ],
    //     },
    //   },
    // ]);

    const ProjectLatestChangeDetails = await Project.aggregate([
      {
        $match: {
          _id: mongoose.Types.ObjectId(projectId),
        },
      },
      {
        $lookup: {
          from: "projecttracks",
          localField: "_id",
          foreignField: "projectId",
          as: "StatusChanges",
        },
      },
      {
        $unwind: {
          path: "$StatusChanges",
        },
      },
      {
        $project: {
          projectStatusChangedbyName:
            "$StatusChanges.projectStatusChangedbyName",
          projectTrackDateTime: "$StatusChanges.projectTrackDateTime",
          projectStatusType: "$StatusChanges.projectStatusType",
          projectTrackLatestChange: "$StatusChanges.projectTrackLatestChange",
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
    const ProjectLatestChangeData = await Project.aggregate([
      {
        $match: {
          _id: mongoose.Types.ObjectId(projectId),
        },
      },
      {
        $lookup: {
          from: "projecttracks",
          localField: "_id",
          foreignField: "projectId",
          as: "StatusChanges",
        },
      },
      {
        $addFields: {
          lastELEM: {
            $last: "$StatusChanges",
          },
        },
      },
      {
        $unwind: {
          path: "$lastELEM",
        },
      },
      {
        $project: {
          projectStatusChangedbyName: "$lastELEM.projectStatusChangedbyName",
          projectTrackDateTime: "$lastELEM.projectTrackDateTime",
          projectStatusType: "$lastELEM.projectStatusType",
          projectTrackLatestChange: "$lastELEM.projectTrackLatestChange",
          projectName: 1,
          projectEnteredByName: 1,
          projectEnteredDateTime: 1,
        },
      },
    ]);

    res.json(ProjectLatestChangeData);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Internal Server Error.");
  }
});

router.post("/get-amendment-project-details", async (req, res) => {
  // let data = req.body;
  const { setTypeData } = req.body;
  let query = {};
  if (setTypeData) {
    query = {
      $or: [
        {
          projectStatusType: "Amendment",
        },
        {
          projectStatusType: "Additional_Instruction",
        },
      ],
      amendmentType: setTypeData,
    };
  } else {
    query = {
      $or: [
        {
          projectStatusType: "Amendment",
        },
        {
          projectStatusType: "Additional_Instruction",
        },
      ],
      amendmentType: "UnResolved",
    };
  }
  try {
    const getAmendmentDetails = await ProjectTrack.aggregate([
      {
        $lookup: {
          from: "projects",
          localField: "projectId",
          foreignField: "_id",
          as: "output",
        },
      },
      { $match: query },
    ]);
    res.json(getAmendmentDetails);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Internal Server Error.");
  }
});

router.post("/get-all-amendment-histories", async (req, res) => {
  const { projectId, amendmentCounter } = req.body;
  try {
    const getAmendmentLasthistoryDetails = await AmendmentHistory.aggregate([
      {
        $match: {
          projectId: {
            $eq: mongoose.Types.ObjectId(projectId),
          },
          amendmentCounter: {
            $eq: amendmentCounter,
          },
        },
      },
    ]);
    res.json(getAmendmentLasthistoryDetails);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Internal Server Error.");
  }
});

router.post("/get-last-amendment-histories", async (req, res) => {
  const { projectId, amendmentCounter } = req.body;
  // console.log(req.body);
  let query = {};
  query = {
    projectId: {
      $eq: mongoose.Types.ObjectId(projectId),
    },
    amendmentCounter: {
      $eq: amendmentCounter,
    },
  };
  try {
    const getAmendmentLasthistoryDetails = await AmendmentHistory.findOne(query)
      .sort({
        _id: -1,
      })
      .limit(1);
    res.json(getAmendmentLasthistoryDetails);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Internal Server Error.");
  }
});

// router.post("/get-selected-client-details", async (req, res) => {
//   const { clientId } = req.body;

//   try {
//     const getSelectedClientDetails = await Project.find({
//       clientId: mongoose.Types.ObjectId(clientId),
//     });
//     res.json(getSelectedClientDetails);
//   } catch (err) {
//     console.error(err.message);
//     res.status(500).send("Internal Server Error.");
//   }
// });
router.post("/get-selected-client-details", async (req, res) => {
  const { clientName } = req.body;

  try {
    const getSelectedClientDetails = await dctClients.find({
      clientName: clientName,
    });
    res.json(getSelectedClientDetails);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Internal Server Error.");
  }
});
router.post("/get-selected-project-details", async (req, res) => {
  const { projectName, clientId } = req.body;

  let query = {};
  query = {
    clientId: {
      $eq: mongoose.Types.ObjectId(clientId),
    },
    projectName: {
      $eq: projectName,
    },
  };

  try {
    // const getSelectedProjectDetails = await Project.find({
    //   projectName: projectName,
    // });
    const getSelectedProjectDetails = await Project.find(query);

    res.json(getSelectedProjectDetails);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Internal Server Error.");
  }
});

router.post("/get-last-amendment-counter", async (req, res) => {
  const { pId } = req.body;
  let query = {};
  query = {
    projectId: {
      $eq: mongoose.Types.ObjectId(pId),
    },
    amendmentType: {
      $eq: "Resolved",
    },
  };

  try {
    const getAmendmentLastCounter = await ProjectTrack.find(query);
    // .sort({
    //   _id: -1,
    // })
    // .limit(1);
    res.json(getAmendmentLastCounter);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Internal Server Error.");
  }
});

router.post("/update-amendment-type-status", async (req, res) => {
  try {
    let data = req.body;
    const updateProjectStatus = await ProjectTrack.updateOne(
      { projectId: data.projectId, amendmentType: "UnResolved" },
      {
        $set: {
          amendmentType: data.amendmentType,
        },
      }
    );
    res.json(updateProjectStatus);
  } catch (error) {
    res.status(500).json({ errors: [{ msg: "Server Error" }] });
  }
});

router.post("/get-clients-report", async (req, res) => {
  const { selectedY, clientId, clientType } = req.body;
  let query = {};
  if (selectedY) {
    query = { projectDate: { $regex: new RegExp("^" + selectedY, "i") } };
  } else {
    query = {
      projectDate: { $regex: new RegExp("^" + new Date().getFullYear(), "i") },
    };
  }
  if (clientId) {
    query = { ...query, clientId: mongoose.Types.ObjectId(clientId) };
  }

  if (clientType) {
    query = { ...query, "output.clientType": clientType };
  }
  try {
    const getClientReport = await Project.aggregate([
      {
        $lookup: {
          from: "clients",
          localField: "clientId",
          foreignField: "_id",
          as: "output",
        },
      },
      { $unwind: "$output" },
      { $match: query },
      {
        $group: {
          _id: {
            clientId: "$clientId",
            month: {
              $month: {
                $dateFromString: { dateString: "$projectDate" },
              },
            },
          },
          clientName: { $first: "$clientName" },
          count: { $sum: "$projectQuantity" },
        },
      },
      {
        $project: {
          _id: 1,
          count: 1,
          clientId: "$_id.clientId",
          month_year: { $concat: ["m", { $toString: "$_id.month" }] },
          clientName: 1,
        },
      },
      {
        $group: {
          _id: "$clientId",
          clientName: { $first: "$clientName" },
          data: { $push: { k: "$month_year", v: "$count" } },
        },
      },
      {
        $project: {
          clientId: "$_id",
          data: { $arrayToObject: "$data" },
          clientName: 1,
          _id: 0,
        },
      },
      { $sort: { clientId: 1 } },
    ]);
    res.json(getClientReport);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Internal Server Error.");
  }
});

router.post("/get-summary", async (req, res) => {
  const { projectId } = req.body;
  try {
    if (projectId) {
      const getProjectSummary = await Project.find({
        $or: [{ projectBelongsToId: projectId }, { _id: projectId }],
      });
      res.json(getProjectSummary);
    }
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Internal Server Error.");
  }
});

router.post("/get-file", upload.single("file"), (req, res) => {
  console.log(req.file);
  // Access the uploaded file details using req.file
  // Perform necessary operations with the file (e.g., save it to a specific location, process it, etc.)
  // Send a response to the client
  const uploadedFile = req.file;
  const destinationFolder = "D:/extraaaa/";

  // Get the original file extension
  const fileExtension = path.extname(uploadedFile.originalname);

  // Construct the new file path with the original extension
  const newFilePath = path.join(
    destinationFolder,
    uploadedFile.originalname + fileExtension
  );

  // Move the file to the destination folder
  fs.rename(uploadedFile.path, newFilePath, (err) => {
    if (err) {
      console.error("Error moving file:", err);
      res.status(500).send("Error moving file");
    } else {
      console.log("File uploaded and saved successfully");
      res.sendStatus(200);
    }
  });
});

router.get("/files", (req, res) => {
  const folderPath = path.join("D:/extraaaa/");
  console.log("folderPath", folderPath);

  fs.readdir(folderPath, (err, files) => {
    if (err) {
      console.error("Error reading folder:", err);
      return res.status(500).send("Error reading folder");
    }
    console.log("files", files);
    res.json(files);
  });
});

// router.post("/get-file",  async (req, res) => {
//   let data  = req.body;
//   try {
//     console.log("req",data)
// // console.log("reqq.file",req.body)
// // Access the uploaded file details using req.file
// // const uploadedFile = req.file;
// // console.log("uploadedFile",uploadedFile)

// // //Define the destination folder
// // const destinationFolder = 'D://extraaaa//';

// // // Construct the new file path
// // // const newFilePath = require("path").join(destinationFolder, uploadedFile.originalname);
// // const newFilePath = path.join(destinationFolder, uploadedFile.originalname);
// // console.log("newFilePath",newFilePath)

// // // Move the file to the destination folder
// // fs.rename(uploadedFile.path, newFilePath, (err) => {
// //   if (err) {
// //     console.error('Error moving file:', err);
// //     res.status(500).send('Error moving file');
// //   } else {
// //     console.log('File uploaded and saved successfully');
// //     res.sendStatus(200);
// //   }
// // });
// // Specify the destination directory path on the desktop
// // const desktopPath = path.join(require('os').homedir(), 'Desktop', 'YourDirectoryName');

// // // Create the directory if it doesn't exist
// // if (!fs.existsSync(desktopPath)) {
// //   fs.mkdirSync(desktopPath, { recursive: true });
// // }

// // // Specify the source file path
// // const sourceFilePath = 'path/to/source/'+name;

// // // Specify the destination file path
// // const destinationFilePath = path.join(desktopPath, 'file.txt');

// // // Copy the file to the destination
// // fs.copyFile(sourceFilePath, destinationFilePath, (err) => {
// //   if (err) {
// //     console.error('Error copying file:', err);
// //   } else {
// //     console.log('File saved successfully!');
// //   }

// // })

//   } catch (err) {
//     console.error(err.message);
//     res.status(500).send("Internal Server Error.");
//   }
// });

module.exports = router;
