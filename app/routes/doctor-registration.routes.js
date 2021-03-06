module.exports = (app) => {
    const doctorRegistration = require("../controllers/doctor-registration.controller.js");
  
    app.get("/doctor-registration", doctorRegistration.getAll);
  
    app.get("/doctor-registration/patient/:patientId", doctorRegistration.findByPatientId);
    app.get("/doctor-registration/doctor/:doctorId", doctorRegistration.findByDoctorId);

    app.get("/doctor-registration/patient/:patientId/doctor/:doctorId", doctorRegistration.findByPatientIdAndDoctorId);
 
    // Retrieve a single Doctor with doctorId
    app.get("/doctor-registration/:id", doctorRegistration.findById);
  
    app.post("/doctor-registration", doctorRegistration.create);

    app.post("/doctor-registration/update/:id", doctorRegistration.update);
    app.put("/doctor-registration/:id/delete", doctorRegistration.delete);

  };
  