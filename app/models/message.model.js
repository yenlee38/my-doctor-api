const Message = function(message){
    this.id = message.id;
    this.senderId = message.senderId;
    this.recieverId = message.recieverId;
    this.content = message.content;
    this.createdAt = message.createdAt;
    this.updatedAt = message.updatedAt;
    this.isMedicalRecord = message.isMedicalRecord;
    this.isHidden = message.isHidden;
}

Message.getByRecieverId = (recieverId, result) =>{
    sql.query(`select * from message where recieverId = "${recieverId}"`, (err, res) =>{
        if(err){
            result(err, null);
            return;
        }

        if(res.length){
            result(null, res);
            return;
        }

        result({kind: "not_found"}, null);
    })
}

Message.getBySenderId = (senderId, result) =>{
    sql.query(`select * from message where senderId = "${senderId}"`, (err, res) =>{
        if(err){
            result(err, null);
            return;
        }

        if(res.length){
            result(null, res);
            return;
        }

        result({kind: "not_found"}, null);
    })
}

Message.create = ( message,result) =>{
    sql.query("Insert into message set ?", message, (err, res) =>{
        if(err){
            result(err, null);
            return;
        }
        result(null, {...message});

    } )
}


Message.getAll = (result) => {
    sql.query(`SELECT * FROM message`, (err, res) => {
      if (err) {
        result(null, err);
        return;
      }
      result(null, res);
    });
  };

  
module.exports = Message;

