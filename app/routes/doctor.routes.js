module.exports = (app) => {
  const doctor = require("../controllers/doctor.controller.js");
  const cloudinary = require("../middleware/cloudinary");
  const Doctor = require("../models/doctor.model.js");

  const upload = require("../middleware/multer");
  // Retrieve all Doctors
  app.get("/doctor", doctor.findAll);

  // Retrieve Doctors
  app.get("/doctor/department/:department", doctor.filterDept);
  app.get("/doctor/find/:name", doctor.filterName);

  // Retrieve a single Doctor with doctorId
  app.get("/doctor/:doctorId", doctor.findOne);

  // Update a Doctor with doctorId
  app.put("/doctor/:doctorId", doctor.update);

  //update Image
  app.post(
    "/doctor/upload/:doctorId",
    upload.uploadImage.single("image"),
    async (req, res) => {
      try {
        cloudinary.uploader.upload(req.file.path).then((res) => {
          let doctor = new Doctor({
            id: req.params.doctorId,
            avatar: res.secure_url,
          });
          Doctor.updateAvatar(doctor, (err, data) => {
            if (err) {
              if (err.kind === "not_found") {
                res.status(404).json({
                  message: `Not found doctor with id ${req.params.doctorId}.`,
                  count: 0,
                  doctor: null,
                });
              } else {
                res.status(500).json({
                  message:
                    "Error updating doctor with id " + req.params.doctorId,
                  count: 0,
                  doctor: null,
                });
              }
            } else
              res.json({
                message: "Updated doctor success!",
                count: 1,
                doctor: doctor,
              });
          });
        });
      } catch (e) {
        console.log(e);
        res.status(404).json({
          message: e,
          count: 0,
          doctor: null,
        });
      }
    }
  );
};
