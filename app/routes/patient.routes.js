module.exports = (app) => {
  const patient = require("../controllers/patient.controller.js");
  const upload = require("../middleware/multer");
  const Patient = require("../models/patient.model.js");
  const cloudinary = require("../middleware/cloudinary");


  app.get("/patient", patient.findAll);
  // Retrieve a single Patient with patientId
  app.get("/patient/:patientId", patient.findOne);

  // Update a Patient with patientId
  app.put("/patient/:patientId", patient.update);

  //update Image
  app.post("/patient/:patientId", upload.uploadImage.single("image"), async (req, res) =>{
  try{
      const result = await cloudinary.uploader.upload(req.file.path);
      let patient = new Patient({
        id: req.params.patientId,
        avatar:result.secure_url,       
      })

       Patient.updateAvatar(patient, (err, data) =>{
        if (err) {
        if (err.kind === "not_found") {
          res.status(404).json({
            message: `Not found Patient with id ${req.params.patientId}.`,
            count: 0,
          patient: null
          });
        } else {
          res.status(500).json({
            message: "Error updating Patient with id " + req.params.patientId,
            count: 0,
          patient: null
          });
        }
      }
      else res.json({
        message: "Updated patient success!",
        count: 1,
        patient:  new Patient(req.body)
      });
      }) 
      }catch(e){
         console.log(e);
         res.status(404).json({
            message: e,
            count: 0,
          patient: null
          });
      }

});
};
