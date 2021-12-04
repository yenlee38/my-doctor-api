const sql = require("./db");

const Service = function(service) {
    this.id = service.id;
    this.description = service.description;
    this.name = service.name;
    this.doctorId = service.doctorId;
    this.price = service.price;
    this.duration = service.duration;
    this.isHidden = service.isHidden;
    this.createdAt = service.createdAt;
    this.updatedAt = service.updatedAt;
}

Service.create = (service, result) =>{
    sql.query("Insert into Service set ?", service, (err, res) =>{
        if(err){
            result(err, null);
            return;
        }
        
        result(null, {...service});

    } )
}


Service.getById = (id, result) =>{
    sql.query("Select * from Service where id = ?", [id], (err, res) =>{
        if(err){
            console.log("err: " + err);
            result(err, null);
            return;
        }

        if(res.length){
            result(null, res[0])
            return;
        }

        result({kind: "not_found"}, null)
    })
}

Service.getByDoctorId = (doctorId, result) =>{
    sql.query(`select * from Service where doctorId = "${doctorId}"`, (err, res) =>{
        if(err){
            result(err, null);
            return;
        }

        if(res.length){
            result(null, res);
            return;
        }

        result({kind: "not_found"}, null);
    })
}

Service.getAll = result =>{
    sql.query("select * from Service", (err, res) =>{
        if(err){
            result(err, null);
            return;
        }
        result(null, res);      
    })
}

Service.remove = (id, result) =>{
    sql.query(`Update Service set isHidden = true where id = "${id}"`, (err, res) =>{
        if(err){
            result(err, null);
            return;
        }

        if(res.affectedRows == 0){
            result(err, null);
            return;
        }
        result(null, res)
    })

}


module.exports = Service;

