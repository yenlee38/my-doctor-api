
const sql = require("./db.js");

const Schedule = function(schedule){
    this.id = schedule.id;
    this.doctorId = schedule.doctorId;
    this.roomId = schedule.roomId;
    this.day = schedule.day;
    this.session = schedule.session;
    this.createdAt = schedule.createdAt;
    this.updatedAt = schedule.updatedAt;
}

Schedule.create = (newSchedule, result) => {
    sql.query("INSERT INTO schedule SET ?", newSchedule, (err, res) => {
      if (err) {
        result(err, null);
        return;
      }
      result(null, { id: res.insertId, ...newSchedule });
    });
  };
  
  Schedule.getByDoctorId = (id, result) =>{
    sql.query("Select * from schedule where doctorId = ?", [id], (err, res) =>{
        if(err){
            console.log("err: " + err);
            result(err, null);
            return;
        }

        if(res.length){
            result(null, res)
            return ;
        }

        result({kind: "not_found"}, null)
    })
}
  
  Schedule.getAll = (result) => {
    sql.query(
      `SELECT * FROM schedule`,
      (err, res) => {
        if (err) {
          console.log("error: ", err);
          result(null, err);
          return;
        }
        result(null, res);
      }
    );
  };


module.exports = Schedule;