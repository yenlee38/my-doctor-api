const sql = require("./db.js");
const { NUMBER_STATE } = require("../types/index.js");

const Position = function (number) {
  this.id = number.id;
  this.patientId = number.patientId;
  this.roomId = number.roomId;
  this.number = number.number;
  this.date = number.date;
  this.state = number.state;
  this.createdAt = number.createdAt;
  this.updatedAt = number.updatedAt;
};

Position.create = (newPosition, result) => {
  sql.query("INSERT INTO position SET ?", newPosition, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }
    console.log("created position: ", { id: res.insertId, ...newPosition });
    result(null, { id: res.insertId, ...newPosition });
  });
};

Position.setState = (id, state, result) => {
  sql.query(
    "UPDATE position SET state = ? WHERE id = ?",
    [state, id],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found position with the id
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("updated position: ", { id: id });
      result(null, { id: id });
    }
  );
};

Position.getAll = (result) => {
  sql.query(
    "SELECT * FROM position where state = " + NUMBER_STATE.NOT_USE,
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      console.log("positions: ", res);
      result(null, res);
    }
  );
};

module.exports = Position;