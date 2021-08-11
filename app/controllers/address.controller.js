const Address = require("../models/address.model.js");

exports.create = (req, res) => {}
exports.findAll = (req, res) =>{}
exports.findOne = (req, res) =>{}
exports.findByPaitentId = (req, res) => {}
exports.delete = (req, res) =>{}
exports.deleteAll = (req, res) =>{}
exports.update = (req, res) =>{}
exports.deleteAllByPatientId = (req, res) =>{}
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
        updatedAt: new Date(),
        isHidden: false
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
    Address.findById(req.params.addressId, (err, data) => {
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
    Address.findByPatientId(req.params.patientId, (err, data) => {
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

  exports.delete = (req, res) =>{
    console.log("remove")
    Address.remove(req.params.addressId, (err, data) => {
      if(err){
        if(err.kind === "not_found"){
          res.status(404).send({
            message: `Not found Address with id ${req.params.addressId}.`
          })
        }else {
          res.status(500).send({
            message: `Could not delete Address with id ` + req.params.addressId
          })
        }
      }else res.send({message:`Address was deleted successfully !`})
    })
  }

  exports.deleteAll = (req, res) =>{
    Address.removeAll((err, data) =>{
      if(err){
        res.status(500).send({
          message: 
          err.message || "Some error occurred while removing all address."
        })
      }else res.send({message: `All address were deleted successfully !`})
    })
  }

  exports.update = (req, res) =>{
    if(!req.body){
      res.status(400).send({
        message:"Content cannot be empty!"
      })
    }
    Address.updateById(req.params.addressId, new Address(req.body), (err, data) =>{
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Address with id ${req.params.addressId}.`
          });
        } else {
          res.status(500).send({
            message: "Error updating Address with id " + req.params.addressId
          });
        }
      } else res.send(data);
    })
  }


  exports.deleteAllByPatientId = (req, res) =>{
    if(!req.body){
      res.status(400).send({
        message:"Content cannot be empty!"
      })
    }

    Address.removeAllByPatientId(req.params.patientId, (err, data) =>{
      if(err){
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Address with patientId ${req.params.patientId}.`
          });
        } else {
          res.status(500).send({
            message: "Error updating Address with id " + req.params.patientId
          });
      }}
      else res.send({message:`Address was deleted successfully !`})
    })
  }

  
