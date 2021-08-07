const Account = require("../models/account.model.js");

exports.create = (req, res) => {

}

exports.create = (req, res) => {
    // Validate request
    if (!req.body) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
    }
  
    // Create a Account
    const account = new Account({
      username: req.body.username,
      password: req.body.password,
      role: req.body.role
    });
  
    // Save Customer in the database
    Account.create(account, (err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the Customer."
        });
      else res.send(data);
    });
  };


