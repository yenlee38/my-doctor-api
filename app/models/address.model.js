const sql = require("./db.js");

const Address = function(address){
    this.id = address.id;
    this.patientId = address.patientId;
    this.name = address.name;
    this.isDefault = address.isDefault;
    this.createdAt = address.createdAt;
    this.updatedAt = address.updatedAt;
    this.isHidden = address.isHidden;
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
    sql.query("SELECT * FROM Address WHERE isHidden = false", (err, res) =>{
        if(err){
            console.log("error: ", err);
            result(err, null);
            return;
        }

        console.log("address: ", res);
        result(null, res);
    })
} 

Address.findById = (addressId, result) => {
    sql.query(`SELECT * FROM Address WHERE id = ${addressId} and isHidden = false`, (err, res) => {
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
  
      // not found Address with the id
      result({ kind: "not_found" }, null);
    });
  };

  Address.findByPatientId = (patientId, result) => {
    console.log("patientId: " + patientId)
    sql.query(`SELECT * FROM Address WHERE patientId = ${patientId} and isHidden = false`, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
  
      if (res.length) {
        console.log("Found Address: ", res);
        result(null, res);
        return;
      }
  
      // not found address with the id
      result({ kind: "not_found" }, null);
    });
  };

  Address.updateById = (id, address, result) => {
    console.log("vao")
    sql.query(
      "UPDATE Address SET name = ?, isDefault = ?, updatedAt = ? WHERE id = ?",
      [address.name, address.isDefault, new Date(), id],
      (err, res) => {
        if (err) {
          console.log("error: ", err);
          result(err, null);
          return;
        }
  
        if (res.affectedRows == 0) {
          // not found address with the id
          result({ kind: "not_found" }, null);
          return;
        }
  
        console.log("updated address: ", { id: id, ...address });
        result(null, { id: id, ...address });
      }
    );
  };

  Address.remove = (id, result) => {
  
    sql.query("UPDATE Address SET isHidden = true  WHERE id = ?", id, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
  
      if (res.affectedRows == 0) {
        // not found Address with the id
        result({ kind: "not_found" }, null);
        return;
      }
  
      console.log("Delete address id: " + id);
      result(null, res);
    });
  };

  Address.removeAll = result => {
    sql.query("UPDATE Address SET isHidden = true", (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
  
      console.log(`deleted ${res.affectedRows} address`);
      result(null, res);
    });
  };

  Address.removeAllByPatientId = (patientId, result) => {
    console.log("patient")
    sql.query(`UPDATE Address SET isHidden = true Where patientId = ${patientId}`, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
  
      console.log(`deleted ${res.affectedRows} address`);
      result(null, res);
    });
  };
  

module.exports = Address;