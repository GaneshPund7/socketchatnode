const multer = require('multer');
const path = require('path')
const storage = multer.diskStorage({
    destination: function (req, file, cb){
        cb(null,  path.join(__dirname, 'media'))
    },
    filename: function(req, file, cb){
    cb(null, file.originalname);
    }
})
 
module.exports.upload = multer({ storage: storage }).single('file');
