const Account = require("../models/account.model.js");
<<<<<<< Updated upstream
const jwt = require('jsonwebtoken');
const expressJwt = require('express-jwt');

exports.create = (req, res) => {

}
=======
const jwt = require("jsonwebtoken");
const expressJwt = require("express-jwt");
exports.create = (req, res) => {};
>>>>>>> Stashed changes

exports.signin = (req, res) => {};

exports.signout = (req, res) => {};

exports.requireSignin = (req, res) => {};

exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
  }

  // Create a Account
  const account = new Account({
    username: req.body.username,
    password: req.body.password,
    role: req.body.role,
  });

  // Save Acccount in the database
  Account.create(account, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Account.",
      });
    else res.send(data);
  });
};

exports.signin = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
  }

  // Get a Account
  const account = new Account({
    username: req.body.username,
    password: req.body.password,
    role: req.body.role,
  });

  Account.signin(account.username, account.password, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status.send({
          message: "Can not sign in with username: ${account.username}",
        });
      } else {
        res.status(500).send({
          message: "Error retrieving Account with username " + account.username,
        });
      }
    } else {
      //create authenticate method in account model

      //generate a signed token with username and secret

      const token = jwt.sign({ _id: data._id }, process.env.JWT_SECRET);
      // persist the token as 't' in cookie with expiry date
      res.cookie("t", token, { expire: new Date() + 9999 });
      const account = data;
      return res.send({ token, account: data });
    }
  });
};

exports.signout = (req, res) => {
  res.clearCookie("t");
  res.send({ message: "Signout success" });
};

// exports.requireSignin = expressJwt({
//   secret: process.env.JWT_SECRET,
//   userProperty: "auth"
// })

exports.updatePassword = (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
  }

  Account.updatePasswordByUsername(
    req.params.username,
    new Account(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Account with username ${req.params.accountId}.`,
          });
        } else {
          res.status(500).send({
            message:
              "Error updating Account with username " + req.params.accountId,
          });
        }
      } else res.send(data);
    }
  );
};

exports.disable = (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
  }

  Account.disableById(
    req.params.accountId,
    new Account(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Account with id ${req.params.accountId}.`,
          });
        } else {
          res.status(500).send({
            message: "Error updating Account with id " + req.params.accountId,
          });
        }
      } else res.send(data);
    }
  );
};
