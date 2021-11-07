module.exports = (app) => {
    const schedule = require("../controllers/schedule.controller.js");
  
    app.post("/schedule", schedule.create);
  
    app.get("/schedule", schedule.findAll);

    app.get("/schedule/:doctorId/doctor", schedule.findByDoctorId);
  };
  