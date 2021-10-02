const sql = require("./db.js");
const TYPES = require("../types/index.js");

const Doctor = function (doctor) {
  this.id = doctor.id;
  this.avatar = doctor.avatar;
  this.fullname = doctor.fullname;
  this.department = doctor.department;
  this.phone = doctor.phone;
  this.education = doctor.education;
  this.gender = doctor.gender;
  this.birthDate = doctor.birthDate;
  this.createdAt = doctor.createdAt;
  this.updatedAt = doctor.updatedAt;
};

Doctor.create = (doctor, result) => {
  sql.query(`INSERT INTO doctor set ?`, doctor, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created doctor: ");
    result(null, { ...doctor });
  });
};

Doctor.findById = (doctorId, result) => {
  sql.query(`SELECT * FROM doctor WHERE id = ?`, [doctorId], (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found doctor: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found doctor with the id
    result({ kind: "not_found" }, null);
  });
};

Doctor.filterByDept = (dept, result) => {
  sql.query(`SELECT * FROM doctor WHERE department = "${dept}"`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("doctors: ", res);
    result(null, res);
  });
};

Doctor.filterByName = (name, result) => {
  sql.query(
    `SELECT * FROM doctor WHERE fullName like "%${name}%"`,
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      console.log("doctors: ", res);
      result(null, res);
    }
  );
};

Doctor.getAll = (result) => {
  sql.query("SELECT * FROM doctor", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("doctors: ", res);
    result(null, res);
  });
};

Doctor.updateById = (id, doctor, result) => {
  Object.values(TYPES.DEPARTMENT).every((element) => {
    if (element === doctor.department) {
      sql.query(
        "UPDATE doctor SET department = ? WHERE id = ?",
        [doctor.department, id],
        (err, res) => {}
      );
      return false;
    }
    return true;
  });
  Object.values(TYPES.GENDER).every((element) => {
    if (element === doctor.gender) {
      sql.query(
        "UPDATE doctor SET gender = ? WHERE id = ?",
        [doctor.gender, id],
        (err, res) => {}
      );
      return false;
    }
    return true;
  });
  sql.query(
    "UPDATE doctor SET avatar = ?, fullname = ?, birthDate = ?, education = ?, phone = ? WHERE id = ?",
    [
      doctor.avatar,
      doctor.fullname,
      doctor.birthDate,
      doctor.education,
      doctor.phone,
      id,
    ],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found doctor with the id
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("updated doctor: ", { id: id });
      result(null, { id: id });
    }
  );
};

module.exports = Doctor;
