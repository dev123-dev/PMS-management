const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");
const { check, validationResult } = require("express-validator");
const mongoose = require("mongoose");
const Department = require("../../models/Department");
const Team = require("../../models/settings/teams");
const Designation = require("../../models/Designation");
const Menu = require("../../models/Menus");
const PaymentMode = require("../../models/PaymentMode");
const Project = require("../../models/Project");
const Rights = require("../../models/Rights");
const Feedback = require("../../models/feedback");
const Company = require("../../models/settings/company");

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

router.post("/add-feedback", async (req, res) => {
  let data = req.body;
  try {
    let FeedbackDetails = new Feedback(data);
    output = await FeedbackDetails.save();
    res.send(output);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Internal Server Error.");
  }
});

router.post("/add-company", async (req, res) => {
  let data = req.body;
  try {
    let CompanyDetails = new Company(data);
    output = await CompanyDetails.save();
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
//////////////////////////////////////////////////////////////////////////123
// delete screenshot in edit feedback
router.post("/delete-screenshot", async (req, res) => {
  let data = req.body;
  console.log("data fedd", data);
  try {
    const updateOL = await Feedback.updateOne(
      { _id: mongoose.Types.ObjectId(data.feedbackId) },
      { $pull: { screenshot: { _id: data.screenshotId } } }
    );
    res.json(updateOL);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Internal Server Error.");
  }
});


router.post("/get-existing-screenshot",  async (req, res) => {
  const { imageId } = req.body;
 
  try {
    const getExistingscreenshot= await Feedback.findOne(
      {
        
        _id: mongoose.Types.ObjectId(imageId),
    
      },
      { screenshot: 1 }
    );
    res.json(getExistingscreenshot);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Internal Server Error.");
  }
});

router.post("/edit-feedback", async (req, res) => {
  try {
    let data = req.body;
 
    let updateFeedback = {};
   
    if (data.screenshot.length > 0) {
  
      updateFeedback = await Feedback.updateOne(
        { _id: data.recordId },
        {
          $set: {
            feedbackProblem: data.feedbackProblem,
            feedbackCategory: data.feedbackCategory,
            feedbackPriority: data.feedbackPriority,
            feedbackBelongsTo: data.feedbackBelongsTo,
            feedbackNotes: data.feedbackNotes,
            feedbackStatus: data.feedbackStatus,
            feedbackEditedById: data.feedbackEditedById,
            feedbackEditedDateTime: Date.now(),
          },
          $push: {
            screenshot: data.screenshot,
          },
        }
      );
    } else {
    
      updateFeedback = await Feedback.updateOne(
        { _id: data.recordId },
        {
          $set: {
            feedbackProblem: data.feedbackProblem,
            feedbackCategory: data.feedbackCategory,
            feedbackPriority: data.feedbackPriority,
            feedbackBelongsTo: data.feedbackBelongsTo,
            feedbackNotes: data.feedbackNotes,
            feedbackStatus: data.feedbackStatus,
            feedbackEditedById: data.feedbackEditedById,
            feedbackEditedDateTime: Date.now(),
          },
        }
      ).then((data) => {
        console.log("updateFeedback", data);
      });
    }

    res.json(updateFeedback);
  } catch (error) {
    res.status(500).json({ errors: [{ msg: "Server Error" }] });
  }
});





///////////////////////////////////////////// old edit-feedback before screenshot

// router.post("/edit-feedback", async (req, res) => {
//   try {
//     let data = req.body;
//     const updateFeedback = await Feedback.updateOne(
//       { _id: data.recordId },
//       {
//         $set: {
//           feedbackProblem: data.feedbackProblem,
//           feedbackCategory: data.feedbackCategory,
//           feedbackPriority: data.feedbackPriority,
//           feedbackBelongsTo: data.feedbackBelongsTo,
//           feedbackNotes: data.feedbackNotes,
//           feedbackStatus: data.feedbackStatus,
//           feedbackEditedById: data.feedbackEditedById,
//           feedbackEditedDateTime: Date.now(),
//         },
//       }
//     );
//     res.json(updateFeedback);
//   } catch (error) {
//     res.status(500).json({ errors: [{ msg: "Server Error" }] });
//   }
// });

router.post("/edit-feedback-status", async (req, res) => {
  try {
    let data = req.body;

    const updateFeedback = await Feedback.updateOne(
      { _id: data.recordId },
      {
        $set: {
          feedbackStatus: data.feedbackStatus,
          feedbackEditedById: data.feedbackEditedById,
          feedbackStatusNotes: data.feedbackStatusNotes,
          feedbackEditedDateTime: Date.now(),
        },
      }
    );
    res.json(updateFeedback);
  } catch (error) {
    res.status(500).json({ errors: [{ msg: "Server Error" }] });
  }
});

router.post("/edit-company-details", async (req, res) => {
  try {
    let data = req.body;
    const updateCompanyData = await Company.updateOne(
      { _id: data.recordId },
      {
        $set: {
          companyName: data.companyName,
          companyLogo: data.companyLogo,
          companyWebsite: data.companyWebsite,
          companyRegisterNo: data.companyRegisterNo,
          abbreviation: data.abbreviation,
          quotationNoCounter: data.quotationNoCounter,
          invoiceNoCounter: data.invoiceNoCounter,
          companyTradeLicenseNo: data.companyTradeLicenseNo,
          companyPhone1: data.companyPhone1,
          companyPhone2: data.companyPhone2,
          companyDescription: data.companyDescription,
          companyShortForm: data.companyShortForm,
          companyAddress: data.companyAddress,
          companyGSTIn: data.companyGSTIn,
          companyPanNo: data.companyPanNo,
          companyType: data.companyType,
          companyEditedById: data.companyEditedById,
          companyEditedDateTime: new Date().toLocaleString("en-GB"),
        },
      }
    );
    res.json(updateCompanyData);
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
    const allDepartment = await Department.find({
      departmentName: { $ne: "Super Admin" },
    });
    res.json(allDepartment);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Internal Server Error.");
  }
});

//ALL Designation
router.get("/get-all-designation", async (req, res) => {
  try {
    const allDesignation = await Designation.find({
      designationName: { $ne: "Super Admin" },
    });
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
      designationName: { $ne: "Super Admin" },
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

router.post("/get-all-feedback", async (req, res) => {
  let { feedbackStatus, feedbackBelongsTo } = req.body;

  let query = {};
  if (feedbackBelongsTo) {
    if (feedbackStatus) {
      query = {
        feedbackStatus: feedbackStatus,
        feedbackBelongsTo: feedbackBelongsTo,
      };
    } else {
      query = {
        feedbackStatus: "Pending",
        feedbackBelongsTo: feedbackBelongsTo,
      };
    }
  } else {
    if (feedbackStatus) {
      query = {
        feedbackStatus: feedbackStatus,
      };
    } else {
      query = {
        feedbackStatus: "Pending",
      };
    }
  }

  try {
    const allFeedback = await Feedback.find(query);
    res.json(allFeedback);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Internal Server Error.");
  }
});

router.get("/get-deleted-projects", async (req, res) => {
  try {
    const deleteProjects = await Project.find({
      projectStatus: {
        $eq: "Trash",
      },
    });
    res.json(deleteProjects);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Internal Server Error.");
  }
});

router.post("/delete-project-data", async (req, res) => {
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

router.post("/restore-project-data", async (req, res) => {
  try {
    let data = req.body;

    const deactiveProject = await Project.updateOne(
      { _id: data.recordId },
      {
        $set: {
          projectStatus: "Active",
          projectEditedById: data.projectEditedById,
          projectEditedDateTime: data.projectEditedDateTime,
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

//ALL Company Details
router.get("/get-all-company-details", async (req, res) => {
  try {
    const allCompanyDetails = await Company.find({
      companyStatus: {
        $eq: "Active",
      },
    });
    res.json(allCompanyDetails);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Internal Server Error.");
  }
});

router.post("/deactive-company-data", async (req, res) => {
  try {
    let data = req.body;
    const deactiveCompanyData = await Company.updateOne(
      { _id: data.recordId },
      {
        $set: {
          companyStatus: "Deactive",
          companyDeactivateReason: data.companyDeactivateReason,
          companyDeactivateById: data.companyDeactivateById,
          companyDeactivateDateTime: data.companyDeactivateDateTime,
        },
      }
    );

    res.json(deactiveCompanyData);
  } catch (error) {
    res.status(500).json({ errors: [{ msg: "Server Error" }] });
  }
});

router.post("/add-new-bank", async (req, res) => {
  try {
    let data = req.body;
    const addNewBank = await Company.updateOne(
      { _id: data.recordId },
      {
        $push: {
          bank: {
            _id: new mongoose.Types.ObjectId(),
            accountNo: data.accountNo,
            IFSCCode: data.IFSCCode,
            bankName: data.bankName,
            bankBranch: data.bankBranch,
            defaultBank: data.defaultBank,
          },
        },
      }
    );
    res.json(addNewBank);
  } catch (error) {
    res.status(500).json({ errors: [{ msg: "Server Error" }] });
  }
});

router.post("/edit-bank", async (req, res) => {
  try {
    let data = req.body;
    const updateBank = await Company.updateOne(
      { "bank._id": data.recordId },
      {
        $set: {
          "bank.$.accountNo": data.accountNo,
          "bank.$.IFSCCode": data.IFSCCode,
          "bank.$.bankName": data.bankName,
          "bank.$.bankBranch": data.bankBranch,
          "bank.$.defaultBank": data.defaultBank,
        },
      }
    );
    res.json(updateBank);
  } catch (error) {
    res.status(500).json({ errors: [{ msg: "Server Error" }] });
  }
});

router.get("/get-all-teams-details", async (req, res) => {
  try {
    const allTeamDetails = await Team.find({
      teamStatus: {
        $eq: "Active",
      },
    });
    res.json(allTeamDetails);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Internal Server Error.");
  }
});

router.post("/add-team", async (req, res) => {
  let data = req.body;
  try {
    let TeamDetails = new Team(data);
    output = await TeamDetails.save();
    res.send(output);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Internal Server Error.");
  }
});

router.post("/edit-team", async (req, res) => {
  try {
    let data = req.body;
    const updateTeam = await Team.updateOne(
      { _id: data.recordId },
      {
        $set: {
          teamName: data.teamName,
          teamDescription: data.teamDescription,
          teamEditedById: data.teamEditedById,
          teamEditedByName: data.teamEditedByName,
          teamEditedDateTime: data.teamEditedDateTime,
        },
      }
    );
    res.json(updateTeam);
  } catch (error) {
    res.status(500).json({ errors: [{ msg: "Server Error" }] });
  }
});

router.post("/deactive-team-data", async (req, res) => {
  try {
    let data = req.body;
    const deactiveTeamData = await Team.updateOne(
      { _id: data.recordId },
      {
        $set: {
          teamStatus: "Deactive",
          teamDeactiveReason: data.teamDeactiveReason,
          teamDeactiveById: data.teamDeactiveById,
          teamDeactiveDateTime: data.teamDeactiveDateTime,
        },
      }
    );

    res.json(deactiveTeamData);
  } catch (error) {
    res.status(500).json({ errors: [{ msg: "Server Error" }] });
  }
});

router.get("/get-all-teams", async (req, res) => {
  try {
    const allTeamName = await Team.find({
      teamStatus: {
        $eq: "Active",
      },
    });
    res.json(allTeamName);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Internal Server Error.");
  }
});
module.exports = router;
