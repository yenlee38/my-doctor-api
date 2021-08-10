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

module.exports = BMI;