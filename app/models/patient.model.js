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
  this.createdAt = patient.createdAt;
  this.updatedAt = patient.updatedAt;
};

Patient.updateAvatar = (patient, result) =>{
  sql.query("Update patient set avatar = ?, updatedAt = ?, where id = ?", [patient.avatar, new Date(), patient.id], (err, res) => {
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

      console.log("updated patient: ", { id: patient.id });
      result(null, { id: patient.id });
    }
  );
}

Patient.create = (patient, result) => {
  sql.query("INSERT INTO Patient set ?", patient, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created patient: ", );
    result(null, {...patient});
  });
};

Patient.findById = (patientId, result) => {
  sql.query(`SELECT * FROM Patient WHERE id = ?` , [patientId], (err, res) => {
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
    "UPDATE patient SET avatar = ?, fullName = ?, birthDate = ?, address = ?, updatedAt = ?, WHERE id = ?",
    [patient.avatar, patient.fullName, patient.birthDate, patient.address, new Date(), id],
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
