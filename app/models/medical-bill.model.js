const MedicalBill = function (bill){
    this.id = bill.id;
    this.patientId = bill.patientId;
    this.medicalRecordId = bill.medicalRecordId;
    this.status = bill.status;
    this.bill = bill.bill;
    this.price = bill.price;
    this.createdAt = bill.createdAt;
    this.updatedAt = bill.updatedAt;
}

module.exports = MedicalBill;