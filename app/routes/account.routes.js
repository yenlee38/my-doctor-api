module.exports = app => {
    const accounts = require("../controllers/account.controller.js");

    app.post("/accounts", accounts.create);
    app.get("/accounts/signin", accounts.signin);
    app.get("/accounts/signout", accounts.signout);
}