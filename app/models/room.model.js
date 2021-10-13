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

Room.filterByDept = (dept, result) => {
  sql.query(`SELECT * FROM room WHERE department = "${dept}"`, (err, res) => {
    if (err) {
      result(null, err);
      return;
    }
    result(null, res);
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
