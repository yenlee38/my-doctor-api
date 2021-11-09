const Account = require("../models/account.model.js");
const jwt = require("jsonwebtoken");
const expressJwt = require("express-jwt");
const types = require("../types/index.js");
const crypto = require("crypto");
const { v1: uuidv1 } = require("uuid");
const { v4: uuidv4 } = require("uuid");

exports.signup = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
  }
  let salt = uuidv1();

  // Create a Account
  const account = new Account({
    id: uuidv4(),
    username: req.body.username,
    salt: salt,
    password: Account.hashPassword(req.body.password, salt),
    role: req.body.role,
    createdAt: new Date(),
    updatedAt: new Date(),
    isHidden: false,
  });

  // Save Acccount in the database
  Account.signup(account, (err, data) => {
    if (err)
      res.status(500).json({
        message:
          err.message || "Some error occurred while creating the Account.",
        count: 0,
        account: null,
      });
    else {
      const token = jwt.sign({ _id: data._id }, process.env.JWT_SECRET);
      // persist the token as 't' in cookie with expiry date
      res.cookie("t", token, { expire: new Date() + 86400 });
      return res.json({
        token: token,
        count: 1,
        message: "Sign up success!",
        account: data,
      });
    }
  });
};

exports.signin = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).json({
      message: "Content can not be empty!",
      count: 0,
      account: null,
    });
    return;
  }

  Account.getSalt(req.body.username, (err, data) => {
    let salt = data;
    if (salt != "") {
      // Get a Account
      const account = new Account({
        username: req.body.username,
        password: Account.hashPassword(req.body.password, salt),
        role: req.body.role,
      });

      Account.signin(account.username, account.password, (err, data) => {
        if (err) {
          if (err.kind === "not_found") {
            res.status(404).json({
              message: `Can not sign in with username: ${account.username}`,
              count: 0,
              account: null,
            });
          } else {
            res.status(500).json({
              message:
                "Error retrieving Account with username " + account.username,
              count: 0,
              account: null,
            });
          }
          return;
        } else {
          //create authenticate method in account model

          //generate a signed token with username and secret

          const token = jwt.sign({ _id: data._id }, process.env.JWT_SECRET);
          // persist the token as 't' in cookie with expiry date
          res.cookie("t", token, { expire: new Date() + 86400 });
          const account = data;
          return res.json({
            token: token,
            count: 1,
            message: "Sign in success!",
            account: data,
          });
        }
      });
    } else {
      res.status(404).send({
        message: `Can not found account with username: ${req.body.username}`,
      });
    }
  });
};

exports.signout = (req, res) => {
  res.clearCookie("t");
  res.send({ message: "Signout success" });
};

exports.requireSignin = expressJwt({
  secret: process.env.JWT_SECRET,
  userProperty: "auth",
  algorithms: ["sha1", "RS256", "HS256"],
});

exports.isAuth = (req, res, next) => {
  let user = req.account && req.auth && req.acount.id == req.auth.id;
  if (!user) {
    return res.status(403).json({
      error: "Access denied",
    });
  }
  next();
};

exports.isAdmin = (req, res, next) => {
  if (req.account.role === types.ROLES.PATIENT) {
    return res.status(403).json({
      error: "Admin resourse! Access denied ",
    });
  }
  next();
};

exports.forgotPass = (req, res) => {
  if (!req.body) {
    res.status(400).json({
      message: "Content can not be empty!",
      count: 0,
      account: null,
    });
  }

  Account.getSalt(req.body.username, (err, data) => {
    let salt = data;
    if (salt != "") {
      // Get a Account
      const account = new Account({
        username: req.body.username,
        password: Account.hashPassword(req.body.password, salt),
      });

      Account.forgotPass(account, (err, data) => {
        if (err) {
          if (err.kind === "not_found") {
            res.status(404).json({
              message: `Not found Account with username ${req.body.username}.`,
            });
          } else {
            res.status(500).json({
              message:
                "Error updating Account with username " + req.body.username,
            });
          }
        } else res.json({ message: "Forgot password success!" });
      });
    }
  });
};

exports.disable = (req, res) => {
  if (!req.body) {
    res.status(400).json({
      message: "Content can not be empty!",
      count: 0,
      account: null,
    });
    return;
  }

  Account.disableById(
    req.params.accountId,
    new Account(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).json({
            message: `Not found Account with id ${req.params.accountId}.`,
            count: 0,
            account: null,
          });
        } else {
          res.status(500).json({
            message: "Error updating Account with id " + req.params.accountId,
            count: 0,
            account: null,
          });
        }
      } else
        res.json({
          count: 1,
          message: "Disable account success!",
          account: data,
        });
      return;
    }
  );
};

Account.hashPassword = (password, salt) => {
  if (!password) return "";
  try {
    return crypto.createHmac("sha1", salt).update(password).digest("hex");
  } catch (err) {
    return "";
  }
};

exports.findAll = (req, res) => {
  Account.getAll((err, data) => {
    if (err) {
      res.status(500).json({
        message: err.message || "Some thing was wrong when get all Account",
        count: 0,
        account: null,
      });
      return;
    }

    res.json({
      count: data.length,
      message: "List Account !",
      account: data,
    });
  });
};

exports.findById = (req, res) => {
  Account.getById(req.params.accountId, (err, data) => {
    if (err) {
      if (err.kind == "not_found")
        res.status(404).json({
          message: "Not found Account by id " + req.params.accountId,
          count: 0,
          account: null,
        });
      else
        res.status(500).json({
          message:
            err.message ||
            "Some thing was wrong when find Account by id " +
              req.params.accountId,
          count: 0,
          account: null,
        });
      return;
    }

    res.json({ account: data, message: "Account find by id!", count: 1 });
  });
};

exports.exist = (req, res) => {
  Account.getSalt(req.params.username, (err, data) => {
    if (err) {
      if (err.kind == "not_found")
        res.status(404).json({
          message: "Not found Account by username " + req.params.username,
          count: 0,
        });
      else
        res.status(500).json({
          message:
            err.message ||
            "Some thing was wrong when find Account by username " +
              req.params.username,
          count: 0,
        });
      return;
    }

    res.json({
      message: "Account find by username!",
      count: 1,
    });
  });
};

exports.changePass = (req, res) => {
  if (!req.body) {
    res.status(400).json({
      message: "Content can not be empty!",
      count: 0,
      account: null,
    });
    return;
  }

  Account.getSalt(req.body.username, (err, data) => {
    let salt = data;
    if (salt != "") {
      const account = new Account({
        id: req.params.accountId,
        password: Account.hashPassword(req.body.oldPass, salt),
      });

      Account.changePass(
        Account.hashPassword(req.body.newPass, salt),
        account,
        (err, data) => {
          if (err) {
            if (err.kind == "not_found") {
              res.status(404).json({
                message: "Not found account by id: " + account.id,
              });
            } else {
              res.status(500).json({
                message:
                  err.message ||
                  "Some thing was wrong when find Account by id " + account.id,
              });
            }
          }
          res.status(200).json({ message: "Change password success!" });
        }
      );
    }
  });
};
