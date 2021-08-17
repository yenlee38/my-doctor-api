const sql =require("./db")
const BMI = function(bmi){
    this.id = bmi.id;
    this.patientId = bmi.patientId;
    this.createdAt = bmi.createdAt;
    this.updatedAt = bmi.updatedAt;
    this.tall = bmi.tall;
    this.weigh = bmi.weigh;
    this.bmi = bmi.bmi;
    this.isHidden = bmi.isHidden;
}

BMI.create = (BMI, result) => {
    sql.query ("Insert into BMI Set ?", BMI, (err, res) =>{
        if(err){
            console.log("error: ", err);
            result(err, null);
            return;
        }

        console.log("created BMI: ", {id: res.id, ...BMI});
        result(null, { ...BMI});
    })
}

BMI.getAll = result => {
    sql.query("SELECT * FROM BMI WHERE isHidden = false", (err, res) =>{
        if(err){
            console.log("error: ", err);
            result(err, null);
            return;
        }

        console.log("BMI: ", res);
        result(null, res);
    })
} 

BMI.findById = (bmiId, result) => {
    sql.query(`SELECT * FROM BMI WHERE id = "${bmiId}" and isHidden = false`, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
  
      if (res.length) {
        console.log("found BMI: ", res[0]);
        result(null, res[0]);
        return;
      }
  
      // not found Customer with the id
      result({ kind: "not_found" }, null);
    });
  };

  BMI.findByPatientId = (patientId, result) => {
    sql.query(`SELECT * FROM BMI WHERE patientId = "${patientId}" and isHidden = false`, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
  
      if (res.length) {
        console.log("found BMI: ", res);
        result(null, res);
        return;
      }
  
      // not found BMI with the id
      result({ kind: "not_found" }, null);
    });
  };

  BMI.updateById = (id, BMI, result) => {
    sql.query(
      `UPDATE BMI SET weigh = ?, tall = ?, bmi = ?, updatedAt = ? WHERE id = "${id}"`,
      [BMI.weigh, BMI.tall, BMI.weigh/(2*0.01*BMI.tall), new Date()],
      (err, res) => {
        if (err) {
          console.log("error: ", err);
          result(err, null);
          return;
        }
  
        if (res.affectedRows == 0) {
          // not found BMI with the id
          result({ kind: "not_found" }, null);
          return;
        }
  
        console.log("updated BMI: ", { id: id, ...BMI });
        result(null, {...BMI });
      }
    );
  };

  BMI.remove = (id, result) => {
  
    sql.query("UPDATE BMI SET isHidden = true  WHERE id = ?", id, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
  
      if (res.affectedRows == 0) {
        // not found BMI with the id
        result({ kind: "not_found" }, null);
        return;
      }
  
      console.log("Delete BMI id: " + id);
      result(null, res);
    });
  };

  BMI.removeAll = result => {
    sql.query("UPDATE BMI SET isHidden = true", (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
  
      console.log(`deleted ${res.affectedRows} BMI`);
      result(null, res);
    });
  };

  BMI.removeAllByPatientId = (patientId, result) => {
    sql.query(`UPDATE BMI SET isHidden = true Where patientId = patientId = ?`, [patientId],  (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
  
      console.log(`deleted ${res.affectedRows} BMI`);
      result(null, res);
    });
  };
  


module.exports = BMI;