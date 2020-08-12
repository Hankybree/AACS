const WebSocketServer = require('ws').Server
const express = require('express')
const mysqlConnection = require('./mysql')
const bcrypt = require('bcryptjs')
const cors = require('cors')
const bodyParser = require("body-parser");
const app = express()
const port = 8000


const server = app.listen(port, () => {
    console.log('Listening on port: ' + port)
})

let clients = []
let id = 0

const wss = new WebSocketServer({ server: server })

app.use('/auth', require('./routes/auth/'))
app.use('/upload', require('./routes/uploads/'))

app.use(bodyParser.json());
app.use(cors());
app.use(express.json());

//Login
app.post('/login', (request, response) => {
    //Pending Jonathan's input
})

//Sign-up
app.post('/signUp', (request, response) => {
    let credentails = {
        username: request.body.username,
        email: request.body.email,
        password: request.body.email
    }

    bcrypt.hash(credentails.password, 10, function(err, hash){
        if(err) throw err
        
        mysqlConnection.query(`INSERT INTO userdetails (username, email, password) VALUES(${mysqlConnection.escape(credentails.username)}, ${mysqlConnection.escape(credentails.email)}, ${mysqlConnection.escape(hash)})`, function(err, result) {
            if(err) {
                return response.status(401).send()
            }
            return response.status(201).send({
                message: "Registration succeded!"
            })
        })
    })    
})

//Reset password
app.post('/reset-password', (request, response) => {
    //Pending Jonathan's input
})