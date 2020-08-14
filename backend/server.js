const WebSocketServer = require('ws').Server
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

let clients = []
let id = 0

const wss = new WebSocketServer({ server: server })

app.use('/auth', require('./routes/auth/'))
app.use('/fileuploads', require('./routes/fileuploads/'))

app.use(bodyParser.json());
app.use(cors());
app.use(express.json());

