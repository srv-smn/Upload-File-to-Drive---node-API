const express = require("express");
const router = new express.Router();

const OutBound = require("../models/outBound");
const InBound = require('../models/inBound')
const multer = require("multer");

const excelToJson = require("convert-excel-to-json");

const {toDBOutObject,toDBInObject} = require("../utils/support");

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
      source: buffer,
    });


    try {
      for(i=1;i<result["CUS OUTBOUND RAW DATA"].length;i++){
        const outBound = await new OutBound(
          toDBOutObject(result["CUS OUTBOUND RAW DATA"][i])
        );
        await outBound.save();
      }
      for(i=1;i<result["CUS INBOUND RAW DATA"].length;i++){
        const inBound = await new InBound(
          toDBInObject(result["CUS INBOUND RAW DATA"][i])
        );
        await inBound.save();
      }
      
      res.status(200).send({
        name: "Upload router is Working",
      });
    } catch (e) {
      console.log('in catch');
      console.log(e);
      res.status(400).send(e);
    }
  },
  (error, req, res, next) => {
    console.log('in global catch');
    console.log(error.message);
    res.status(400).send({ error: error.message });
  }
);

module.exports = router;
