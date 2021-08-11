const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors")
const app = express();

// parse requests of content-type: application/json
app.use(bodyParser.json());

// parse requests of content-type: application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cors())



// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to bezkoder application." });
});

// set port, listen for requests
app.listen(3000, () => {
  console.log("Server is running on port 3000.");
});

require("./app/routes/account.routes.js")(app);
require("./app/routes/doctor.routes.js")(app);
require("./app/routes/patient.routes.js")(app);
require("./app/routes/room.routes.js")(app);
require("./app/routes/address.routes.js")(app);
require("./app/routes/bmi.routes.js")(app);
require("./app/routes/emotion.routes.js")(app);
require("./app/routes/heart-beat.routes.js")(app);

