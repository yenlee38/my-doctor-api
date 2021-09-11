const util = require("util");
const multer = require("multer");
const maxSize = 8*1024*1024;

let storage = multer.diskStorage({
    destination: (req, file, cb) =>{
        cb(null, __basedir + )
    }
})

