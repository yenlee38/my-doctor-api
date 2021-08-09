const Patient = require("../models/patient.model.js");

// Find a single Patient with a patientId
exports.findOne = (req, res) => {
  Patient.findById(req.params.patientId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Patient with id ${req.params.patientId}.`,
        });
      } else {
        res.status(500).send({
          message: "Error retrieving Patient with id " + req.params.patientId,
        });
      }
    } else res.send(data);
  });
};

// Update a Patient identified by the patientId in the request
exports.update = (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
  }

  Patient.updateById(
    req.params.patientId,
    new Patient(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Patient with id ${req.params.patientId}.`,
          });
        } else {
          res.status(500).send({
            message: "Error updating Patient with id " + req.params.patientId,
          });
        }
      } else res.send(data);
    }
  );
};
