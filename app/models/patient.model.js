const sql = require("./db.js");
const gender = require("../types/index.js").GENDER;

// constructor
const Patient = function (patient) {
  this.id = patient.id;
  this.avatar = patient.avatar;
  this.fullName = patient.fullName;
  this.birthDate = patient.birthDate;
  this.gender = patient.gender;
  this.address = patient.address;
};

Patient.create = (id, result) => {
  sql.query("INSERT INTO patient (id) VALUES (?)", id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created patient: ", { id });
    result(null, { id });
  });
};

Patient.findById = (patientId, result) => {
  sql.query(`SELECT * FROM patient WHERE id = ${patientId}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found patient: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found patient with the id
    result({ kind: "not_found" }, null);
  });
};

Patient.updateById = (id, patient, result) => {
  Object.values(gender).every((element) => {
    if (element == patient.gender) {
      sql.query(
        "UPDATE patient SET gender = ? WHERE id = ?",
        [patient.gender, id],
        (err, res) => {}
      );
      return false;
    }
    return true;
  });
  sql.query(
    "UPDATE patient SET avatar = ?, fullName = ?, birthDate = ?, address = ? WHERE id = ?",
    [patient.avatar, patient.fullName, patient.birthDate, patient.address, id],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found patient with the id
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("updated patient: ", { id: id });
      result(null, { id: id });
    }
  );
};
module.exports = Patient;
