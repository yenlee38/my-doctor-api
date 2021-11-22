module.exports = (app) => {
    const service = require("../controllers/service.controller.js");
  
    app.post("/service", service.create);
  
    app.get("/service", service.getAll);

    app.get("/service/:doctorId/doctor", service.findByDoctorId);

    app.get("/service/:serviceId", service.findById);
    
  };
  