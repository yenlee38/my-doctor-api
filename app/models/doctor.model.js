const Doctor = function (doctor){
    this.id = doctor.id;
    this.avatar = doctor.avatar;
    this.fullname = doctor.fullname;
    this.department  = doctor.department;
    this.phone = doctor.phone;
    this.education = doctor.education;
    this.gender = doctor.gender;
}

module.exports = Doctor;