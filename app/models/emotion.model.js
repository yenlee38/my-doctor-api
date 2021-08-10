const Emotion = function (emotion){
    this.id = emotion.id;
    this.patientId = emotion.patientId;
    this.createdAt = emotion.createdAt;
    this.updatetAt = emotion.updatetAt;
    this.description = emotion.description;
    this.emotion = emotion.emotion;
    this.isHidden = emotion.isHidden;
}

module.exports = Emotion;