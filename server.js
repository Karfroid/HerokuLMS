var express = require("express");
const path = require("path");
var cors = require("cors");
var bodyParser = require("body-parser");
var app = express();
var port = process.env.PORT || 5000;

// Serve static files from the React app
app.use(express.static(path.join(__dirname, "client/build")));
app.get("/*", function(req, res) {
  res.sendFile(path.join(__dirname, "./client/build/index.html"));
});
app.use(bodyParser.json());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));

var Users = require("./routes/Users");
var Courses = require("./routes/CourseDetails");
var Home = require("./routes/HomeDetails");
app.use("/users", Users);
app.use("/courses", Courses);
app.use("/home", Home);

app.listen(port, () => {
  console.log("Server is running on port: " + port);
});
