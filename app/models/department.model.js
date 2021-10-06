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

Department.findById = (departmentId, result) => {
  sql.query(
    `SELECT * FROM department WHERE id = "${departmentId}"`,
    (err, res) => {
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
    }
  );
};

Department.updateById = (id, department, result) => {
  sql.query(
    "UPDATE department SET name = ?, time = ? WHERE id = ?",
    [department.name, department.time, id],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found department with the id
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("updated department: ", { id: id });
      result(null, { id: id });
    }
  );
};

module.exports = Department;
