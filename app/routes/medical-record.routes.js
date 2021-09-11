module.exports = (app) =>{
    const medicalRecord = require('../controllers/medical-record.controller')
    const multer = require("../middleware/multer");
    const MedicalRecord = require("../models/medical-record.model");
    const cloudinary = require("../middleware/cloudinary");

    app.post("/medical-record", medicalRecord.create);
    app.post('/medical-record/:medicalRecordId/upload-file',multer.upload.single("file"), async (req, res) =>{
        try{
            const result = await cloudinary.uploader.upload(req.file.path); 
            console.log("hear")
        const medicalRecord = new MedicalRecord({
            id: req.params.medicalRecordId,
            fileStore: result.secure_url
        })
        
        MedicalRecord.uploadRecordFile(medicalRecord, (err, data) =>{
            if (err) {
                if (err.kind === "not_found") {
                  res.status(404).json({
                    message: `Not found MedicalRecord with id ${medicalRecord.id}.`,
                    count: 0,
                  medicalRecord: null
                  });
                } else {
                  res.status(500).json({
                    message:err.message || "Error updating MedicalRecord with id " + medicalRecord.id,
                    count: 0,
                  medicalRecord: null
                  });
                }
              }
              else res.json({
                message: "Updated MedicalRecord success!",
                count: 1,
                medicalRecord:  data
              });
        })
    
        }catch(err){
           res.status(500).json({
            message:err.message,
            count: 0,
            medicalRecord: null
        });
    }

});
};