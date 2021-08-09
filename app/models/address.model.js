const sql = require("./db.js");

const Address = function(address){
    this.id = address.id;
    this.patientId = address.patientId;
    this.name = address.name;
    this.isDefault = address.isDefault;
    this.createdAt = address.createdAt;
    this.updatedAt = address.updatedAt;
}

Address.create = (address, result) => {
    sql.query ("Insert into Address Set ?", address, (err, res) =>{
        if(err){
            console.log("error: ", err);
            result(err, null);
            return;
        }

        console.log("created Address: ", {id: res.id, ...address});
        result(null, {id: res.id, ...address});
    })
}

Address.getAll = result => {
    sql.query("SELECT * FROM Address", (err, res) =>{
        if(err){
            console.log("error: ", err);
            result(null, err);
            return;
        }

        console.log("address: ", res);
        result(null, res);
    })
} 

Address.findById = (addressId, result) => {
    sql.query(`SELECT * FROM Address WHERE id = ${addressId}`, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
  
      if (res.length) {
        console.log("found Address: ", res[0]);
        result(null, res[0]);
        return;
      }
  
      // not found Customer with the id
      result({ kind: "not_found" }, null);
    });
  };

  Address.findByPatientId = (patientId, result) => {
    sql.query(`SELECT * FROM Address WHERE patientId = ${patientId}`, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
  
      if (res.length) {
        console.log("found Address: ", res);
        result(null, res);
        return;
      }
  
      // not found Customer with the id
      result({ kind: "not_found" }, null);
    });
  };

module.exports = Address;