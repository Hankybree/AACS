const express = require('express')
const mysqlConnection = require('./mysql')
const bcrypt = require('bcryptjs')
const cors = require('cors')
const bodyParser = require("body-parser");
const app = express()
const port = 8000
require('dotenv-flow').config();

const server = app.listen(port, () => {
    console.log('Listening on port: ' + port)
})

module.exports = server

app.use('/images', require('./routes/images'))
app.use('/auth', require('./routes/auth/'))
app.use('/fileuploads', require('./routes/fileuploads/'))

app.use(bodyParser.json());
app.use(cors());
app.use(express.json());

