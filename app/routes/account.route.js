module.exports = app => {
    const accounts = require("../controllers/account.controller.js");

    app.post("/accounts", accounts.create);
}