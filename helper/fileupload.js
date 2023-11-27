const multer = require('multer')
const util = require('util')
const DIR = './resources/uploads'

const storage = multer.diskStorage({
    destination: (req, file, cb) =>{
      cb(null, DIR)
    },
    filename:  (req, file, cb) =>{
      cb(null, file.originalname)
    }
  })
  
  const upload = multer({ storage: storage }).single('fupload')
  util.promisify(upload)

  const fileupload = util.promisify(upload)

  module.exports = fileupload