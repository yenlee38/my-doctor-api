const sql = require("./db.js");

const Emotion = function (emotion){
    this.id = emotion.id;
    this.patientId = emotion.patientId;
    this.createdAt = emotion.createdAt;
    this.updatedAt = emotion.updatedAt;
    this.description = emotion.description;
    this.emotion = emotion.emotion;
    this.isHidden = emotion.isHidden;
}

Emotion.create = (emotion, result) => {
    sql.query ("Insert into Emotion Set ?", emotion, (err, res) =>{
        if(err){
            console.log("error: ", err);
            result(err, null);
            return;
        }

        console.log("created emotion: ", {id: res.id, ...emotion});
        result(null, { ...emotion});
    })
}

Emotion.getAll = result => {
    sql.query("SELECT * FROM Emotion WHERE isHidden = false", (err, res) =>{
        if(err){
            console.log("error: ", err);
            result(err, null);
            return;
        }

        console.log("emotion: ", res);
        result(null, res);
    })
} 

Emotion.findById = (emotionId, result) => {
    sql.query(`SELECT * FROM Emotion WHERE id = ? and isHidden = false`,[emotionId], (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
  
      if (res.length) {
        console.log("found emotion: ", res[0]);
        result(null, res[0]);
        return;
      }
  
      // not found emotion with the id
      result({ kind: "not_found" }, null);
    });
  };

  Emotion.findByPatientId = (patientId, result) => {
    sql.query(`SELECT * FROM Emotion WHERE patientId = ? and isHidden = false`,[patientId], (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
  
      if (res.length) {
        console.log("found emotion: ", res);
        result(null, res);
        return;
      }
  
      // not found emotion with the id
      result({ kind: "not_found" }, null);
    });
  };

  Emotion.updateById = (id, emotion, result) => {
    console.log("vao")
    sql.query(
      "UPDATE Emotion SET  emotion = ?, updatedAt = ?, description = ? WHERE id = ?",
      [emotion.emotion, new Date(), emotion.description, id],
      (err, res) => {
        if (err) {
          console.log("error: ", err);
          result(err, null);
          return;
        }
  
        if (res.affectedRows == 0) {
          // not found emotion with the id
          result({ kind: "not_found" }, null);
          return;
        }
  
        console.log("updated emotion: ", { id: id, ...emotion });
        result(null, {...emotion });
      }
    );
  };

  Emotion.remove = (id, result) => {
  
    sql.query("UPDATE Emotion SET isHidden = true  WHERE id = ?", id, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
  
      if (res.affectedRows == 0) {
        // not found emotion with the id
        result({ kind: "not_found" }, null);
        return;
      }
  
      console.log("Delete emotion id: " + id);
      result(null, res);
    });
  };

  Emotion.removeAll = result => {
    sql.query("UPDATE Emotion SET isHidden = true", (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
  
      console.log(`deleted ${res.affectedRows} emotion`);
      result(null, res);
    });
  };

  Emotion.removeAllByPatientId = (patientId, result) => {
    sql.query(`UPDATE Emotion SET isHidden = true Where patientId = ?`, [patientId], (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
  
      console.log(`deleted ${res.affectedRows} emotion`);
      result(null, res);
    });
  };
  

module.exports = Emotion;

//test
////hihi
