module.exports = (app) => {
  const prescription = require("../controllers/prescription.controller.js");

  // Create a new Prescription
  app.post("/prescription", prescription.create);

  // Retrieve a single Prescription with prescriptionId
  app.get("/prescription/:recordId", prescription.filterRecord);
};
