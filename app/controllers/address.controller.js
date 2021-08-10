const Address = require("../models/address.model.js");

exports.create = (req, res) => {}
exports.findAll = (req, res) =>{}
exports.findOne = (req, res) =>{}
exports.findByPaitentId = (req, res) => {}
exports.create = (req, res) => {
    if(!req.body){
        res.status(400).send({
            message: "Content can not be empty"
        });
    };

    const address = new Address({
        patientId: req.body.patientId,
        name: req.body.name,
        isDefault: false,
        createdAt: new Date(),
        updatedAt: new Date()
    });

    Address.create(address, (err, data) =>{
        if(err){
            res.status(500).send({
                message: err.message || "Some error occurred while creating the Address."
            })
        }
        else res.send(data);
    })
}

exports.findAll = (req, res) =>{
    Address.getAll((err, data) =>{
        if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving address."
        });
      else res.send(data);  
    })
}

exports.findOne = (req, res) => {
    Customer.findById(req.params.addressId, (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Address with id ${req.params.addressId}.`
          });
        } else {
          res.status(500).send({
            message: "Error retrieving Address with id " + req.params.addressId
          });
        }
      } else res.send(data);
    });
  };

  exports.findByPaitentId = (req, res) => {
    Customer.findById(req.params.patientId, (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Address with patientId ${req.params.patientId}.`
          });
        } else {
          res.status(500).send({
            message: "Error retrieving Address with patientId " + req.params.patientId
          });
        }
      } else res.send(data);
    });
  };

  
