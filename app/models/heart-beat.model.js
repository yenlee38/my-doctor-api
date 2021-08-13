const sql = require("./db")
const HeartBeat = function (beat){
    this.id = beat.id;
    this.patientId = beat.patientId;
    this.createdAt = beat.createdAt;
    this.updatedAt = beat.updatedAt;
    this.diastole = beat.diastole;
    this.systole = beat.systole;
    this.heartBeat = beat.heartBeat;
    this.isHidden = beat.isHidden;
}

HeartBeat.create = ( heartBeat,result) =>{
    sql.query("Insert into HeartBeat set ?", heartBeat, (err, res) =>{
        if(err){
            console.log("err: " + err);
            result(err, null);
            return;
        }
        
        console.log({id: res.id, ...heartBeat})
        result(null, {...heartBeat});

    } )
}

HeartBeat.updateById = (id, heartBeat, result) =>{
    sql.query("Update HeartBeat set updatedAt = ?, diastole = ? ,systole = ?,  heartBeat = ? where id  = ? ", 
    [new Date(), heartBeat.diastole, heartBeat.systole, heartBeat.heartBeat, id], (err, res) =>{
        if(err){
            console.log("err: " + err);
            result(err, null);
            return;
        }

        if(res.affectedRows == 0){
            console.log("Not found");
            result({kind: "not_found"}, null);
            return;
        }

        console.log( res.affectedRows  + " HeartBeart was updated!" + { id: id, ...heartBeat })
        result(null, { ...heartBeat });
    })
}

HeartBeat.getById = (id, result) =>{
    sql.query("Select * from HeartBeat where id = ?", [id], (err, res) =>{
        if(err){
            console.log("err: " + err);
            result(err, null);
            return;
        }

        if(res.length){
            console.log(`HeartBeat find by id: ${id}` + {id: id, HeartBeat: res[0]})
            result(null, res[0])
            return;
        }

        result({kind: "not_found"}, null)
    })
}

HeartBeat.getByPatientId = (patientId, result) =>{
    sql.query(`select * from HeartBeat where patientId = ${patientId}`, (err, res) =>{
        if(err){
            console.log("err: "+ err);
            result(err, null);
            return;
        }

        if(res.length){
            console.log(`HeartBeat find by patientId: ${patientId} ` + res);
            result(null, res);
            return;
        }

        result({kind: "not_found"}, null);
    })
}

HeartBeat.getAll = result =>{
    sql.query("select * from HeartBeat where isHidden = false", (err, res) =>{
        if(err){
            console.log("err: "+ err);
            result(err, null);
            return;
        }

        console.log(`HeartBeat get all:  ` + res);
        result(null, res);
        
    })
}

HeartBeat.remove = (id, result) =>{
    sql.query(`Update HeartBeat set isHidden = true where id = ${id}`, (err, res) =>{
        if(err){
            console.log("err: "+ err);
            result(err, null);
            return;
        }

        if(res.affectedRows == 0){
            console.log("Not found HeartBeat for delete by id: " + id);
            result(err, null);
            return;
        }

        console.log("Delete HeartBeat by id: " + id)
        result(null, res)
    })

}

HeartBeat.removeByPatientId = (patientId, result) =>{
    sql.query(`Update HeartBeat set isHidden = true where patientId = ${patientId}`, (err, res) =>{
        if(err){
            console.log("err: "+ err);
            result(err, null);
            return;
        }

        if(res.affectedRows == 0){
            console.log("Not found HeartBeat for delete by patientId: " + patientId);
            result(err, null);
            return;
        }

        console.log("Delete HeartBeat by patientId: " + patientId  )
        result(null, res)
    })

}
module.exports = HeartBeat;