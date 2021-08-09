module.exports = app =>{
    const address = require("../controllers/address.controller.js");
    const {requireSignin} = require("../controllers/account.controller.js")
    app.post("/address", requireSignin, address.create);
}