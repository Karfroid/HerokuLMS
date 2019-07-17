const express = require("express");
const courses = express.Router();
const multer = require("multer");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
var auth = require("../libs/auth");
var methods = require("../libs/methods");

/* const Course = require("../models/CourseDetail"); */

const db = require("../database/db");

var storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "assets/uploads");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  }
});

const upload = multer({ storage });

courses.use(cors());

courses.use(function(req, res, next) {
  var token =
    req.body.token || req.query.token || req.headers["x-access-token"];
  next();
});

courses.post("/upload", upload.single("image"), (req, res) => {
  console.log(req.file);
  if (req.file)
    res.json({
      imageUrl: `assets/uploads/${req.file.filename}`
    });
  else res.status("409").json("No Files to Upload.");
});

courses.post("/save", methods.ensureToken, (req, res) => {
  //console.log(req);
  const today = new Date();

  const courseData = {
    CourseID: req.body.CourseID,
    CourseName: req.body.CourseName,
    CourseDescription: req.body.CourseDescription,
    CourseType: req.body.CourseType,
    Project: req.body.Project,
    Division: req.body.Division,
    Functions: req.body.Functions,
    CourseOwnerID: req.body.CourseOwnerID,
    CreatedDate: today,
    LastUpdatedate: today,
    IsActive: 1
  };

  //console.log(Course);

  db.coursedetails
    .create(courseData)
    .then(user => {
      //console.log(user);
      res.json("Course successfully saved");
    })
    .catch(err => {
      res.send("error: " + err);
    });
});

module.exports = courses;
