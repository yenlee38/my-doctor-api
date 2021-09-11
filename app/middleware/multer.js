const multer = require("multer");
const path = require("path"); 
// Multer config
exports.uploadImage = multer({
  storage: multer.diskStorage({}),
  fileFilter: (req, file, cb) => {
    let ext = path.extname(file.originalname);
      if (ext.toLocaleLowerCase() !== ".jpg".toLocaleLowerCase() && ext.toLocaleLowerCase() !== ".jpeg".toLocaleLowerCase() && ext.toLocaleLowerCase() !== ".png".toLocaleLowerCase() && ext !== ".pdf".toLocaleLowerCase() ) {
      cb(new Error("File type is not supported"), false);
      return;
    }
    cb(null, true);
  },
});

exports.upload = multer({
  storage: multer.diskStorage({}),
  fileFilter: (req, file, cb) => {
    let ext = path.extname(file.originalname);
      if (ext !== ".pdf") {
      cb(new Error("File type is not supported"), false);
      return;
    }
    cb(null, true);
  },
});

// const multerStorage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, "");
//   },
//   filename: (req, file, cb) => {
//     const ext = file.mimetype.split("/")[1];
//     cb(null, `files/admin-${file.fieldname}-${Date.now()}.${ext}`);
//   },
// });

// const multerFilter = (req, file, cb) => {
//   if (file.mimetype.split("/")[1] === "pdf") {
//     cb(null, true);
//   } else {
//     cb(new Error("Not a PDF File!!"), false);
//   }
// };

// exports.upload = multer({
//   storage: multerStorage,
//   fileFilter: multerFilter,
// });





