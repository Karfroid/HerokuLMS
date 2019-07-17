const express = require("express");
const users = express.Router();
const cors = require("cors");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const config = require("../libs/config");
const auth = require("../libs/auth");
var methods = require("../libs/methods");

const fs = require("fs");
const path = require("path");

const User = require("../models/User");

users.use(cors());

users.post("/register", methods.ensureToken, (req, res) => {
  const today = new Date();
  const userData = {
    EmployeeID: req.body.eid,
    LastName: req.body.lastname,
    FirstName: req.body.firstname,
    EmailID: req.body.email,
    Functions: req.body.functions,
    Project: req.body.project,
    Division: req.body.division,
    Role: req.body.role,
    CreatedDate: today,
    CreatedbyID: req.query.id,
    Image: req.body.image,
    Active: req.body.active,
    LastUpdatedate: today,
    Flag: req.body.flag,
    Passwd: req.body.password
  };

  var emailSelector = {
    where: { EmailID: req.body.email }
  };
  User.findOne(emailSelector)
    .then(user => {
      if (!user) {
        bcrypt.hash(req.body.password, 10, (err, hash) => {
          userData.Passwd = hash;
          User.create(userData)
            .then(user => {
              console.log(user);
              res.json({ status: user.FirstName + " registered" });
            })
            .catch(err => {
              res.send("create error: " + err);
            });
        });
      } else {
        bcrypt.hash(req.body.password, 10, (err, hash) => {
          userData.Passwd = hash;
          User.update(userData, emailSelector)
            .then(updated => {
              res.send("User data updated successfully");
            })
            .catch(err => {
              res.send("update error: " + err);
            });
        });
      }
    })
    .catch(err => {
      res.send("error: " + err);
    });
});

users.post("/changepassword", methods.ensureToken, (req, res) => {
  User.findOne({
    attributes: ["EmailID", "Passwd"],
    where: { EmployeeID: req.query.id }
  })
    .then(user => {
      if (user) {
        //bcrypt.hash(req.body.password, 10, (err, hash) => {
        //res.send("check", hash, user.Passwd);
        if (
          bcrypt.compareSync(req.body.currentpassword, user.Passwd) &&
          req.body.newpassword === req.body.repeatpassword
        ) {
          res.send("Password updated successfully");
          bcrypt.hash(req.body.newpassword, 10, (err, hash) => {
            User.update(
              { Passwd: hash },
              { where: { EmployeeID: req.query.id } }
            )
              .then(updated => {
                res.send("Password updated successfully");
              })
              .catch(err => {
                res.send("update error: " + err);
              });
          });
        } else {
          res.send({ error: "New Password update failed" });
        }
        //});
      } else {
        res.status(400).json({ error: "User does not exist" });
      }
    })
    .catch(err => {
      res.status(400).json({ error: err });
    });
  /* User.findOne({
    attributes: ["EmailID", "Passwd"],
    where: { EmployeeID: req.query.id }
  })
    .then(user => {
      
      if (user) {
        if (
          bcrypt.compareSync(req.body.currentpassword, user.Passwd) &&
          req.body.newpassword === req.body.repeatpassword
        ) {
          User.update(Passwd, req.body.newpassword)
            .then(updated => {
              res.send("Password updated successfully");
            })
            .catch(err => {
              res.send("update error: " + err);
            });
        }
      } else {
        res.status(400).json({ error: "User does not exist" });
      }
    })
    .catch(err => {
      res.status(400).json({ error: err });
    }); */
});

users.post("/login", (req, res) => {
  User.findOne({
    attributes: ["EmployeeID", "Role", "FirstName", "Passwd"],
    where: { EmailID: req.body.email }
  })
    .then(user => {
      if (user) {
        if (bcrypt.compareSync(req.body.password, user.Passwd)) {
          let token = auth.sign(user.dataValues);
          user = user.toJSON();
          user.token = token;
          delete user.Passwd;
          //let token = jwt.sign(user.dataValues, privateKEY, signOptions);
          res.send(user);
        }
      } else {
        res.status(400).json({ error: "User does not exist" });
      }
    })
    .catch(err => {
      res.status(400).json({ error: err });
    });
});

users.get("/getcurrentuser", methods.ensureToken, (req, res) => {
  User.findOne({
    attributes: [
      "EmployeeID",
      "FirstName",
      "LastName",
      "EmailID",
      "Functions",
      "Project",
      "Division",
      "Image"
    ],
    where: { EmployeeID: req.query.id }
  })
    .then(user => {
      console.log(user);
      res.send(user);
    })
    .catch(err => {
      res.status(400).json({ error: err });
    });
});

users.get("/getalluser", methods.ensureToken, (req, res) => {
  User.findAll({
    attributes: [
      "EmployeeID",
      "FirstName",
      "LastName",
      "EmailID",
      "Functions",
      "Project",
      "Division",
      "Image",
      "Role"
    ],
    where: { Active: "1" }
  })
    .then(user => {
      console.log(user);
      res.send(user);
    })
    .catch(err => {
      res.status(400).json({ error: err });
    });
});

module.exports = users;
