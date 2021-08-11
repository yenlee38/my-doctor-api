module.exports = app =>{
    const emotion = require("../controllers/emotion.controller.js");
    const {requireSignin} = require("../controllers/account.controller.js")
    
    app.post("/emotion", requireSignin, emotion.create);
    app.put("/emotion/:emotionId/delete",requireSignin, emotion.delete);
    app.put("/emotion/delete/all",requireSignin, emotion.deleteAll);
    app.put("/emotion/:patientId/delete/patient", requireSignin, emotion.deleteAllByPatientId);
    app.put("/emotion/:emotionId",requireSignin, emotion.update)
    app.get("/emotion", emotion.findAll)
    app.get("/emotion/:emotionId", emotion.findOne)
    app.get("/emotion/:patientId/patient", requireSignin, emotion.findByPaitentId)
}