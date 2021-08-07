const BMI = function(bmi){
    this.patientId = bmi.patientId;
    this.createdAt = bmi.createdAt;
    this.tall = bmi.tall;
    this.weigh = bmi.weigh;
    this.bmi = bmi.bmi;
}

module.exports = BMI;