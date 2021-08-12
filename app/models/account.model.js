const sql = require("./db.js");

//constructor
const Account = function (account) {
  this.id = account.id;
  this.username = account.username;
  this.password = account.password;
  this.role = account.role;
  this.isHidden = account.isHidden;
  this.salt = account.salt;
  this.updatedAt = account.updatedAt;
  this.createdAt = account.createdAt;
};

Account.create = (newAccount, result) => {
  sql.query("INSERT INTO Account SET ?", newAccount, (err, res) => {
    if (err) {
      console.log("error insert account: ", err);
      result(err, null);
      return;
    }

    switch (newAccount.role) {
      case "doctor":
        const Doctor = require("./doctor.model.js");
        Doctor.create(res.insertId, (err, data) => {});
        break;
      case "patient":
        const Patient = require("./patient.model.js");
        Patient.create(res.insertId, (err, data) => {});
        break;
      default:
        break;
    }

    console.log("created account: ", { id: res.insertId, ...newAccount });
    result(null, { id: res.insertId, ...newAccount });
  });
};

Account.signin = (username, password, result) => {
  sql.query(
    "SELECT * FROM Account WHERE username = ? and password = ?",
    [username, password],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }

      if (res.length) {
        console.log("Sign in account: " + res[0]);
        result(null, res[0]);
        return;
      }

      // signin fail
      result({ kind: "not_found" }, null);
    }
  );
};

Account.updatePasswordByUsername = (username, account, result) => {
  sql.query(
    "UPDATE account SET password = ? WHERE username = ?",
    [account.password, username],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }

      if (res.affectedRows == 0) {
        // not found account with the id
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("updated account: ", { ...account });
      result(null, { ...account });
    }
  );
};

Account.disableById = (id, account, result) => {
  sql.query(
    `UPDATE account SET isHidden = true WHERE id = "${id}"`,
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }

      if (res.affectedRows == 0) {
        // not found account with the id
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("updated account: ", { id: id, ...account });
      result(null, { id: id, ...account });
    }
  );
};

Account.getSalt = (username, result) => {
  sql.query(
    "SELECT * FROM Account WHERE username = ?",
    [username],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, "");
        return;
      }

      if (res.length) {
        console.log("Get Salt in account: " + res[0].salt);
        result(null, res[0].salt);
        return;
      }

      // signin fail
      result({ kind: "not_found" }, "");
    }
  );
}

Account.getAll  = result =>{
  sql.query("Select * from Account Where isHidden = false", (err, res) =>{
    if(err){
      console.log("Err: " + err);
      result(err, null);
      return;
    }

    result(null, res);
  })
}

module.exports = Account;
