module.exports = (app) => {
  const accounts = require("../controllers/account.controller.js");
  const { requireSignin } = require("../controllers/account.controller.js");
  app.post("/accounts", accounts.signup);
  app.post("/accounts/signin", accounts.signin);
  app.get("/accounts/signout", accounts.signout);

  app.get("/accounts", requireSignin, accounts.findAll);
  app.get("/accounts/:accountId", requireSignin, accounts.findById);
  app.get("/accounts/:username/username", accounts.exist);
  app.get("/accounts/getAll/admin", accounts.findAllByAdmin);

  app.put("/accounts/forgotPass", accounts.forgotPass);
  app.put("/accounts/disable/:accountId", accounts.disable);
  app.put("/accounts/:accountId/changePass", accounts.changePass);
};
