const express = require('express')
const router = express.Router()
const multer = require('multer')
const cors = require('cors');
const mysqlConnection = require('../../mysql');
const uuid = require('uuid')
const middleware = require('../../middleware/authuser.js')

router.use(cors());
router.use(express.json())
router.use('/uploadedfiles', express.static('uploadedfiles'))

const uploadFilter = function(req, file, cb) {
    if(!file.originalname.match(/\.(jpg|.jpeg|png|gif)$/)){
        const error = new Error('Invalid filetype')
        error.code = 'LIMIT_FILE_TYPES'
        return cb(error, false)
        cb(null, true)
    }

    cb(null, true)
    
}

const MAX_SIZE = 1000 * 1000 * 5 // 400 kb - temporary
// Points to directory which stores files.
const upload = multer({
    dest: './uploadedfiles/',
    fileFilter: uploadFilter,
    limits: {
        fileSize: MAX_SIZE
    }
})

router.post('/', upload.array("files"), middleware.verifyUser, (req, res, next) => {

    if (req.files) {
        req.files.forEach(file => {
            let imagePath = 'http://localhost:8000/fileuploads/' + file.path
            let token = uuid.v4()

            mysqlConnection.query('INSERT INTO images (imageId, imagePath, imageUserId) VALUES (?, ?, ?)', [token, imagePath, req.decoded.userId], (err) => {
                if (err) throw err
                console.log('Databasar')

                res.status(200).send(JSON.stringify({
                    msg: `Uploaded ${req.files.length} files successfully!`
                })) 
            })
        })
    } else {
        res.status(204).send(JSON.stringify({ msg: 'NO_FILES_WAS_SENT' }))
    }
})

router.get('/', (req, res) => {
    mysqlConnection.query('SELECT * FROM images', (err, images) => {
        if (err) throw err

        res.send(JSON.stringify({ msg: 'Här har du dina bilder', data: images }))
    })
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