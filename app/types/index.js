const ROLES = {
  DOCTOR: "doctor",
  PATIENT: "patient",
  NURSE: "nurse",
};

const GENDER = {
  MALE: "nam",
  FEMALE: "nữ",
};

const NUMBER_STATE = {
  USED: "đã khám",
  NOT_USE: "chưa khám",
  CANCEL: "hủy",
  EXPIRED: "quá hạn",
};

const EMOTION = {
  GREAT: "tuyệt vời",
  HAPPY: "rất vui",
  NORMAL: "tạm ổn",
  SAD: "buồn",
  ANGRY: "giận dữ",
};

//ENUM ('pending', 'confirmed', 'denied', 'cancel', 'transported','completed'),
const ONLINE_BILL_STATUS = {
  PENDING: "pending",
  CONFIRMED: "confirmed",
  DENIED: "denied",
  CANCEL: "cancel",
  TRANSPORTED: "transported",
  COMPLETED: "completed",
};

const MEDICAL_BILL_STATUS = {
  PAID: "đã thanh toán",
  UNPAID: "chưa thanh toán",
};

const SESSION = {
  AM: "Sáng",
  PM: "Chiều",
};

module.exports = {
  ROLES,
  GENDER,
  NUMBER_STATE,
  EMOTION,
  ONLINE_BILL_STATUS,
  MEDICAL_BILL_STATUS,
  SESSION,
};
