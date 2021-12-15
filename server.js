const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const paypal = require('paypal-rest-sdk');
const engines = require("consolidate");

paypal.configure({
  'mode': 'sandbox', //sandbox or live
  'client_id': 'AfRVpNTT940oF2ovplHRVP8tj_5gDrh1iqSSk1sUpdtMjiaSkXB2WzkoNSGL4zSCC1YQs4K0KPKfk8GL',
  'client_secret': 'EHw02XkFeA6H85ursElDGQcd34quYZncSSGMP5FpYqhABsz6VL6btZPn_VT1mqH2WwHsM_0QGvvCr9HZ'
});

const app = express();
app.engine("ejs", engines.ejs);
app.set("views", "./views");
app.set("view engine", "ejs");
 
 
app.use( express.static( "public" ) );
require("dotenv").config();
// parse requests of content-type: application/json
app.use(bodyParser.json());

// parse requests of content-type: application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cors());

app.get("/payment", (req, res) => {
  res.render("paypal-view");
})

let money = 0;

app.get("/payment/paypal/:money/:name", (req, res) => {
  
   money =  req.params.money;
  let name = req.params.name;
  console.log("name: " + name);
  console.log("money: " + money);


  var create_payment_json = { 
    "intent": "sale", 
    "payer": {
        "payment_method": "paypal"
    },
    "redirect_urls": {
        "return_url": "http://still-wave-21655.herokuapp.com/payment/success",
        "cancel_url": "http://still-wave-21655.herokuapp.com/payment/cancel"
    },
    "transactions": [{
        "item_list": {
            "items": [{
                "name": name,
                "sku": "item",
                "price": money,
                "currency": "USD",
                "quantity": 1
            }]
        },

        "amount": {
            "currency": "USD",
            "total": money
        },
        "description": "Thank you for registration this service!"
    }]
};

paypal.payment.create(create_payment_json, function (error, payment) {
  if (error) {
    //   throw error;
    console.log(error.response);
    res.send("error");
  } else {
      console.log("Create Payment Response");
      console.log(payment);
      res.redirect(payment.links[1].href);
      // for(let i = 0;i < payment.links.length;i++){
      //   if(payment.links[i].rel === 'approval_url'){
      //     res.redirect(payment.links[i].href);
      //   }}
  }
});

})

app.get("/payment/success", (req, res) => {
  //res.send("Success");
  console.log("money success: " + money);
  var PayerID = req.query.PayerID;
    var paymentId = req.query.paymentId;
    var execute_payment_json = {
        payer_id: PayerID,
        transactions: [
            {
                amount: {
                    currency: "USD",
                    total: money
                }
            }
        ]
    };

    paypal.payment.execute(paymentId, execute_payment_json, function(
        error,
        payment
    ) {
        if (error) {
            console.log(error.response);
            res.send("error");
        } else {
            console.log("Get Payment Response");
            console.log(JSON.stringify(payment));
            res.render("success");
        }
    });
})

app.get("/payment/cancel", (req, res) => {
  res.send("Cancel");
})

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
