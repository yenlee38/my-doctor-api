const Room = require("../models/room.model.js");

// Create and Save a new Room
exports.create = (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
  }
  const room = new Room({
    name: req.body.name,
    department: req.body.department,
  });

  // Save Room in the database
  Room.create(room, (err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || "Some error occurred while creating the Room.",
      });
    else res.send(data);
  });
};

// Find a single Room with a roomId
exports.findOne = (req, res) => {
  Room.findById(req.params.roomId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Room with id ${req.params.roomId}.`,
        });
      } else {
        res.status(500).send({
          message: "Error retrieving Room with id " + req.params.roomId,
        });
      }
    } else res.send(data);
  });
};

// Update a Room identified by the roomId in the request
exports.update = (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
  }

  Room.updateById(req.params.roomId, new Room(req.body), (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Room with id ${req.params.roomId}.`,
        });
      } else {
        res.status(500).send({
          message: "Error updating Room with id " + req.params.roomId,
        });
      }
    } else res.send(data);
  });
};
