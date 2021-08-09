const OnlineBill = function(bill){
    this.id = bill.id;
    this.patientId = bill.patientId;
    this.addressId = bill.addressId;
    this.status = bill.status;
    this.prescription = bill.prescription;
    this.price = bill.price;
    this.createdAt = bill.createdAt;
    this.updatedAt = bill.updatedAt;
}

module.exports = OnlineBill;