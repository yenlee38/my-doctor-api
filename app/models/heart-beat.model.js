const HeartBeat = function (beat){
    this.id = beat.id;
    this.patientId = beat.patientId;
    this.createdAt = beat.createdAt;
    this.updatedAt = beat.updatedAt;
    this.diastole = beat.diastole;
    this.systole = beat.systole;
    this.heartBeat = beat.heartBeat;
}

module.exports = HeartBeat;