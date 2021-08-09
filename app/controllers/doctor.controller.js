const Doctor = require("../models/doctor.model.js");

exports.findAll = (req, res) => {
  Doctor.getAll((err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving doctors.",
      });
    else res.send(data);
  });
};

// Find Doctors with a department
exports.filterDept = (req, res) => {
  Doctor.filterByDept(req.params.department, (err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving doctors.",
      });
    else res.send(data);
  });
};

// Find Doctors with a name
exports.filterName = (req, res) => {
  Doctor.filterByName(req.params.name, (err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving doctors.",
      });
    else res.send(data);
  });
};

// Find a single Doctor with a doctorId
exports.findOne = (req, res) => {
  Doctor.findById(req.params.doctorId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Doctor with id ${req.params.doctorId}.`,
        });
      } else {
        res.status(500).send({
          message: "Error retrieving Doctor with id " + req.params.doctorId,
        });
      }
    } else res.send(data);
  });
};

// Update a Doctor identified by the doctorId in the request
exports.update = (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
  }

  Doctor.updateById(req.params.doctorId, new Doctor(req.body), (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Doctor with id ${req.params.doctorId}.`,
        });
      } else {
        res.status(500).send({
          message: "Error updating Doctor with id " + req.params.doctorId,
        });
      }
    } else res.send(data);
  });
};
