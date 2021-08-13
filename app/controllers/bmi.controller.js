const BMI = require("../models/bmi.model.js")
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
            message: "Content can not be empty!"
        })
    }

    const bmi = new BMI ({
        id: uuidv4(),
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
            res.status(500).json({
                message: err.message || "Some error occurred while creating the BMI",
                bmi: null,
                count: 0
            })
        }else res.json(
          {
            message:"Created BMI success!",
            count:1,
            bmi: bmi
          }
        );
    });
}

exports.findAll = (req, res) =>{
    BMI.getAll((err, data) =>{
        if (err)
        res.status(500).json({
          message:
            err.message || "Some error occurred while retrieving BMI.",
            bmi: null,
            count: 0
        });
      else res.json({
        message: "Get list BMI",
        count: data.length,
        bmi: data
      });  
    })
}

exports.findOne = (req, res) =>{
    BMI.findById(req.params.bmiId, (err, data) => {
        if (err) {
          if (err.kind === "not_found") {
            res.status(404).json({
              message: `Not found BMI with id ${req.params.bmiId}.`,
              bmi: null,
              count: 0
            });
          } else {
            res.status(500).json({
              message: "Error retrieving BMI with id " + req.params.bmiId,
              bmi: null,
              count: 0
            });
          }
        } else res.json({
          message: "Find BMI by id!",
          count: 1,
          bmi: data
        });
      });
}

exports.findByPaitentId = (req, res) => {
    BMI.findByPatientId(req.params.patientId, (err, data) =>{
        if(err){
            if(err.kind === "not_found"){
                res.status(404).json({
                    message: `Not found BMI with patient id: ${req.params.patientId}`,
                    bmi: null,
                    count: 0
                })
            }else {
                res.status(500).json({
                    message: "Error retrieving BMI with patient id: " + req.params.patientId,
                    bmi: null,
                    count: 0
                })
            }
        }else res.json({
          message: "Find BMI by patient!",
          count: data.length,
          bmi: data
        });
    })
}

exports.delete = (req, res) =>{
    BMI.remove(req.params.bmiId, (err, data) =>{
        if(err){
            if(err.kind === "not_found"){
                res.status(404).json({
                    message: "Not found BMI with id " + req.params.bmiId,
                    bmi: null,
                    count: 0
                })
            }else res.status(500).json({
                message: "Could not delete BMI with id " + req.params.bmiId,
                bmi: null,
                count: 0
            })
        }else res.json({
            message: 'BMI was delete', count:1
        })
    })
}

exports.deleteAll = (req, res) =>{
    BMI.removeAll((err, data) =>{
        if(err){
            res.status(500).json({
              message: 
              err.message || "Some error occurred while removing all BMI.",
              bmi: null,
              count: 0
            })
          }else res.json({message: `All BMI were deleted successfully !`})
        })
}
exports.update = (req, res) =>{
    if(!req.body){
        res.status(400).json({
            message: "Content can not be empty!"
        })
    }

    BMI.updateById(req.params.bmiId, new BMI(req.body), (err, data) =>{
        if (err) {
            if (err.kind === "not_found") {
              res.status(404).json({
                message: `Not found BMI with id ${req.params.bmiId}.`,
                bmi: null,
                count: 0
              });
            } else {
              res.status(500).json({
                message: "Error updating BMI with id " + req.params.bmiId,
                bmi: null,
                count: 0
              });
            }
          } else res.json({
            message:"Updated BMI sucess !", count:1, bmi: req.body
          });
        })
}

exports.deleteAllByPatientId = (req, res) =>{
    if(!req.body){
        res.status(400).json({
          message:"Content cannot be empty!"
        })
      }
  
      BMI.removeAllByPatientId(req.params.patientId, (err, data) =>{
        if(err){
          if (err.kind === "not_found") {
            res.status(404).json({
              message: `Not found BMI with patientId ${req.params.patientId}.`,
              bmi: null,
              count: 0
            });
          } else {
            res.status(500).json({
              message: "Error updating BMI with id " + req.params.patientId,
              bmi: null,
              count: 0
            });
        }}
        else res.json({message:`BMI was deleted successfully !`})
      })
}
