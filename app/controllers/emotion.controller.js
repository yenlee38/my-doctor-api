const Emotion = require("../models/emotion.model.js");

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

    const emotion = new Emotion({
        patientId: req.body.patientId,
        description: req.body.description,
        emotion: req.body.emotion,
        createdAt: new Date(),
        updatedAt: new Date(),
        isHidden: false
    });

    Emotion.create(emotion, (err, data) =>{
        if(err){
            res.status(500).send({
                message: err.message || "Some error occurred while creating the emotion."
            })
        }
        else res.send(data);
    })
}

exports.findAll = (req, res) =>{
    Emotion.getAll((err, data) =>{
        if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving emotion."
        });
      else res.send(data);  
    })
}

exports.findOne = (req, res) => {
    Emotion.findById(req.params.emotionId, (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found emotion with id ${req.params.emotionId}.`
          });
        } else {
          res.status(500).send({
            message: "Error retrieving emotion with id " + req.params.emotionId
          });
        }
      } else res.send(data);
    });
  };

  exports.findByPaitentId = (req, res) => {
    Emotion.findByPatientId(req.params.patientId, (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found emotion with patientId ${req.params.patientId}.`
          });
        } else {
          res.status(500).send({
            message: "Error retrieving emotion with patientId " + req.params.patientId
          });
        }
      } else res.send(data);
    });
  };

  exports.delete = (req, res) =>{
    console.log("remove")
    Emotion.remove(req.params.emotionId, (err, data) => {
      if(err){
        if(err.kind === "not_found"){
          res.status(404).send({
            message: `Not found emotion with id ${req.params.emotionId}.`
          })
        }else {
          res.status(500).send({
            message: `Could not delete emotion with id ` + req.params.emotionId
          })
        }
      }else res.send({message:`Emotion was deleted successfully !`})
    })
  }

  exports.deleteAll = (req, res) =>{
    Emotion.removeAll((err, data) =>{
      if(err){
        res.status(500).send({
          message: 
          err.message || "Some error occurred while removing all emotion."
        })
      }else res.send({message: `All emotion were deleted successfully !`})
    })
  }

  exports.update = (req, res) =>{
    if(!req.body){
      res.status(400).send({
        message:"Content cannot be empty!"
      })
    }
    Emotion.updateById(req.params.emotionId, new Emotion(req.body), (err, data) =>{
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found emotion with id ${req.params.emotionId}.`
          });
        } else {
          res.status(500).send({
            message: "Error updating emotion with id " + req.params.emotionId
          });
        }
      } else res.send(data);
    })
  }


  exports.deleteAllByPatientId = (req, res) =>{
    Emotion.removeAllByPatientId(req.params.patientId, (err, data) =>{
      if(err){
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found emotion with patientId ${req.params.patientId}.`
          });
        } else {
          res.status(500).send({
            message: "Error updating emotion with id " + req.params.patientId
          });
      }}
      else res.send({message:`Emotion was deleted successfully !`})
    })
  }

  
