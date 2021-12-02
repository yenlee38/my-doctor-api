const Medicine = require("../models/medicine.model.js");

exports.findAll = (req, res) => {
  Medicine.getAll((err, data) => {
    if (err)
      res.status(500).json({
        message:
          err.message || "Some error occurred while retrieving medicines.",
        medicine: null,
      });
    else
      res.json({
        message: "Find medicine by Department!",
        medicine: data,
      });
  });
};
