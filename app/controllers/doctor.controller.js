const Doctor = require("../models/doctor.model.js");
const { v4: uuidv4 } = require("uuid");

exports.findAll = (req, res) => {
  Doctor.getAll((err, data) => {
    if (err)
      res.status(500).json({
        message: err.message || "Some error occurred while retrieving doctors.",
        doctor: null,
        count: 0,
      });
    else
      res.json({
        count: data.length,
        doctor: data,
        message: "Get all list doctor!",
      });
  });
};

// Find Doctors with a department
exports.filterDept = (req, res) => {
  Doctor.filterByDept(req.params.departmentId, (err, data) => {
    if (err)
      res.status(500).json({
        message: err.message || "Some error occurred while retrieving doctors.",
        doctor: null,
        count: 0,
      });
    else
      res.json({
        message: "Find doctor by Department!",
        count: data.length,
        doctor: data,
      });
  });
};

// Find Doctors with a name
exports.filterName = (req, res) => {
  Doctor.filterByName(req.params.name, (err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving doctors.",
        doctor: null,
        count: 0,
      });
    else
      res.json({
        message: "Find doctor by Name!",
        count: data.length,
        doctor: data,
      });
  });
};

// Find a single Doctor with a doctorId
exports.findOne = (req, res) => {
  Doctor.findById(req.params.doctorId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).json({
          message: `Not found Doctor with id ${req.params.doctorId}.`,
          doctor: null,
          count: 0,
        });
      } else {
        res.status(500).json({
          message: "Error retrieving Doctor with id " + req.params.doctorId,
          doctor: null,
          count: 0,
        });
      }
    } else
      res.json({
        message: "Find doctor by Id!",
        count: 1,
        doctor: data,
      });
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
          doctor: null,
          count: 0,
        });
      } else {
        res.status(500).send({
          message: "Error updating Doctor with id " + req.params.doctorId,
          doctor: null,
          count: 0,
        });
      }
    } else
      res.json({
        message: "Updated doctor !",
        count: 1,
        doctor: new Doctor(req.body),
      });
  });
};
