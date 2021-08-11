const BMI = require("../models/bmi.model.js")

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
        res.status(404).send({
            message: "Content can not be empty!"
        })
    }

    const bmi = new BMI ({
        patientId: req.body.patientId,
        createdAt: new Date(),
        updatedAt: new Date(),
        isHidden: false,
        tall: req.body.tall,
        weigh: req.body.weigh,
        bmi: (req.body.weigh)/(2*0.01*req.body.tall)
    })

    BMI.create(bmi, (err, data) =>{
        if(err){
            res.status(500).send({
                message: err.message || "Some error occurred while creating the BMI"
            })
        }else res.send(data);
    });
}

exports.findAll = (req, res) =>{
    console.log("getAll")
    BMI.getAll((err, data) =>{
        if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving BMI."
        });
      else res.send(data);  
    })
}

exports.findOne = (req, res) =>{
    console.log("id")
    BMI.findById(req.params.bmiId, (err, data) => {
        if (err) {
          if (err.kind === "not_found") {
            res.status(404).send({
              message: `Not found BMI with id ${req.params.bmiId}.`
            });
          } else {
            res.status(500).send({
              message: "Error retrieving BMI with id " + req.params.bmiId
            });
          }
        } else res.send(data);
      });
}

exports.findByPaitentId = (req, res) => {
    console.log("patient")
    BMI.findByPatientId(req.params.patientId, (err, data) =>{
        if(err){
            if(err.kind === "not_found"){
                res.status(404).send({
                    message: `Not found BMI with patient id: ${req.params.patientId}`
                })
            }else {
                res.status(500).send({
                    message: "Error retrieving BMI with patient id: " + req.params.patientId
                })
            }
        }else res.send(data);
    })
}

exports.delete = (req, res) =>{
    BMI.remove(req.params.bmiId, (err, data) =>{
        if(err){
            if(err.kind === "not_found"){
                res.status(404).send({
                    message: "Not found BMI with id " + req.params.bmiId
                })
            }else res.status(500).send({
                message: "Could not delete BMI with id " + req.params.bmiId
            })
        }else res.send({
            message: 'BMI was delete'
        })
    })
}

exports.deleteAll = (req, res) =>{
    BMI.removeAll((err, data) =>{
        if(err){
            res.status(500).send({
              message: 
              err.message || "Some error occurred while removing all BMI."
            })
          }else res.send({message: `All BMI were deleted successfully !`})
        })
}
exports.update = (req, res) =>{
    if(!req.body){
        res.status(400).send({
            message: "Content can not be empty!"
        })
    }

    BMI.updateById(req.params.bmiId, new BMI(req.body), (err, data) =>{
        if (err) {
            if (err.kind === "not_found") {
              res.status(404).send({
                message: `Not found BMI with id ${req.params.bmiId}.`
              });
            } else {
              res.status(500).send({
                message: "Error updating BMI with id " + req.params.bmiId
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
  
      BMI.removeAllByPatientId(req.params.patientId, (err, data) =>{
        if(err){
          if (err.kind === "not_found") {
            res.status(404).send({
              message: `Not found BMI with patientId ${req.params.patientId}.`
            });
          } else {
            res.status(500).send({
              message: "Error updating BMI with id " + req.params.patientId
            });
        }}
        else res.send({message:`BMI was deleted successfully !`})
      })
}
