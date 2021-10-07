module.exports = (app) => {
  const department = require("../controllers/department.controller.js");

  // Create a new Room
  app.post("/department", department.create);

  // Retrieve a single Room with departmentId
  app.get("/department/:name", department.findOne);

  // Update a Room with departmentId
  app.put("/department/:departmentId", department.update);
};
