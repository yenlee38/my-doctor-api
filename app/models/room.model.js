const sql = require("./db.js");
const Department = require("./department.model.js");

const Room = function (room) {
  this.id = room.id;
  this.name = room.name;
  this.department = room.department;
  this.createdAt = room.createdAt;
  this.updatedAt = room.updatedAt;
};

Room.create = (newRoom, result) => {
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

Room.findByName = (name, result) => {
  sql.query(`SELECT * FROM room WHERE name = "${name}"`, (err, res) => {
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
  sql.query(
    "UPDATE room SET name = ?, department = ?, updatedAt = ? WHERE id = ?",
    [room.name, room.department, new Date(), id],
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
