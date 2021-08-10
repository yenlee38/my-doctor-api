const MedicalRecord = function(medicalRecord){
    this.id = medicalRecord.id;
    this.doctorId = medicalRecord.doctorId;
    this.patientId = medicalRecord.patientId;
    this.name = medicalRecord.name;
    this.date = medicalRecord.date;
    this.precription = medicalRecord.precription;
    this.fileStore = medicalRecord.fileStore;
    this.createdAt = bill.createdAt;
    this.updatedAt = bill.updatedAt;

}

module.exports = MedicalRecord;