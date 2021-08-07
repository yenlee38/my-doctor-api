// constructor
const Patient = function(patient) {
    this.id = patient.id;
    this.phone = patient.phone;
    this.password = patient.password;
    this.avatar = patient.avatar;
    this.fullName = patient.fullName;
    this.birthYear = patient.birthYear;
    this.gender = patient.gender;
    this.address = patient.address;
    this.isHidden = patient.isHidden;
  };

  module.exports = Patient;