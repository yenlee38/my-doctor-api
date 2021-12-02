const sql = require("./db.js");

const Prescription = function (prescription) {
  this.id = prescription.id;
  this.name = prescription.name;
  this.recordId = prescription.recordId;
  this.amount = prescription.amount;
  this.use = prescription.use;
  this.createdAt = prescription.createdAt;
  this.updatedAt = prescription.updatedAt;
};

Prescription.create = (newPrescription, result) => {
  sql.query("INSERT INTO prescription SET ?", newPrescription, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created prescription: ", {
      id: res.insertId,
      ...newPrescription,
    });
    result(null, { id: res.insertId, ...newPrescription });
  });
};

Prescription.filterByRecord = (recordId, result) => {
  sql.query(
    `SELECT * FROM prescription WHERE recordId = '${recordId}'`,
    (err, res) => {
      if (err) {
        result(null, err);
        return;
      }
      result(null, res);
    }
  );
};

module.exports = Prescription;
