const Schedule = require("../models/schedule.model.js");
const { v4: uuidv4 } = require("uuid");
const e = require("cors");

exports.findAll = (req, res) =>{
    Schedule.getAll((err, data)=>{
        if(err){
            res.status(500).json({
                message: err.message  || "Some thing was wrong when find ",
                schedule: null,
                count: 0
            })
        }
        else
        res.json({
            message:"List all schedule!",
            count:1,
            schedule:data
        });
    })
}

exports.findByDoctorId = (req, res) => {
    Schedule.getByDoctorId (req.params.doctorId, (err, data) => {
        if(err){
            if(err.kind == "not_found"){
                res.status(404).json({
                    message: "Not found Schedule by doctorId: " + req.params.doctorId,
                    schedule: null,
                    count: 0
                })
            }else res.status(500).json({
             message: err.message  || "Some thing was wrong when find by doctorId: " + req.params.doctorId,
             schedule: null,
             count: 0
            })
        }
        else
        res.json({
            message:"Find schedule by doctor id!",
            count:1,
            schedule:data
        });
    })
}

exports.create = (req, res) => {
    if (!req.body) {
      res.status(400).json({
        message: "Content can not be empty!",
      });
      return;
    }
    const schedule = new Schedule({
      id: uuidv4(),
      doctorId: req.body.doctorId,
      roomId: req.body.roomId,
      day: req.body.day,
      session: req.body.session,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
  
    // Save Room in the database
    Schedule.create(schedule, (err, data) => {
      if (err)
        res.status(500).json({
          message: err.message || "Some error occurred while creating the Schedule.",
          room: null,
          count: 0,
        });
      else
        res.json({
          message: "Created at schedule!",
          count: 1,
          schedule: schedule,
        });
    });
  };



  