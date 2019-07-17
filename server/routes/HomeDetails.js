const express = require("express");
const home = express.Router();
const cors = require("cors");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
var auth = require("../libs/auth");
var methods = require("../libs/methods");

const db = require("../database/db");

home.use(cors());

home.get("/getall", methods.ensureToken, (req, res) => {
  const newly_added = db.coursedetails.findAll({
    limit: 5,
    attributes: ["CourseName"],
    order: [["CreatedDate", "DESC"]]
  });

  const current_status = db.coursecontents.findAll({
    include: [
      {
        model: db.courseprogress,
        attributes: ["CourseID", "CourseName"],
        required: true,
        where: {
          AssignedTo: req.query.id,
          CourseStatus: "InProgress"
        }
      }
    ],
    where: db.sequelize.and({
      CourseID: db.sequelize.literal(db.courseprogress.CourseID),
      AssignedUserID: req.query.id
    })
  });

  const popular = db.courseprogress.findAll({
    limit: 5,
    attributes: [
      "courseID",
      "CourseName",
      [db.sequelize.fn("COUNT", "courseID"), "CNT"]
    ],
    group: ["courseID", "CourseName"],
    order: [[db.sequelize.literal("CNT"), "DESC"]]
  });
  Promise.all([current_status, popular, newly_added])
    .then(responses => {
      res.send(responses);
    })
    .catch(err => {
      res.status(400).json({ error: err });
    });
  /* db.coursedetails
    .findAll({
      include: [
        {
          model: db.coursecontents,
          attributes: ["CourseTopics"],
          required: true
        },
        {
          model: db.courseprogress,
          attributes: ["CourseName"],
          required: true
        }
      ],
      attributes: ["CourseID"],
      order: [["CreatedDate", "DESC"]]
    })
    .then(user => {
      res.send(user);
    })
    .catch(err => {
      res.status(400).json({ error: err });
    }); */
});

home.get("/getnewlyadded", methods.ensureToken, (req, res) => {
  db.coursedetails
    .findAll({
      limit: 2,
      attributes: ["CourseName"],
      order: [["CreatedDate", "DESC"]]
    })
    .then(user => {
      res.send(user);
    })
    .catch(err => {
      res.status(400).json({ error: err });
    });
});

home.get("/getcurrent", methods.ensureToken, (req, res) => {
  db.coursecontents
    .findAll({
      include: [
        {
          model: db.courseprogress,
          attributes: ["CourseName", "CourseID"],
          required: true,
          where: {
            AssignedTo: req.query.id,
            CourseStatus: "InProgress"
          }
        }
      ],
      where: db.sequelize.and({
        CourseID: db.sequelize.literal(db.courseprogress.CourseID),
        AssignedUserID: req.query.id
      })
      //attributes: ["CourseID"]
    })
    .then(user => {
      res.send(user);
    })
    .catch(err => {
      res.status(400).json({ error: err });
    });
});

home.get("/getpopular", methods.ensureToken, (req, res) => {
  db.courseprogress
    .findAll({
      limit: 5,
      attributes: [
        "courseID",
        "CourseName",
        [db.sequelize.fn("COUNT", "courseID"), "CNT"]
      ],
      group: ["courseID", "CourseName"],
      order: [[db.sequelize.literal("CNT"), "DESC"]]
      //having: [db.sequelize.fn("COUNT", "courseID") > 1]
    })
    .then(user => {
      res.send(user);
    })
    .catch(err => {
      res.status(400).json({ error: err });
    });
});

module.exports = home;
