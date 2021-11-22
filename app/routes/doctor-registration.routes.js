module.exports = (app) => {
    const doctorRegistration = require("../controllers/doctor-registration.controller.js");
  
    app.get("/doctor-registration", doctorRegistration.getAll);
  
    app.get("/doctor-registration/patient/:patientId", doctorRegistration.findByPatientId);
 
    // Retrieve a single Doctor with doctorId
    app.get("/doctor-registration/:id", doctorRegistration.findById);
  
    app.post("/doctor-registration", doctorRegistration.create);
  };
  