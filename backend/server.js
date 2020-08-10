const WebSocketServer = require('ws').Server
const express = require('express')
const app = express()
const port = 8000

const server = app.listen(port, () => {
    console.log('Listening on port: ' + port)
})

let clients = []
let id = 0

const wss = new WebSocketServer({ server: server })