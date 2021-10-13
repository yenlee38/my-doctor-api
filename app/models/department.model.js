const sql = require("./db.js");

const Department = function (department) {
  this.id = department.id;
  this.name = department.name;
  this.time = department.time;
  this.createdAt = department.createdAt;
  this.updatedAt = department.updatedAt;
};

Department.create = (newDepartment, result) => {
  sql.query("INSERT INTO department SET ?", newDepartment, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }
    console.log("created department: ", { id: res.insertId, ...newDepartment });
    result(null, { id: res.insertId, ...newDepartment });
  });
};

Department.findByName = (name, result) => {
  sql.query(`SELECT * FROM department WHERE name = "${name}"`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found department: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found department with the id
    result({ kind: "not_found" }, null);
  });
};

module.exports = Department;
