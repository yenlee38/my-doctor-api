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

  Position.exist(position, (err, data) => {
    if (data === null) {
      Position.create(position, (err, data) => {
        if (err)
          res.status(500).json({
            message:
              err.message || "Some error occurred while creating the Position.",
            position: null,
          });
        else
          res.json({
            message: "Created at position!",
            position: position,
          });
      });
    } else
      res.json({
        message: "Exist position!",
        position: null,
      });
  });

  // Save Position in the database
};

exports.findAllByPatient = (req, res) => {
  Position.getPositionByPatient(req.params.patientId, (err, data) => {
    if (err)
      res.status(500).json({
        message:
          err.message || "Some error occurred while retrieving positions.",
        position: null,
      });
    else
      res.json({
        message: "Get all list position!",
        position: data,
      });
  });
};

exports.findAllByState = (req, res) => {
  if (!req.body) {
    res.status(400).json({
      message: "Content can not be empty!",
    });
    return;
  }
  Position.filterPositionByState(new Position(req.body), (err, data) => {
    if (err)
      res.status(500).json({
        message:
          err.message || "Some error occurred while retrieving positions.",
        position: null,
      });
    else
      res.json({
        message: "Get all list position!",
        position: data,
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

  Position.getMaxPosition(req.body.department, req.body.date, (err, data) => {
    if (err)
      res.status(500).json({
        message: err.message || "Some error occurred while retrieving.",
        data: null,
      });
    else
      res.json({
        message: "Get list!",
        data: data,
      });
  });
};

exports.exist = (req, res) => {
  if (!req.body) {
    res.status(400).json({
      message: "Content can not be empty!",
    });
    return;
  }

  Position.exist(new Position(req.body), (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).json({ message: `Not found position`, count: 0 });
      } else {
        res.status(500).json({
          message: "Error retrieving position",
          count: 0,
        });
      }
    } else res.json({ message: "Find one position!", count: 1 });
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

exports.expired = (req, res) => {
  Position.expired((err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).json({
          message: `Not found Position`,
        });
      } else {
        res.status(500).json({
          message: "Error used Position",
        });
      }
    } else
      res.json({
        message: "Used position!",
      });
  });
};

exports.currentNumberByRoom = (req, res) => {
  if (!req.body) {
    res.status(400).json({
      message: "Content can not be empty!",
    });
    return;
  }

  Position.currentNumberByRoom(new Position(req.body), (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).json({ current: 0 });
      } else {
        res.status(500).json({ current: 0 });
      }
    } else res.json({ current: data || 0 });
  });
};

exports.chartByDate = (req, res) => {
  Position.chartByDate((err, data) => {
    if (err)
      res.status(500).json({
        message:
          err.message || "Some error occurred while retrieving positions.",
        chart: [],
      });
    else
      res.json({
        message: "chart by date",
        chart: data,
      });
  });
};

exports.chartByDept = (req, res) => {
  Position.chartByDept((err, data) => {
    if (err)
      res.status(500).json({
        message:
          err.message || "Some error occurred while retrieving positions.",
        chart: [],
      });
    else
      res.json({
        message: "chart by dept",
        chart: data,
      });
  });
};
