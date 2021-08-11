module.exports = app =>{
    const address = require("../controllers/address.controller.js");
    const {requireSignin} = require("../controllers/account.controller.js")
    app.post("/address", requireSignin, address.create);
    app.put("/address/:addressId/delete",requireSignin, address.delete);
    app.put("/address/delete/all",requireSignin, address.deleteAll);
    app.put("/address/:patientId/delete/patient", requireSignin, address.deleteAllByPatientId);
    app.put("/address/:addressId",requireSignin, address.update)
    app.get("/address", address.findAll)
    app.get("/address/:addressId", address.findOne)
    app.get("/address/:patientId/patient", requireSignin, address.findByPaitentId)
}