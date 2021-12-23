const {v4: uuidv4} = require('uuid');
const Message = require("../models/message.model.js");

exports.findByRecieverId = (req, res) => {
    Message.getByRecieverId (req.params.recieverId, (err, data) => {
        if(err){
            if(err.kind == "not_found"){
                res.status(404).json({
                    message: "Not found Heart Beat by recieverId: " + req.params.recieverId,
                    messages: null,
                    count: 0
                })
            }else res.status(500).json({
             message: err.message  || "Some thing was wrong when find by recieverId: " + req.params.recieverId,
             messages: null,
             count: 0
            })
        }

        res.json({
            message:"Find heart beat by reciever id!",
            count:1,
            messages:data
        });
    })
}

exports.findBySenderId = (req, res) => {
    Message.getBySenderId (req.params.senderId, (err, data) => {
        if(err){
            if(err.kind == "not_found"){
                res.status(404).json({
                    message: "Not found Heart Beat by senderId: " + req.params.senderId,
                    messages: null,
                    count: 0
                })
            }else res.status(500).json({
             message: err.message  || "Some thing was wrong when find by senderId: " + req.params.senderId,
             messages: null,
             count: 0
            })
        }

        res.json({
            message:"Find heart beat by sender id!",
            count:1,
            messages:data
        });
    })
}


exports.create = (req, res) =>{
    if(!req.body){
        res.status(400).json({
            message: "Content can not be empty!"
        })
    }

    const message = new Message({
        id: uuidv4(),
        senderId: req.body.senderId,
        recieverId: req.body.recieverId,
        createdAt: new Date(),
        updatedAt: new Date(),
        isHidden: false,
        isMedicalRecord: req.body.isMedicalRecord
    })

    Message.create(message, (err, data) =>{
        if(err){
            res.status(500).json({
                message: err.message || "Some thing was wrong when  created message",
                messages: null,
                count: 0
            })
        }
        
        res.json({
            message:"Created message beat success!",
            count:1,
            messages:message
        });

    })
}


exports.findAll = (req, res) => {
    Message.getAll((err, data) => {
      if (err)
        res.status(500).json({
          message:
            err.message || "Some error occurred while retrieving messages.",
          messages: null,
          count: 0
        });
      else
        res.json({
          message: "Find all message!",
          messages: data,
        });
    });
  };