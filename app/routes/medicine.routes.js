module.exports = (app) => {
  const medicine = require("../controllers/medicine.controller.js");

  app.get("/medicine", medicine.findAll);
  app.get("/medicine/:name", medicine.findName);
};
