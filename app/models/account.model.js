const sql = require("./db.js");

//constructor
const Account =  function(account) {
    this.username = account.username;
    this.password = account.password;
    this.role = account.role;
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

module.exports = Account;