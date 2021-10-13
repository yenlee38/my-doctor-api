module.exports = (app) => {
  const department = require("../controllers/department.controller.js");

  app.post("/department", department.create);

  app.get("/department/:name", department.findOne);
  app.get("/department/:doctorId/time", department.getTime);

  app.put("/department/time", department.setTime);
};
