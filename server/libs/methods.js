let jwt = require("jsonwebtoken");
var auth = require("./auth");

module.exports.ensureToken = function(req, res, next) {
  var bearerHeader = req.headers["authorization"];

  if (typeof bearerHeader !== "undefined") {
    const bearerToken = bearerHeader;
    if (auth.verify(bearerToken)) {
      next();
    } else {
      res.sendStatus(403);
    }
  } else {
    res.sendStatus(403);
  }
};
