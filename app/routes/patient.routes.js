module.exports = (app) => {
  const patient = require("../controllers/patient.controller.js");

  // Retrieve a single Patient with patientId
  app.get("/patient/:patientId", patient.findOne);

  // Update a Patient with patientId
  app.put("/patient/:patientId", patient.update);
};
