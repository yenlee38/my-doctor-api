module.exports = app =>{
    const heartBeat = require("../controllers/heart-beat.controller.js");
    const {requireSignin} = require("../controllers/account.controller.js")
    
    app.post("/heartBeat", requireSignin, heartBeat.create);
    app.put("/heartBeat/:heartBeatId/delete",requireSignin, heartBeat.delete);
    app.put("/heartBeat/delete/all",requireSignin, heartBeat.deleteAll);
    app.put("/heartBeat/:patientId/delete/patient", requireSignin, heartBeat.deleteAllByPatientId);
    app.put("/heartBeat/:heartBeatId",requireSignin, heartBeat.update)
    app.get("/heartBeat", heartBeat.findAll)
    app.get("/heartBeat/:heartBeatId", heartBeat.findOne)
    app.get("/heartBeat/:patientId/patient", requireSignin, heartBeat.findByPaitentId)
}