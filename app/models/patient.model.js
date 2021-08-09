// constructor
const Patient = function(patient) {
    this.id = patient.id;
    this.avatar = patient.avatar;
    this.fullName = patient.fullName;
    this.birthDate = patient.birthDate;
    this.gender = patient.gender;
    this.address = patient.address;
  };

  module.exports = Patient;