module.exports = (app) => {
    const schedule = require("../controllers/schedule.controller.js");
  
    app.post("/schedule", room.create);
  
    app.get("/schedule", schedule.findAll);

    app.get("/schedule/doctorId", schedule.findByDoctorId);
  };
  