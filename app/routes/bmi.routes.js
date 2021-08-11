module.exports = app =>{
    const bmi = require("../controllers/bmi.controller.js");
    const {requireSignin} = require("../controllers/account.controller.js")
    
    app.post("/bmi", requireSignin, bmi.create);
    app.put("/bmi/:bmiId/delete",requireSignin, bmi.delete);
    app.put("/bmi/delete/all",requireSignin, bmi.deleteAll);
    app.put("/bmi/:patientId/delete/patient", requireSignin, bmi.deleteAllByPatientId);
    app.put("/bmi/:bmiId",requireSignin, bmi.update);
    app.get("/bmi/:bmiId", bmi.findOne);
    app.get("/bmi/:patientId/patient", requireSignin, bmi.findByPaitentId);
    app.get("/bmi", bmi.findAll);
}