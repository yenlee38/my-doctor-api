const HeartBeart = require("../models/heart-beat.model")

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
        res.status(400).send({
            message: "Content can not be empty!"
        })
    }

    const heartBeat = new HeartBeart({
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
            res.status(500).send({
                message: err.message || "Some thing was wrong when  created HeartBeat"
            })
        }
        
        res.send(data);

    })
}

exports.findAll = (req, res) =>{
    HeartBeart.getAll((err, data)=>{
        if(err){
            res.status(500).send({
                message: err.message  || "Some thing was wrong when find "
            })
        }

        res.send(data);
    })
}

exports.findOne = (req, res) =>{
   HeartBeart.getById(req.params.heartBeatId, (err, data) =>{
       if(err){
           if(err.kind == "not_found"){
               res.status(404).send({
                   message: "Not found Heart Beat by id: " + req.params.heartBeatId
               })
           }else res.status(500).send({
            message: err.message  || "Some thing was wrong when find by id: " + req.params.heartBeatId
           })
       }

       res.send(data);
   })
}

exports.findByPaitentId = (req, res) => {
    HeartBeart.getByPatientId (req.params.patientId, (err, data) => {
        if(err){
            if(err.kind == "not_found"){
                res.status(404).send({
                    message: "Not found Heart Beat by patientId: " + req.params.patientId
                })
            }else res.status(500).send({
             message: err.message  || "Some thing was wrong when find by patientId: " + req.params.patientId
            })
        }

        res.send(data);
    })
}

exports.delete = (req, res) =>{
    HeartBeart.remove(req.params.heartBeatId, (err, data) =>{
        if(err){
            if(err.kind == "not_found"){
                res.status(404).send({
                    message: "Not found Heart Beat by heartBeatId: " + req.params.heartBeatId
                })
            }else res.status(500).send({
             message: err.message  || "Some thing was wrong when find by heartBeatId: " + req.params.heartBeatId
            })
        }
        res.send( {message:`HeartBeat was deleted successfully !`});
    })
}


exports.update = (req, res) =>{
    if(!req.body){
        res.status(400).send({
            message:"Content can not be empty!"
        })
    }

    HeartBeart.updateById(req.params.heartBeatId, new HeartBeart(req.body), (err, data) =>{
        if(err){
            if(err.kind == "not_found"){
                res.status(404).send({
                    message: "Not found Heart Beat by heartBeatId: " + req.params.heartBeatId
                })
            }else res.status(500).send({
             message: err.message  || "Some thing was wrong when update by heartBeatId: " + req.params.heartBeatId
            })
        }
        res.send(data);
    })
}

exports.deleteAll= (req, res) =>{
    HeartBeart.deleteAll((err, data) =>{
        if(err){
            res.status(500).send({
                message: err.message  || "Some thing was wrong when delete all HeartBeat"
            })
        }
        res.send({message: "All HeartBeat was deleted successfully !"})
    })
}

exports.deleteAllByPatientId  = (req, res) =>{
    HeartBeart.removeByPatientId(req.params.patientId, (err, data) =>{
        if(err){
            if(err.kind == "not_found"){
                res.status(404).send({
                    message: "Not found Heart Beat by patientId: " + req.params.patientId
                })
            }else res.status(500).send({
             message: err.message  || "Some thing was wrong when find by patientId: " + req.params.patientId
            })
        }
        res.send( {message:`HeartBeat was deleted successfully !`});
    })
}
