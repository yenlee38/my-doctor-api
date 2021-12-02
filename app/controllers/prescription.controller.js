const Prescription = require("../models/prescription.model.js");
const { v4: uuidv4 } = require("uuid");

exports.create = (req, res) => {
  if (!req.body) {
    res.status(400).json({
      message: "Content can not be empty!",
    });
    return;
  }
  const prescription = new Prescription({
    id: uuidv4(),
    name: req.body.name,
    recordId: req.body.recordId,
    amount: req.body.amount,
    use: req.body.use,
    createdAt: new Date(),
    updatedAt: new Date(),
  });

  // Save Prescription in the database
  Prescription.create(prescription, (err, data) => {
    if (err)
      res.status(500).json({
        message:
          err.message || "Some error occurred while creating the Prescription.",
        prescription: null,
        count: 0,
      });
    else
      res.json({
        message: "Created at prescription!",
        count: 1,
        prescription: prescription,
      });
  });
};

exports.filterRecord = (req, res) => {
  Prescription.filterByRecord(req.params.recordId, (err, data) => {
    if (err)
      res.status(500).json({
        message:
          err.message || "Some error occurred while retrieving prescriptions.",
        prescription: null,
      });
    else
      res.json({
        message: "Find prescription by Department!",
        prescription: data,
      });
  });
};
