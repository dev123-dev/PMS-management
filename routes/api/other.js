const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Department = require("../../models/Department");
const PizZip = require("pizzip");
const Docxtemplater = require("docxtemplater");
const fs = require("fs");
const path = require("path");
const multer = require("multer");
const SctProjects = require("../../models/sct/SctProjects");
const SctClients = require("../../models/sct/sctClients");
var storage = multer.diskStorage({
  destination: "./client/src/static/agreement",
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});
const upload = multer({ storage: storage });

//ADD
router.post("/generate-agreement-doc", async (req, res) => {
  let data = req.body;
  try {
    // Load the docx file as binary content
    const content = fs.readFileSync(
      path.resolve("./client/src/static/agreement", data.agreementTemplate),
      "binary"
    );
    const zip = new PizZip(content);

    const doc = new Docxtemplater(zip, {
      paragraphLoop: true,
      linebreaks: true,
    });

    // Render the document (Replace {first_name} by John, {last_name} by Doe, ...)
    doc.render({
      companyName: data.companyName,
      clientName: data.clientName,
      agreementDateInWords: data.agreementDateInWords,
      companyAddress: data.companyAddress,
      clientAddress: data.clientAddress,
      fromName: data.fromName,
      fromDesg: data.fromDesg,
      toName: data.toName,
      toDesg: data.toDesg,
      agreementDate: data.agreementDate,
    });

    const buf = doc.getZip().generate({
      type: "nodebuffer",
      // compression: DEFLATE adds a compression step.
      // For a 50MB output document, expect 500ms additional CPU time
      compression: "DEFLATE",
    });

    // buf is a nodejs Buffer, you can either write it to a
    // file or res.send it with express for example.
    let docName = data.clientName + " Agreement.docx";

    fs.writeFileSync(
      path.resolve("./client/src/static/agreement", docName),
      buf
    );

    const updateAgreementGeneration = await SctClients.updateOne(
      { _id: data.clientId },
      {
        $set: {
          generatedAgreementFile: docName,
        },
      }
    );

    res.json({ generatedAgreementFile: docName });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Internal Server Error.");
  }
});

router.post(
  "/upload-agreement-template",
  upload.single("myFile"),
  async (req, res, next) => {
    // console.log(req.file.originalname + " file successfully uploaded !!");
    const data = req.body;
    const uploadPo = await SctProjects.updateOne(
      { _id: data.projectId },
      {
        $set: {
          agreementTemplate: req.file,
        },
      }
    );
    res.sendStatus(200);
  }
);

module.exports = router;
