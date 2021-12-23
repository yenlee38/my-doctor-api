module.exports = (app) => {
    const message = require("../controllers/message.controller.js");
    const {requireSignin} = require("../controllers/account.controller.js")
    
    app.get("/message",requireSignin, message.findAll);
    app.post("/message", requireSignin, message.create);
    app.get("/message/sender/:senderId", requireSignin, message.findBySenderId);
    app.get("/message/:recieverId", requireSignin, message.findByRecieverId);
  };
  