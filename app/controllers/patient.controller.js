const Patient = require("../models/patient.model.js");
const {v4: uuidv4} = require('uuid');
// Find a single Patient with a patientId
exports.findOne = (req, res) => {
  Patient.findById(req.params.patientId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).json({
          message: `Not found Patient with id ${req.params.patientId}.`,
          count: 0,
          patient: null
        });
      } else {
        res.status(500).json({
          message: "Error retrieving Patient with id " + req.params.patientId,
          count: 0,
          patient: null
        });
      }
    } else res.json({
      count:1,
      message: "Find patient by id!",
      patient: data
    });
  });
};

// Update a Patient identified by the patientId in the request
exports.update = (req, res) => {
  if (!req.body) {
    res.status(400).json({
      message: "Content can not be empty!",
    });
  }

  Patient.updateById(
    req.params.patientId,
    new Patient(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).json({
            message: `Not found Patient with id ${req.params.patientId}.`,
            count: 0,
          patient: null
          });
        } else {
          res.status(500).json({
            message: "Error updating Patient with id " + req.params.patientId,
            count: 0,
          patient: null
          });
        }
      } else res.json({
        message: "Updated patient success!",
        count: 1,
        patient:  new Patient(req.body)
      });
    }
  );
};
