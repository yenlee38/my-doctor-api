module.exports = (app) => {
  const room = require("../controllers/room.controller.js");

  // Create a new Room
  app.post("/room", room.create);

  // Retrieve a single Room with roomId
  app.get("/room/:department", room.filterDept);

  // Update a Room with roomId
  app.put("/room/:roomId", room.update);
};
