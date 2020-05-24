const aws = require('@/services/aws.js')
const multer = require('multer')
var multerS3 = require('multer-s3')

const fileFilter = (req, file, cb) => {
  if (file.mimetype === 'image/jpeg'
    || file.mimetype === 'image/png'
    || file.mimetype === 'image/jpg') {
    cb(null, true)
  } else {
    cb(null, false)
    return cb(new Error('Only .png, .jpg and .jpeg format allowed!'));
  }
}

var upload = multer({ 
  fileFilter: fileFilter,
  limits: {
    fileSize: 1024 * 1024 * 5 //1024 bytes * 1024 kb * 5 we are allowing only 5 MB files
  },
  storage: multerS3({
    s3: aws.s3,
    bucket: aws.bucket,
    cacheControl: 'max-age=31536000',
    metadata: function (req, file, cb) {
      cb(null, { fieldName: file.fieldname });
    },
    contentType: multerS3.AUTO_CONTENT_TYPE,
    acl: 'public-read',
    key: function (req, file, cb) {
      cb(null, Date.now().toString() + file.originalname)
    },
  })
})

module.exports = upload