module.exports = (app) => {
  const accounts = require("../controllers/account.controller.js");
  const {requireSignin} = require("../controllers/account.controller.js")
  app.post("/accounts", accounts.create);
  app.get("/accounts/signin", accounts.signin);
  app.get("/accounts/signout", accounts.signout);

  // Update a Account with accountId
  app.put("/accounts/forgotPass/:username", accounts.updatePassword);
  app.put("/accounts/disable/:accountId", accounts.disable);
  app.get("/accounts",requireSignin, accounts.findAll);
  app.get("/accounts/:accountId",requireSignin, accounts.findById);
  app.get("/accounts/:username/username", accounts.exist)
};
