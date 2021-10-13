module.exports = (app) => {
  const position = require("../controllers/position.controller.js");

  // Create a new Room
  app.post("/position", position.create);

  // Retrieve a single Room with positionId
  app.get("/position/:patientId", position.findAllByPatient);
  app.get("/position", position.getMaxPosition);

  // Update a Room with positionId
  app.put("/position/:positionId/cancel", position.cancel);
  app.put("/position/:positionId/used", position.used);
};
