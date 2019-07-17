const Sequelize = require("sequelize");
const db = {};
const sequelize = new Sequelize("BornLMSDB", "Bornadmin", "Welcome@123", {
  host: "lms-sql-server.database.windows.net",
  port: "1433",
  dialect: "mssql",
  dialectOptions: {
    options: {
      encrypt: true
    }
  }
});

/* const sequelize = new Sequelize("lms", "root", "", {
  host: "127.0.0.1",
  port: "3307",
  dialect: "mysql",
  dialectOptions: {
    options: {
      encrypt: true
    }
  }
}); */

db.sequelize = sequelize;
db.Sequelize = Sequelize;

db.coursecontents = require("../models/CourseContent")(sequelize, Sequelize);
db.coursedetails = require("../models/CourseDetail")(sequelize, Sequelize);
db.courseprogress = require("../models/CourseProgressStatus")(
  sequelize,
  Sequelize
);
db.coursecontents.belongsTo(db.coursedetails, {
  foreignKey: "CourseID",
  targetKey: "CourseID"
});
db.coursecontents.belongsTo(db.courseprogress, {
  foreignKey: "CourseID",
  targetKey: "CourseID"
});
db.coursedetails.hasMany(db.coursecontents, { foreignKey: "CourseID" });
db.coursedetails.hasMany(db.courseprogress, { foreignKey: "CourseID" });
db.courseprogress.hasMany(db.coursecontents, { foreignKey: "CourseID" });

module.exports = db;
