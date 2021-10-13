const sql = require("./db.js");
const { NUMBER_STATE } = require("../types/index.js");

const Position = function (position) {
  this.id = position.id;
  this.patientId = position.patientId;
  this.room = position.room;
  this.number = position.number;
  this.date = position.date;
  this.state = position.state;
  this.createdAt = position.createdAt;
  this.updatedAt = position.updatedAt;
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
    "UPDATE position SET state = ?, updatedAt = ? WHERE id = ?",
    [state, new Date(), id],
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

      console.log("updated position");
      result(null);
    }
  );
};

Position.getPositionByPatient = (patientId, result) => {
  sql.query(
    `SELECT * FROM position where patientId = "${patientId}" order by date`,
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

Position.getMaxPosition = (position, result) => {
  sql.query(
    "SELECT MAX(number) as maxNumber FROM position where room = ? and date = ? and state = ?",
    [position.room, position.date, NUMBER_STATE.USED],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }

      if (res.length) {
        console.log("found position: ", res[0].maxNumber);
        result(null, res[0].maxNumber);
        return;
      }

      result({ kind: "not_found" }, null);
    }
  );
};

Position.exist = (position, result) => {
  sql.query(
    "SELECT * FROM position where room = ? and date = ? and number = ?",
    [position.room, position.date, position.number],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }

      if (res.length) {
        console.log("found position: ", res[0]);
        result(null, res[0]);
        return;
      }

      result({ kind: "not_found" }, null);
    }
  );
};

module.exports = Position;
