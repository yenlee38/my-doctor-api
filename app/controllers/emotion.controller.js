const Emotion = require("../models/emotion.model.js");
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
    };

    const emotion = new Emotion({
        id: uuidv4(),
        patientId: req.body.patientId,
        description: req.body.description,
        emotion: req.body.emotion,
        createdAt: new Date(),
        updatedAt: new Date(),
        isHidden: false
    });

    Emotion.create(emotion, (err, data) =>{
        if(err){
            res.status(500).json({
                message: err.message || "Some error occurred while creating the emotion.",
                emotion:null,
                count:0
            })
        }
        else res.json({
          message: "Created emotion success!",
          count:1,
          emotion:emotion
        });
    })
}

exports.findAll = (req, res) =>{
    Emotion.getAll((err, data) =>{
        if (err)
        res.status(500).json({
          message:
            err.message || "Some error occurred while retrieving emotion.",
            emotion:null,
            count:0
        });
      else res.json({
        message: "List All emotion",
        count: data.length,
        emotion: data
      });  
    })
}

exports.findOne = (req, res) => {
    Emotion.findById(req.params.emotionId, (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).json({
            message: `Not found emotion with id ${req.params.emotionId}.`,
            emotion:null,
            count:0
          });
        } else {
          res.status(500).json({
            message: "Error retrieving emotion with id " + req.params.emotionId,
            emotion:null,
            count:0
          });
        }
      } else res.json({
        message: "Find one emotion!",
        count:1,
        emotion: data
      });
    });
  };

  exports.findByPaitentId = (req, res) => {
    Emotion.findByPatientId(req.params.patientId, (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).json({
            message: `Not found emotion with patientId ${req.params.patientId}.`,
            emotion:null,
            count:0
          });
        } else {
          res.status(500).json({
            message: "Error retrieving emotion with patientId " + req.params.patientId,
            emotion:null,
            count:0
          });
        }
      } else res.json({
        message: "List All emotion by patient",
        count: 1,
        emotion: data
      });
    });
  };

  exports.delete = (req, res) =>{
    console.log("remove")
    Emotion.remove(req.params.emotionId, (err, data) => {
      if(err){
        if(err.kind === "not_found"){
          res.status(404).json({
            message: `Not found emotion with id ${req.params.emotionId}.`,
            emotion:null,
            count:0
          })
        }else {
          res.status(500).json({
            message: `Could not delete emotion with id ` + req.params.emotionId,
            emotion:null,
            count:0
          })
        }
      }else res.json({message:`Emotion was deleted successfully !`})
    })
  }

  exports.deleteAll = (req, res) =>{
    Emotion.removeAll((err, data) =>{
      if(err){
        res.status(500).json({
          message: 
          err.message || "Some error occurred while removing all emotion.",
          emotion:null,
          count:0
        })
      }else res.json({message: `All emotion were deleted successfully !`})
    })
  }

  exports.update = (req, res) =>{
    if(!req.body){
      res.status(400).json({
        message:"Content cannot be empty!"
      })
    }
    Emotion.updateById(req.params.emotionId, new Emotion(req.body), (err, data) =>{
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).json({
            message: `Not found emotion with id ${req.params.emotionId}.`,
            emotion:null,
            count:0
          });
        } else {
          res.status(500).json({
            message: "Error updating emotion with id " + req.params.emotionId,
            emotion:null,
            count:0
          });
        }
      } else res.json({
        message: "Updated emotion success!",
        count: 1,
        emotion:req.body
      });
    })
  }


  exports.deleteAllByPatientId = (req, res) =>{
    Emotion.removeAllByPatientId(req.params.patientId, (err, data) =>{
      if(err){
        if (err.kind === "not_found") {
          res.status(404).json({
            message: `Not found emotion with patientId ${req.params.patientId}.`, emotion:null,
            count:0
          });
        } else {
          res.status(500).json({
            message: "Error updating emotion with id " + req.params.patientId, emotion:null,
            count:0
          });
      }}
      else res.json({message:`Emotion was deleted successfully !`})
    })
  }

  
