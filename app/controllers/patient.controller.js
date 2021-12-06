const Patient = require("../models/patient.model.js");
const cloudinary = require("../middleware/cloudinary");

// Find a single Patient with a patientId


exports.findAll = (req, res) => {
  Patient.getAll((err, data) => {
    if (err)
      res.status(500).json({
        message: err.message || "Some error occurred while retrieving patient.",
        patient: null,
      });
    else
      res.json({
        patient: data,
        message: "Get all list patient!",
      });
  });
};

exports.uploadAvatar = async (req, res) => {
  try {
    const result = await cloudinary.uploader.upload(req.file.path);
    let patient = new Patient({
      id: req.params.patientId,
      avatar: result.secure_url,
    });

    Patient.updateAvatar(patient, (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).json({
            message: `Not found Patient with id ${req.params.patientId}.`,
            count: 0,
            patient: null,
          });
        } else {
          res.status(500).json({
            message: "Error updating Patient with id " + req.params.patientId,
            count: 0,
            patient: null,
          });
        }
      } else
        res.json({
          message: "Updated patient success!",
          count: 1,
          patient: new Patient(req.body),
        });
    });
  } catch (e) {
    console.log(r);
    res.status(404).json({
      message: e,
      count: 0,
      patient: null,
    });
  }
};

exports.findOne = (req, res) => {
  Patient.findById(req.params.patientId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).json({
          message: `Not found Patient with id ${req.params.patientId}.`,
          patient: null,
        });
      } else {
        res.status(500).json({
          message: "Error retrieving Patient with id " + req.params.patientId,
          patient: null,
        });
      }
    } else
      res.json({
        message: "Find patient by id!",
        patient: data,
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
          });
        } else {
          res.status(500).json({
            message: "Error updating Patient with id " + req.params.patientId,
          });
        }
      } else res.json({ message: "Updated profile success!" });
    }
  );
};
