// This files contains the logic for routing and handling file upload , validation , and calling Google Api

const express = require("express");
const router = new express.Router();

const OutBound = require("../models/outBound"); // OutBound Schema
const InBound = require("../models/inBound"); //InBound Schema
const multer = require("multer");

const excelToJson = require("convert-excel-to-json"); // Library to handle excel
const fs = require("fs");

const { toDBOutObject, toDBInObject } = require("../utils/support"); // contains helper function that create an object to pass to schema
const gooogleFun = require("../google/googleAPI");

let path = "files/myexcel.xlsx";

// applying conditions to check if we are uploading excel or not
const validation = multer({ 
  fileFilter(req, file, cb) {
    if (!file.originalname.match(/\.(xls|xlsx)$/)) {
      return cb(new Error("File must a excel sheet"));
    }
    cb(undefined, true);
  },
});

// upload route handler
router.post(
  "/upload",
  validation.single("upload"),
  async (req, res) => {
    const buffer = await req.file.buffer;  // buffer of excel
    const result = excelToJson({
      source: buffer,
    }); // converting excel buffer to json object

    try {
      // looping through each and every record presend in the outbound spread sheet and storing it in DB
      for (i = 1; i < result["CUS OUTBOUND RAW DATA"].length; i++) {
        const outBound = await new OutBound(
          toDBOutObject(result["CUS OUTBOUND RAW DATA"][i])
        );
        await outBound.save();
      }
      // looping through each and every record presend in the Inbound spread sheet and storing it in DB
      for (i = 1; i < result["CUS INBOUND RAW DATA"].length; i++) {
        const inBound = await new InBound(
          toDBInObject(result["CUS INBOUND RAW DATA"][i])
        );
        await inBound.save();
      }
      //------------------ Till this Data have been stored to DB-------------------
      
    // --------------Making file ready to be stored in Drive ------------------------------------
      fs.open(path, "w", function (err, fd) {
        if (err) {
          throw "could not open file: " + err;
        }
        fs.write(fd, buffer, 0, buffer.length, null, function (err) {
          if (err) throw "error writing file: " + err;
          fs.close(fd, function () {
            
          });
        });
      });
// --------------- Now calling Google Api to store exel file to drive ---------------------------
// -----------------------------sending response in case of successfull execution ----------------------------
       gooogleFun(req.file.mimetype);
      res.status(200).send({
        name: "Upload router is Working",
      });
    } catch (e) {
      console.log("in catch");
      console.log(e);
      res.status(400).send(e);
    }
  },
  (error, req, res, next) => {
    console.log("in global catch");
    console.log(error.message);
    res.status(400).send({ error: error.message });
  }
);

module.exports = router;
