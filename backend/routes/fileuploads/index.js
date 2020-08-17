const express = require('express')
const router = express.Router()
const multer = require('multer')
const cors = require('cors')
router.use(cors());

// Filter to these filetypes
const fileFilter = function (req, file, cb) {
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif']

    if (!allowedTypes.includes(file.mimetype)) {
        const error = new Error('Wrong filetype')
        error.code = 'LIMIT_FILE_TYPES'
        return cb(error, false)
    }

    cb(null, true)
}

const MAX_SIZE = 400000 // 400 kb - temporary
// Points to directory which stores files.
const upload = multer({
    dest: './uploadedfiles/',
    fileFilter,
    limits: {
        fileSize: MAX_SIZE
    }
})

router.post('/upload', upload.array('files'), (req, res, next) => {

        res.status(200).send(JSON.stringify({
            msg: 'Uploaded successfully!'
        })) 
})
// Runs when callback returns error
router.use(function (err, req, res, next) {

    if (err.code === 'LIMIT_FILE_TYPES') {
        res.status(422).json({ error: 'Only images allowed' })
        return
    }

    if (err.code === 'LIMIT_FILE_SIZE') {
        res.status(422).json({ error: `Too large. Max size is ${MAX_SIZE / 1000}KB` })
    }
});

module.exports = router;