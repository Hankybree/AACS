const express = require('express')
const router = express.Router()
const multer = require('multer')
const cors = require('cors')
router.use(cors());

// Filter to these filetypes
// const fileFilter = (req, file, cb) => {
//     const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif']

//     console.log(file.originalname + " <--")
//     console.log("asd?")

//     if (!allowedTypes.includes(file.mimetype)) {
//         const error = new Error('Wrong filetype')
//         error.code = 'LIMIT_FILE_TYPES'
//         return cb(error, false)
//     }

//     cb(null, true)
// }

const uploadFilter = function(req, file, cb) {
    if(!file.originalname.match(/\.(jpg|.jpeg|png|gif)$/)){
        const error = new Error('Invalid filetype')
        error.code = 'LIMIT_FILE_TYPES'
        return cb(error, false)
        cb(null, true)
    }

    cb(null, true)
    
}

const MAX_SIZE = 200000 // 400 kb - temporary
// Points to directory which stores files.
const upload = multer({
    dest: './uploadedfiles/',
    fileFilter: uploadFilter,
    limits: {
        fileSize: MAX_SIZE
    }
})

router.post('/upload', upload.array("files"), (req, res, next) => {
    res.status(200).send(JSON.stringify({
        msg: `Uploaded ${req.files.length} files successfully!`
    })) 
})

// Runs when callback returns error
router.use(function (err, req, res, next) {
    //File type is invalid
    if (err.code === 'LIMIT_FILE_TYPES') {
        return res.status(422).send({
            error: "Only images are allowed!"
        })
    }
    //File size is over max-limit
    if (err.code === 'LIMIT_FILE_SIZE') {
        return res.status(422).send({
            error: `Too large. Max size is ${MAX_SIZE / 1000}KB`
        })

    }
});

module.exports = router;