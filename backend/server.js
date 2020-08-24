const express = require('express')
const bcrypt = require('bcryptjs')
const cors = require('cors')
const bodyParser = require("body-parser");
const app = express()
const port = 8000
require('dotenv-flow').config();
const mysqlConnection = require('./mysql')

const server = app.listen(port, () => {
    console.log('Listening on port: ' + port)
})

module.exports = server

app.use('/api/images', require('./routes/images'))
app.use('/api/auth', require('./routes/auth/'))
app.use('/api/fileuploads', require('./routes/fileuploads/'))

app.use(bodyParser.json());
app.use(cors());
app.use(express.json());

