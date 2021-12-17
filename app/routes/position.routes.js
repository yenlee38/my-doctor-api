module.exports = (app) => {
  const position = require("../controllers/position.controller.js");

  // Create a new Room
  app.post("/position", position.create);
  app.post("/position/max", position.getMaxPosition);
  app.post("/position/current", position.currentNumberByRoom);
  app.post("/position/state", position.findAllByState);
  app.post("/position/roomState", position.findAllByRoomState);
  app.post("/position/number", position.exist);

  // Retrieve a single Room with positionId
  app.get("/position/:patientId/all", position.findAllByPatient);
  app.get("/position/chartState", position.chartByState);
  app.get("/position/chartDept", position.chartByDept);
  app.get("/position/:department/dept", position.findAllByDept);
  app.get("/position/:room/room", position.findAllByRoom);

  // Update a Room with positionId
  app.put("/position/:positionId/cancel", position.cancel);
  app.put("/position/:positionId/used", position.used);
  app.put("/position/expired", position.expired);
};
