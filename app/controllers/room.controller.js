const Room = require("../models/room.model.js");
const { v4: uuidv4 } = require("uuid");
// Create and Save a new Room
exports.create = (req, res) => {
  if (!req.body) {
    res.status(400).json({
      message: "Content can not be empty!",
    });
    return;
  }
  const room = new Room({
    id: uuidv4(),
    name: req.body.name,
    department: req.body.department,
    createdAt: new Date(),
    updatedAt: new Date(),
  });

  // Save Room in the database
  Room.create(room, (err, data) => {
    if (err)
      res.status(500).json({
        message: err.message || "Some error occurred while creating the Room.",
        room: null,
        count: 0,
      });
    else
      res.json({
        message: "Created at room!",
        count: 1,
        room: room,
      });
  });
};

// Find a single Room with a roomId
exports.filterDept = (req, res) => {
  Room.filterByDept(req.params.department, (err, data) => {
    if (err)
      res.status(500).json({
        message: err.message || "Some error occurred while retrieving rooms.",
        room: null,
      });
    else
      res.json({
        message: "Find room by Department!",
        room: data,
      });
  });
};

// Update a Room identified by the roomId in the request
exports.update = (req, res) => {
  if (!req.body) {
    res.status(400).json({
      message: "Content can not be empty!",
    });
    return;
  }

  Room.updateById(req.params.roomId, new Room(req.body), (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).json({
          message: `Not found Room with id ${req.params.roomId}.`,
          room: null,
          count: 0,
        });
      } else {
        res.status(500).json({
          message: "Error updating Room with id " + req.params.roomId,
          room: null,
          count: 0,
        });
      }
    } else
      res.json({
        message: "Updated at room!",
        count: 1,
        room: new Room(req.body),
      });
  });
};
