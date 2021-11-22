const sql = require("./db");
const MedicalRecord = function (medicalRecord) {
  this.id = medicalRecord.id;
  this.doctorId = medicalRecord.doctorId;
  this.patientId = medicalRecord.patientId;
  this.patientName = medicalRecord.patientName;
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
        result(err, null);
        return;
      }

      result(null, res);
    }
  );
};

MedicalRecord.getAllByDoctor = (doctorId, result) => {
  sql.query(
    "SELECT * FROM medicalRecord where doctorId = ? order by date DESC",
    [doctorId],
    (err, res) => {
      if (err) {
        result(err, null);
        return;
      }

      result(null, res);
    }
  );
};

MedicalRecord.findByPatientName = (doctorId, patientName, result) => {
  sql.query(
    `SELECT * FROM medicalRecord where doctorId = '${doctorId}' and patientName like '%${patientName}%'`,
    (err, res) => {
      if (err) {
        result(err, null);
        return;
      }

      result(null, res);
    }
  );
};

MedicalRecord.getRecord = (id, result) => {
  sql.query("SELECT * FROM medicalRecord where id = ?", [id], (err, res) => {
    if (err) {
      result(err, null);
      return;
    }

    if (res.length) {
      result(null, res[0]);
      return;
    }

    result({ kind: "not_found" }, null);
  });
};

MedicalRecord.getChartByDay = (doctorId, result) => {
  sql.query(
    `SELECT count(*), hour(date) FROM medicalRecord where doctorId = '${doctorId}' and date like '${
      new Date().toISOString().split("T")[0]
    }%' group by hour(date)`,
    (err, res) => {
      if (err) {
        result(err, null);
        return;
      }

      result(null, res);
    }
  );
};

MedicalRecord.getByDay = (doctorId, date, result) => {
  sql.query(
    "SELECT date as x, count(*) as y FROM medicalRecord where doctorId = ? and date = ?",
    [doctorId, date],
    (err, res) => {
      if (err) {
        result(err, null);
        return;
      }

      result(null, res);
    }
  );
};

module.exports = MedicalRecord;
