const fs = require("fs");
var jwt = require("jsonwebtoken");
var config = require("./config");
const path = require("path");
// use 'utf8' to get string instead of byte array  (512 bit key)
var privateKEY = fs.readFileSync(
  path.resolve(__dirname, "./private.key"),
  "utf8"
);
var publicKEY = fs.readFileSync(
  path.resolve(__dirname, "./public.key"),
  "utf8"
);

module.exports = {
  sign: payload => {
    var signOptions = {
      issuer: config.issuer,
      subject: config.subject,
      audience: config.audience,
      expiresIn: config.expires, // 30 days validity
      algorithm: config.algorithm
    };
    return jwt.sign(payload, privateKEY, signOptions);
  },
  verify: token => {
    var verifyOptions = {
      issuer: config.issuer,
      subject: config.subject,
      audience: config.audience,
      expiresIn: config.expires, // 30 days validity
      algorithm: config.algorithm
    };
    try {
      return jwt.verify(token, publicKEY, verifyOptions);
    } catch (err) {
      return false;
    }
  },
  decode: token => {
    return jwt.decode(token, { complete: true });
    //returns null if token is invalid
  }
};

/* var verifyOptions = {
  issuer: config.i,
  subject: config.s,
  expiresIn: config.expires,
  algorithm: config.algorithm
};

function verifyToken(req, res, next) {
  var token = req.headers["x-access-token"];
  if (!token)
    return res.status(403).send({ auth: false, message: "No token provided." });

  jwt.verify(token, config.secret, function(err, decoded) {
    if (err)
      return res
        .status(500)
        .send({ auth: false, message: "Failed to authenticate token." });

    req.userId = decoded.id;
    next();
  });
}

module.exports = verifyToken; */
