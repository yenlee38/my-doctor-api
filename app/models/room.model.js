const sql = require("./db.js");
const department = require("../types/index.js").department;

const Room = function (room) {
  this.id = room.id;
  this.name = room.name;
  this.department = room.department;
};

Room.create = (newRoom, result) => {
  if (
    Object.values(department).every((element) => {
      if (element == newRoom.department) {
        return false;
      }
      return true;
    })
  ) {
    newRoom.department = null;
  }
  sql.query("INSERT INTO room SET ?", newRoom, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created room: ", { id: res.insertId, ...newRoom });
    result(null, { id: res.insertId, ...newRoom });
  });
};

Room.findById = (roomId, result) => {
  sql.query(`SELECT * FROM room WHERE id = ${roomId}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found room: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found room with the id
    result({ kind: "not_found" }, null);
  });
};

Room.updateById = (id, room, result) => {
  Object.values(department).every((element) => {
    if (element == room.department) {
      sql.query(
        "UPDATE room SET department = ? WHERE id = ?",
        [room.department, id],
        (err, res) => {}
      );
      return false;
    }
    return true;
  });
  sql.query(
    "UPDATE room SET name = ? WHERE id = ?",
    [room.name, id],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found room with the id
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("updated room: ", { id: id });
      result(null, { id: id });
    }
  );
};

module.exports = Room;
