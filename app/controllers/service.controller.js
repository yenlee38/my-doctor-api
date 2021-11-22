const Service = require("../models/service.model.js");
const { v4: uuidv4 } = require("uuid");

const Service = function(service) {
    this.id = service.id;
    this.description = service.description;
    this.name = service.name;
    this.doctorId = service.doctorId;
    this.price = service.price;
    this.duration = service.duration;
    this.isHidden = service.isHidden;
    this.createdAt = service.createdAt;
    this.updatedAt = service.updatedAt;
}


exports.create = (req, res) => {

    if (!req.body) {
        res.status(400).json({
          message: "Content can not be empty!",
        });
        return;
      }

    const service = new Service({
        id: uuidv4(),
        name: req.body.name,
        description: req.body.description,
        doctorId: req.body.doctorId,
        price: req.body.price,
        duration: req.body.duration,
        isHidden: false,
        createdAt: new Date(),
        updatedAt: new Date(),
    })

    
    Service.create(service, (err, data) =>{
        if(err){
            res.status(500).json({
                message: err.message || "Some error occurred while creating the Service",
                bmi: null,
                count: 0
            })
        }else res.json(
          {
            message:"Created Service success!",
            count:1,
            service: service
          }
        );
    });
    
}

exports.findByDoctorId = (req, res) => {
    Service.getByDoctorId (req.params.doctorId, (err, data) => {
        if(err){
            if(err.kind == "not_found"){
                res.status(404).json({
                    message: "Not found Service by doctorId: " + req.params.doctorId,
                    service: null,
                    count: 0
                })
            }else res.status(500).json({
             message: err.message  || "Some thing was wrong when find by doctorId: " + req.params.doctorId,
             service: null,
             count: 0
            })
        }

        res.json({
            message:"Find service by doctor id!",
            count:data.length,
            service:data
        });
    })
}

exports.getAll = (req, res) => {
    Service.getAll((err, data) =>{
        if (err)
        res.status(500).json({
          message:
            err.message || "Some error occurred while retrieving Service.",
            service: null,
            count: 0
        });
      else res.json({
        message: "Get list Service",
        count: data.length,
        service: data
      });  
    })
}

exports.findById = (req, res) => {
    Service.getById(req.params.id, (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).json({
            message: `Not found Service with id ${req.params.id}.`,
            service: null,
            count: 0,
          });
        } else {
          res.status(500).json({
            message: "Error retrieving Service with id " + req.params.id,
            service: null,
            count: 0,
          });
        }
      } else
        res.json({
          message: "Find list service by id!",
          count: data.length,
          service: data,
        });
    });
  };