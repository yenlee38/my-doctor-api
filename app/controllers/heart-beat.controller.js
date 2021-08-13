const HeartBeart = require("../models/heart-beat.model")
const {v4: uuidv4} = require('uuid');

exports.create = (req, res) => {}
exports.findAll = (req, res) =>{}
exports.findOne = (req, res) =>{}
exports.findByPaitentId = (req, res) => {}
exports.delete = (req, res) =>{}
exports.deleteAll = (req, res) =>{}
exports.update = (req, res) =>{}
exports.deleteAllByPatientId = (req, res) =>{}

exports.create = (req, res) =>{
    if(!req.body){
        res.status(400).json({
            message: "Content can not be empty!"
        })
    }

    const heartBeat = new HeartBeart({
        id: uuidv4(),
        patientId: req.body.patientId,
        createdAt: new Date(),
        updatedAt: new Date(),
        isHidden: false,
        diastole: req.body.diastole,
        systole: req.body.systole,
        heartBeat: req.body.heartBeat
    })

    HeartBeart.create(heartBeat, (err, data) =>{
        if(err){
            res.status(500).json({
                message: err.message || "Some thing was wrong when  created HeartBeat",
                heartBeat: null,
                count: 0
            })
        }
        
        res.json({
            message:"Created Heart beat success!",
            count:1,
            heartBeart:heartBeat
        });

    })
}

exports.findAll = (req, res) =>{
    HeartBeart.getAll((err, data)=>{
        if(err){
            res.status(500).json({
                message: err.message  || "Some thing was wrong when find ",
                heartBeat: null,
                count: 0
            })
        }

        res.json({
            message:"List all heart beat!",
            count:data.length,
            heartBeart:data
        });
    })
}

exports.findOne = (req, res) =>{
   HeartBeart.getById(req.params.heartBeatId, (err, data) =>{
       if(err){
           if(err.kind == "not_found"){
               res.status(404).json({
                   message: "Not found Heart Beat by id: " + req.params.heartBeatId,
                   heartBeat: null,
                   count: 0
               })
           }else res.status(500).json({
            message: err.message  || "Some thing was wrong when find by id: " + req.params.heartBeatId,
            heartBeat: null,
             count: 0
           })
       }

       res.json({
        message:"Find heart beat by id!",
        count:1,
        heartBeart:data
       });
   })
}

exports.findByPaitentId = (req, res) => {
    HeartBeart.getByPatientId (req.params.patientId, (err, data) => {
        if(err){
            if(err.kind == "not_found"){
                res.status(404).json({
                    message: "Not found Heart Beat by patientId: " + req.params.patientId,
                    heartBeat: null,
                    count: 0
                })
            }else res.status(500).json({
             message: err.message  || "Some thing was wrong when find by patientId: " + req.params.patientId,
             heartBeat: null,
             count: 0
            })
        }

        res.json({
            message:"Find heart beat by patient id!",
            count:data.length,
            heartBeart:data
        });
    })
}

exports.delete = (req, res) =>{
    HeartBeart.remove(req.params.heartBeatId, (err, data) =>{
        if(err){
            if(err.kind == "not_found"){
                res.status(404).json({
                    message: "Not found Heart Beat by heartBeatId: " + req.params.heartBeatId,
                    heartBeat: null,
                    count: 0
                })
            }else res.status(500).json({
             message: err.message  || "Some thing was wrong when find by heartBeatId: " + req.params.heartBeatId,
             heartBeat: null,
             count: 0
            })
        }
        res.json( {message:`HeartBeat was deleted successfully !`});
    })
}


exports.update = (req, res) =>{
    if(!req.body){
        res.status(400).json({
            message:"Content can not be empty!"
        })
    }

    HeartBeart.updateById(req.params.heartBeatId, new HeartBeart(req.body), (err, data) =>{
        if(err){
            if(err.kind == "not_found"){
                res.status(404).json({
                    message: "Not found Heart Beat by heartBeatId: " + req.params.heartBeatId,
                    heartBeat: null,
                    count: 0
                })
            }else res.status(500).json({
             message: err.message  || "Some thing was wrong when update by heartBeatId: " + req.params.heartBeatId,
             heartBeat: null,
            count: 0
            })
        }
        res.json({
            message:"Updated Heart beat success!",
            count:1,
            heartBeart:new HeartBeart(req.body)
        });
    })
}

exports.deleteAll= (req, res) =>{
    HeartBeart.deleteAll((err, data) =>{
        if(err){
            res.status(500).json({
                message: err.message  || "Some thing was wrong when delete all HeartBeat",
                heartBeat: null,
                count: 0
                
            })
        }
        res.json({message: "All HeartBeat was deleted successfully !"})
    })
}

exports.deleteAllByPatientId  = (req, res) =>{
    HeartBeart.removeByPatientId(req.params.patientId, (err, data) =>{
        if(err){
            if(err.kind == "not_found"){
                res.status(404).json({
                    message: "Not found Heart Beat by patientId: " + req.params.patientId,
                    heartBeat: null,
                    count: 0
                })
            }else res.status(500).json({
             message: err.message  || "Some thing was wrong when find by patientId: " + req.params.patientId,
             heartBeat: null,
            count: 0
            })
        }
        res.json( {message:`HeartBeat was deleted successfully !`});
    })
}
