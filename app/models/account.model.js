const sql = require("./db.js");

//constructor
const Account =  function(account) {
    this.id = account.id;
    this.username = account.username;
    this.password = account.password;
    this.role = account.role;
    this.isHidden = account.isHidden;
}

Account.create = (newAccount, result) => {
    sql.query("INSERT INTO Account SET ?" , newAccount, (err, res) =>{
        if(err){
            console.log("error insert account: ", err);
            result(err, null);
            return;
        }
        console.log("created account: ", {id: res.insertId, ...newAccount});
        result(null, { id: res.insertId, ...newAccount });
    });
};

Account.signin = (username, password, result) => {
    sql.query("SELECT * FROM Account WHERE username = '" + username + "' AND password = '" + password  +"'", (err, res) =>{
        if(err){
            console.log("error: ", err);
            result(err, null);
            return;
        }

        if(res.length){
            console.log("Sign in account: " + res[0]);
            result(null, res[0]);
            return;
        }

        // signin fail
    result({ kind: "not_found" }, null);
    })
}

module.exports = Account;