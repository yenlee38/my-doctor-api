const Address = require("../models/address.model.js");
const address = require("../models/address.model.js");

exports.create = (req, res) => {}

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
        updatedAt: new Date()
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