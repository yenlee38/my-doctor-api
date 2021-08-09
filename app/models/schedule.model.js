const Schedule = function(schedule){
    this.id = schedule.id;
    this.doctorId = schedule.doctorId;
    this.roomId = schedule.roomId;
    this.day = schedule.day;
    this.session = schedule.session;
}

module.exports = Schedule;