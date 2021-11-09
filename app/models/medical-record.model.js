const sql = require("./db");
const MedicalRecord = function (medicalRecord) {
  this.id = medicalRecord.id;
  this.doctorId = medicalRecord.doctorId;
  this.patientId = medicalRecord.patientId;
  this.name = medicalRecord.name;
  this.date = medicalRecord.date;
  this.precription = medicalRecord.precription;
  this.fileStore = medicalRecord.fileStore;
  this.createdAt = medicalRecord.createdAt;
  this.updatedAt = medicalRecord.updatedAt;
};

MedicalRecord.create = (medicalRecord, result) => {
  sql.query("Insert into Medicalrecord set ?", medicalRecord, (err, res) => {
    if (err) {
      result(err, null);
      return;
    }
    result(null, { ...medicalRecord });
  });
};

MedicalRecord.uploadRecordFile = (medicalRecord, result) => {
  sql.query(
    "Update MedicalRecord set fileStore = ? where id = ?",
    [medicalRecord.fileStore, medicalRecord.id],
    (err, res) => {
      if (err) {
        result(err, null);
        return;
      }

      if (res.affectedRows == 0) {
        result({ kind: "not_found" }, null);
        return;
      }

      result(null, { ...medicalRecord });
    }
  );
};

MedicalRecord.uploadRecordPredistion = (medicalRecord, result) => {
  sql.query(
    "Update MedicalRecord set precription ? where id = ?",
    [medicalRecord.precription, medicalRecord.id],
    (err, res) => {
      if (err) {
        result(err, null);
        return;
      }

      if (res.affectedRows == 0) {
        result({ kind: "not_found" }, null);
        return;
      }

      result(null, { ...medicalRecord });
    }
  );
};

MedicalRecord.getAllByPatient = (patientId, result) => {
  sql.query(
    "SELECT * FROM medicalRecord where patientId = ?",
    [patientId],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }

      console.log("BMI: ", res);
      result(null, res);
    }
  );
};

module.exports = MedicalRecord;
