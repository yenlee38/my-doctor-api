module.exports = (app) => {
  const position = require("../controllers/position.controller.js");

  // Create a new Room
  app.post("/position", position.create);
  app.post("/position/max", position.getMaxPosition);
  app.post("/position/current", position.currentNumberByRoom);

  // Retrieve a single Room with positionId
  app.get("/position/:patientId/all", position.findAllByPatient);
  app.get("/position/state", position.findAllByState);
  app.get("/position/number", position.exist);

  // Update a Room with positionId
  app.put("/position/:positionId/cancel", position.cancel);
  app.put("/position/:positionId/used", position.used);
  app.put("/position/expired", position.expired);
};
