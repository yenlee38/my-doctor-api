const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
require("dotenv").config();
// parse requests of content-type: application/json
app.use(bodyParser.json());

// parse requests of content-type: application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cors());

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to my-doctor application." });
});

// set port, listen for requests
// app.listen(3000, () => {
//   console.log("Server is running on port 3000.");
// });

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

require("./app/routes/account.routes.js")(app);
require("./app/routes/doctor.routes.js")(app);
require("./app/routes/patient.routes.js")(app);
require("./app/routes/room.routes.js")(app);
require("./app/routes/address.routes.js")(app);
require("./app/routes/bmi.routes.js")(app);
require("./app/routes/emotion.routes.js")(app);
require("./app/routes/heart-beat.routes.js")(app);
require("./app/routes/medical-record.routes")(app);
require("./app/routes/department.routes")(app);
require("./app/routes/position.routes")(app);
require("./app/routes/medicine.routes")(app);
require("./app/routes/prescription.routes")(app);
require("./app/routes/schedule.routes")(app);
require("./app/routes/service.routes")(app);
require("./app/routes/doctor-registration.routes")(app);
