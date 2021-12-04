const Address = require("../models/address.model.js");
const {v4: uuidv4} = require('uuid');

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
        res.status(400).json({
            message: "Content can not be empty"
        });
        return;
    };

    const address = new Address({
        id: uuidv4(),
        patientId: req.body.patientId,
        name: req.body.name,
        isDefault: false,
        createdAt: new Date(),
        updatedAt: new Date(),
        isHidden: false
    });

    Address.create(address, (err, data) =>{
        if(err){
            res.status(500).json({
                message: err.message || "Some error occurred while creating the Address.",
                address: null,
                count: 0
            })
        }
        else res.json(
          {
            message:"Created address!",
            count:1,
            address: address
          }
        );
    })
}

exports.findAll = (req, res) =>{
    Address.getAll((err, data) =>{
        if (err)
        res.status(500).json({
          message:
            err.message || "Some error occurred while retrieving address.",
            address: null,
            count: 0
        });
      else res.json({
        count: 1,
        message: "List all address!",
        address: data
      });  
    })
}

exports.findOne = (req, res) => {
    Address.findById(req.params.addressId, (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).json({
            message: `Not found Address with id ${req.params.addressId}.`,
            address: null,
            count: 0
          });
        } else {
          res.status(500).json({
            message: "Error retrieving Address with id " + req.params.addressId,
            address: null,
            count: 0
          });
        }
      } else res.json({
        message: "Find address!",
        count: 1,
        address: data
      });
    });
  };

  exports.findByPaitentId = (req, res) => {
    Address.findByPatientId(req.params.patientId, (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).json({
            message: `Not found Address with patientId ${req.params.patientId}.`,
            address: null,
            count: 0
          });
        } else {
          res.status(500).json({
            message: "Error retrieving Address with patientId " + req.params.patientId,
            address: null,
            count: 0
          });
        }
      } else res.json({
        count: 1,
        message: "List all address by patient!",
        address: data
      });  
    })
    
  };

  exports.delete = (req, res) =>{
    console.log("remove")
    Address.remove(req.params.addressId, (err, data) => {
      if(err){
        if(err.kind === "not_found"){
          res.status(404).json({
            message: `Not found Address with id ${req.params.addressId}.`,
            address: null,
            count: 0
          })
        }else {
          res.status(500).json({
            message: `Could not delete Address with id ` + req.params.addressId,
            address: null,
            count: 0
          })
        }
      }else res.json({message:`Address was deleted successfully !`, count:1})
    })
  }

  exports.deleteAll = (req, res) =>{
    Address.removeAll((err, data) =>{
      if(err){
        res.status(500).json({
          message: 
          err.message || "Some error occurred while removing all address.",
          address: null,
          count: 0
        })
      }else res.json({message: `All address were deleted successfully !`, count:1})
    })
  }

  exports.update = (req, res) =>{
    if(!req.body){
      res.status(400).json({
        message:"Content cannot be empty!",
        address: null,
        count: 0
      })
      return;
    }
    Address.updateById(req.params.addressId, new Address(req.body), (err, data) =>{
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).json({
            message: `Not found Address with id ${req.params.addressId}.`,
            address: null,
            count: 0
          });
        } else {
          res.status(500).json({
            message: "Error updating Address with id " + req.params.addressId,
            address: null,
            count: 0
          });
        }
      } else res.json({
        message: "Updated success!",
        count:1,
        address: req.body
      });
    })
  }


  exports.deleteAllByPatientId = (req, res) =>{
    if(!req.body){
      res.status(400).json({
        message:"Content cannot be empty!",
        address: null,
        count: 0
      })
      return;
    }

    Address.removeAllByPatientId(req.params.patientId, (err, data) =>{
      if(err){
        if (err.kind === "not_found") {
          res.status(404).json({
            message: `Not found Address with patientId ${req.params.patientId}.`,
            address: null,
            count: 0
          });
        } else {
          res.status(500).json({
            message: "Error updating Address with id " + req.params.patientId,
            address: null,
            count: 0
          });
      }}
      else res.json({message:`Address was deleted successfully !`})
    })
  }

  
