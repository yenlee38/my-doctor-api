module.exports = (app) => {
  const doctor = require("../controllers/doctor.controller.js");

  // Retrieve all Doctors
  app.get("/doctor", doctor.findAll);

  // Retrieve Doctors
  app.get("/doctor/department/:department", doctor.filterDept);
  app.get("/doctor/find/:name", doctor.filterName);

  // Retrieve a single Doctor with doctorId
  app.get("/doctor/:doctorId", doctor.findOne);

  // Update a Doctor with doctorId
  app.put("/doctor/:doctorId", doctor.update);
};
