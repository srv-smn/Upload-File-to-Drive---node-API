const express = require("express");
const router = new express.Router();

const OutBound = require("../models/outBound");
const multer = require("multer");

const reader = require("xlsx");
const excelToJson = require("convert-excel-to-json");

const toDBObject = require("../utils/support");

const validation = multer({
  fileFilter(req, file, cb) {
    if (!file.originalname.match(/\.(xls|xlsx)$/)) {
      return cb(new Error("File must a excel sheet"));
    }
    cb(undefined, true);
  },
});

router.post(
  "/upload",
  validation.single("upload"),
  async (req, res) => {
    const buffer = await req.file.buffer;

    const result = excelToJson({
      source: buffer, // fs.readFileSync return a Buffer
    });


    try {
      for(i=1;i<result["CUS OUTBOUND RAW DATA"].length;i++){
        const outBound = await new OutBound(
          toDBObject(result["CUS OUTBOUND RAW DATA"][i])
        );
        console.log("before",i);
        await outBound.save();
        console.log("after",i);
      }
      
      res.status(200).send({
        name: "Upload router is Working",
      });
    } catch (e) {
      res.status(400).send(e);
    }
  },
  (error, req, res, next) => {
    res.status(400).send({ error: error.message });
  }
);

module.exports = router;
