const sql = require("./db.js");
const DoctorRegistration = function(doctorRegistration) {
    this.id = doctorRegistration.id;
    this.serviceId = doctorRegistration.serviceId;
    this.name = doctorRegistration.name;
    this.doctorId = doctorRegistration.doctorId;
    this.patientId = doctorRegistration.patientId;
    this.createdAt = doctorRegistration.createdAt;
    this.updatedAt = doctorRegistration.updatedAt;
    this.isHidden = doctorRegistration.isHidden;
    this.status = doctorRegistration.status; // created, pendding, confirmed,  expired, cancel..
}
  
DoctorRegistration.updateById = (id, doctorRegistration, result) => {
    sql.query(
      "UPDATE DoctorRegistration SET  name = ?, updatedAt = ?, status = ? WHERE id = ?",
      [doctorRegistration.name, new Date(), doctorRegistration.status, id],
      (err, res) => {
        if (err) {
          result(err, null);
          return;
        }
  
        if (res.affectedRows == 0) {
          // not found DoctorRegistration with the id
          result({ kind: "not_found" }, null);
          return;
        }
        result(null, {...doctorRegistration });
      }
    );
  };


DoctorRegistration.findById = (drId, result) => {
    sql.query(`SELECT * FROM DoctorRegistration WHERE id = ?`, [drId], (err, res) => {
      if (err) {
        result(err, null);
        return;
      }
  
      if (res.length) {
        result(null, res[0]);
        return;
      }
      result({ kind: "not_found" }, null);
    });
  };


DoctorRegistration.create = (doctorRegistration, result) => {
    sql.query(`INSERT INTO DoctorRegistration set ?`, doctorRegistration, (err, res) => {
      if (err) {
        result(err, null);
        return;
      }

      result(null, { ...doctorRegistration });
    });
  };

  
DoctorRegistration.getAll = result => {
    sql.query("SELECT * FROM DoctorRegistration", (err, res) =>{
        if(err){
            result(err, null);
            return;
        }
        result(null, res);
    })
} 

DoctorRegistration.getByPatientId = (patientId, result) =>{
    sql.query(`select * from DoctorRegistration where patientId = "${patientId}"`, (err, res) =>{
        if (err) {
            result(err, null);
            return;
        }

        if (res.length) {
            result(null, res);
            return;
        }

        result({kind: "not_found"}, null);
    })
}

DoctorRegistration.getByPatientIdAndDoctorId = (patientId, doctorId, result) =>{
  sql.query(`select * from DoctorRegistration where patientId = "${patientId}" and doctorId = "${doctorId}" and status = "CONFIRMED"`, (err, res) =>{
      if (err) {
          result(err, null);
          return;
      }

      if (res.length) {
          result(null, res);
          return;
      }

      result({kind: "not_found"}, null);
  })
}


module.exports = DoctorRegistration;