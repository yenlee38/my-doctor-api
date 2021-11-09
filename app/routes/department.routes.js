module.exports = (app) => {
  const department = require("../controllers/department.controller.js");

  app.post("/department", department.create);

  app.get("/department/:name", department.findOne);
};
