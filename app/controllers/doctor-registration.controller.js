const DoctorRegistration = require("../models/doctor-registration.model.js");
const { v4: uuidv4 } = require("uuid");

exports.create = (req, res) => {
    if (!req.body) {
      res.status(400).json({
        message: "Content can not be empty!",
      });
      return;
    }
    const doctorRegistration = new DoctorRegistration({
      id: uuidv4(),
      name: req.body.name,
      serviceId: req.body.serviceId,
      doctorId: req.body.doctorId,
      status: req.body.status,
      isHidden: false,
      patientId: req.body.patientId,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    DoctorRegistration.create(doctorRegistration, (err, data) =>{
        if(err){
            res.status(500).json({
                message: err.message || "Some thing was wrong when created DoctorRegistration",
                doctorRegistration: null,
                count: 0
            })
        }
        
        res.json({
            message:"Created DoctorRegistration success!",
            count:1,
            doctorRegistration:doctorRegistration
        });

    })
}

exports.findById = (req, res) => {
    DoctorRegistration.findById(req.params.id, (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).json({
            message: `Not found DoctorRegistration with id ${req.params.id}.`,
            doctorRegistration: null,
            count: 0,
          });
        } else {
          res.status(500).json({
            message: "Error retrieving DoctorRegistration with id " + req.params.id,
            doctorRegistration: null,
            count: 0,
          });
        }
      } else
        res.json({
          message: "Find list DoctorRegistration by id!",
          count: data.length,
          doctorRegistration: data,
        });
    });
  };


exports.getAll = (req, res) => {
DoctorRegistration.getAll((err, data) =>{
    if (err)
    res.status(500).json({
        message:
        err.message || "Some error occurred while retrieving DoctorRegistration.",
        doctorRegistration: null,
        count: 0
    });
    else res.json({
    message: "Get list DoctorRegistration",
    count: data.length,
    doctorRegistration: data
    });  
})
}

exports.findByPatientId = (req, res) => {
    DoctorRegistration.getByPatientId (req.params.patientId, (err, data) => {
        if(err){
            if(err.kind == "not_found"){
                res.status(404).json({
                    message: "Not found DoctorRegistration by patient id: " + req.params.patientId,
                    doctorRegistration: null,
                    count: 0
                })
            }else res.status(500).json({
             message: err.message  || "Some thing was wrong when find by patient id: " + req.params.patientId,
             doctorRegistration: null,
             count: 0
            })
        }

        res.json({
            message:"Find DoctorRegistration by patient id!",
            count:data.length,
            doctorRegistration: data
        });
    })
}