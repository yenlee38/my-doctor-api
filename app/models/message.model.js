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

module.exports = Message;

