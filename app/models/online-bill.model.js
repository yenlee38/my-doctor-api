const OnlineBill = function(bill){
    this.id = bill.id;
    this.patientId = bill.patientId;
    this.status = bill.status;
    this.prescription = bill.prescription;
    this.price = bill.price;
}

module.exports = OnlineBill;