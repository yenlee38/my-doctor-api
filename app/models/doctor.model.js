const Doctor = function (doctor){
    this.id = doctor.id;
    this.avatar = doctor.avatar;
    this.fullname = doctor.fullname;
    this.deptId  = doctor.deptId;
    this.isHidden  = doctor.isHidden;
}

module.exports = Doctor;