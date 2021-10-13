const Position = require("../models/position.model.js");
const { NUMBER_STATE } = require("../types/index.js");

const { v4: uuidv4 } = require("uuid");
// Create and Save a new Position
exports.create = (req, res) => {
  if (!req.body) {
    res.status(400).json({
      message: "Content can not be empty!",
    });
    return;
  }
  const position = new Position({
    id: uuidv4(),
    patientId: req.body.patientId,
    room: req.body.room,
    number: req.body.number,
    date: req.body.date,
    state: NUMBER_STATE.NOT_USE.toString(),
    createdAt: new Date(),
    updatedAt: new Date(),
  });

  // Save Position in the database
  Position.create(position, (err, data) => {
    if (err)
      res.status(500).json({
        message:
          err.message || "Some error occurred while creating the Position.",
        position: null,
        count: 0,
      });
    else
      res.json({
        message: "Created at position!",
        count: 1,
        position: position,
      });
  });
};

exports.findAllByPatient = (req, res) => {
  Position.getPositionByPatient(req.params.patientId, (err, data) => {
    if (err)
      res.status(500).json({
        message:
          err.message || "Some error occurred while retrieving positions.",
        position: null,
        count: 0,
      });
    else
      res.json({
        count: data.length,
        position: data,
        message: "Get all list position!",
      });
  });
};

exports.getMaxPosition = (req, res) => {
  if (!req.body) {
    res.status(400).json({
      message: "Content can not be empty!",
    });
    return;
  }

  Position.getMaxPosition(new Position(req.body), (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).json({ message: `Not found position` });
      } else {
        res.status(500).json({ message: "Error retrieving position" });
      }
    } else res.json({ message: "Find one position!", data });
  });
};

exports.cancel = (req, res) => {
  Position.setState(req.params.positionId, NUMBER_STATE.CANCEL, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).json({
          message: `Not found Position with id ${req.params.positionId}.`,
        });
      } else {
        res.status(500).json({
          message: "Error cancel Position with id " + req.params.positionId,
        });
      }
    } else
      res.json({
        message: "Cancel position!",
      });
  });
};

exports.used = (req, res) => {
  Position.setState(req.params.positionId, NUMBER_STATE.USED, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).json({
          message: `Not found Position with id ${req.params.positionId}.`,
        });
      } else {
        res.status(500).json({
          message: "Error used Position with id " + req.params.positionId,
        });
      }
    } else
      res.json({
        message: "Used position!",
      });
  });
};
