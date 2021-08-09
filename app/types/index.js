const ROLES = {
    DOCTOR: "doctor",
    PATIENT: "patient",
    NURSE: "nurse"
};

const GENDER = {
    MALE: "male",
    FEMALE: "female"
};

const NUMBER_STATE = {
    USED : "used",
    NOT_USE : "not use",
    EXPIRED : "expired"
};

const EMOTION = {
    GREAT: "great",
    HAPPY: "happy",
    NORMAL: "normal",
    SAD: "sad",
    ANGRY: "angry"
};

//ENUM ('pending', 'confirmed', 'denied', 'cancel', 'transported','completed'),
 const ONLINE_BILL_STATUS = {
     PENDING : "pending",
     CONFIRMED : "confirmed",
     DENIED : "denied",
     CANCEL : "cancel",
     TRANSPORTED : "transported",
     COMPLETED : "completed"
 };

 const MEDICAL_BILL_STATUS = {
     PAID: "paid",
     UNPAID: "unpaid"
 };

 const SESSION = {
     AM : "AM",
     PM: "PM"
 };

module.exports = {
    ROLES, GENDER, NUMBER_STATE, EMOTION, ONLINE_BILL_STATUS, MEDICAL_BILL_STATUS, SESSION
}
