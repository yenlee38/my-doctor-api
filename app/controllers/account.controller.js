const Account = require("../models/account.model.js");
const jwt = require('jsonwebtoken');
const expressJwt = require('express-jwt');
const types = require("../types/index.js");
const crypto = require("crypto")
const { v1: uuidv1 } = require('uuid');
exports.create = (req, res) => {

}

exports.signin = (req, res) => {

}

exports.signout = (req, res) => {

}

exports.findAll = (req, res) =>{}

exports.create = (req, res) => {
    // Validate request
    if (!req.body) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
    }
    let salt = uuidv1();
    // Create a Account
    const account = new Account({
      username: req.body.username,
      salt: salt,
      password:  Account.hashPassword(req.body.password, salt),
      role: req.body.role,
      createdAt: new Date(),
      updatedAt: new Date(),
      isHidden: false
    });
  
    // Save Acccount in the database
    Account.create(account, (err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the Account."
        });
      else res.send(data);
    });
  };

exports.signin = (req, res) =>{
   // Validate request
   if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  Account.getSalt(req.body.username, (err, data) =>{
    let salt = data;
    if(salt != ""){
      // Get a Account
    const account = new Account({
      username: req.body.username,
      password: Account.hashPassword(req.body.password, salt),
      role: req.body.role,
  
    });
  
    console.log("goto" + account.salt + " " + account.password)
    Account.signin(account.username, account.password, (err, data) =>{
      if(err){
        if(err.kind === "not_found"){
          res.status(404).send({
            message: `Can not sign in with username: ${account.username}`
          });
        }else {
          res.status(500).send({
            message: "Error retrieving Account with username " + account.username
          });
        }
      } else {
        //create authenticate method in account model
  
        //generate a signed token with username and secret
  
        const token = jwt.sign({_id: data._id}, process.env.JWT_SECRET);
        // persist the token as 't' in cookie with expiry date
        res.cookie ('t', token, {expire: new Date() + 86400})
        const account = data;
        return res.send ({token, account: data});}
    })
    }else{
      res.status(404).send({
        message: `Can not sign in with username: ${account.username}`
      });
    }
  })

 
  
}

exports.signout  = (req, res) => {
  res.clearCookie("t");
  res.send({message: "Signout success"});
}

exports.requireSignin = expressJwt({
  secret: process.env.JWT_SECRET,
  userProperty: "auth",
  algorithms: ['sha1', 'RS256', 'HS256']
})

exports.isAuth = (req, res, next) => {
  let user = req.account && req.auth && req.acount.id == req.auth.id;
  if(!user){
    return res.status(403).json({
      error: "Access denied"
    });
  }
  next();
}

exports.isAdmin = (req, res, next) => {
  if(req.account.role === types.ROLES.PATIENT){
    return res.status(403).json({
      error: "Admin resourse! Access denied "
    })
  }
  next();
}

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

Account.hashPassword = (password, salt) =>{
  if(!password) return '';
  try{
    return crypto.createHmac('sha1', salt)
            .update(password)
            .digest('hex')
  }catch (err){
    return '';
  }
}

exports.findAll = (req, res) =>{
  Account.getAll((err, data) =>{
    if(err){
      res.status(500).send({
        message: err.message || "Some thing was wrong when get all Account"
      })
    }
  })
}

