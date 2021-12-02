const sql = require("./db.js");

const Medicine = function (medicine) {
  this.id = medicine.id;
  this.name = medicine.name;
  this.createdAt = medicine.createdAt;
  this.updatedAt = medicine.updatedAt;
};

Medicine.getAll = (result) => {
  sql.query(`SELECT * FROM medicine`, (err, res) => {
    if (err) {
      result(null, err);
      return;
    }
    result(null, res);
  });
};

Medicine.getByName = (name, result) => {
  sql.query(
    `SELECT * FROM medicine where name like '%${name}%'`,
    (err, res) => {
      if (err) {
        result(null, err);
        return;
      }
      result(null, res);
    }
  );
};

module.exports = Medicine;
