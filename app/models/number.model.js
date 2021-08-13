const Number = function (number){
    this.id = number.id;
    this.patientId = number.patientId;
    this.roomId = number.roomId;
    this.number = number.number;
    this.date = number.date;
    this.state = number.state;
    this.createdAt = number.createdAt;
    this.updatedAt = number.updatedAt;
}

module.exports = Number;

