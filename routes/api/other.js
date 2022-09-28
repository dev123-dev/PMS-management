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
  console.log(data);
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
      company_name: data.company_name,
      client_name: data.client_name,
      date_time: data.startquotationDate,
      company_short_name: "Pinnacle",
      company_address: data.company_address,
      client_address: data.client_address,
      company_by: "Mr. Joel Sequeira",
      comp_by_desg: "General Manager",
      client_by: "President Sampada",
      client_by_desg: "President",
      date: "29-09-2022",
    });

    const buf = doc.getZip().generate({
      type: "nodebuffer",
      // compression: DEFLATE adds a compression step.
      // For a 50MB output document, expect 500ms additional CPU time
      compression: "DEFLATE",
    });

    // buf is a nodejs Buffer, you can either write it to a
    // file or res.send it with express for example.
    fs.writeFileSync(
      path.resolve(
        "./client/src/static/agreement",
        data.company_name + "_agreement.docx"
      ),
      buf
    );
    res.sendStatus(200);
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
