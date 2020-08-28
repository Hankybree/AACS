const express = require('express')
const bcrypt = require('bcryptjs')
const cors = require('cors')
const bodyParser = require("body-parser");
const app = express()
const http = require('http')
const https = require('https')
const fs = require('fs')
const path = require('path')

const port = 8000
require('dotenv-flow').config();

if (process.env.NODE_ENV == 'production') {
    console.log("Secure Server");
    // Certificate
    var privateKey = fs.readFileSync(path.resolve(__dirname, '/etc/letsencrypt/live/picnet.aviliax.com/privkey.pem'));
    var certificate = fs.readFileSync(path.resolve(__dirname, '/etc/letsencrypt/live/picnet.aviliax.com/fullchain.pem'));
    var sslcredentials = { key: privateKey, cert: certificate };
    var server = https.createServer(sslcredentials, app);
  } else {
      console.log("Unsecure Server");
    var server = http.createServer(app);
  }

server.listen(port, () => {
    console.log('Listening on port: ' + port)
})

module.exports = server

app.use('/api/images', require('./routes/images'))
app.use('/api/auth', require('./routes/auth/'))
app.use('/api/fileuploads', require('./routes/fileuploads/'))
app.use('/api/push', require('./routes/push/'))

app.use(bodyParser.json());
app.use(cors());
app.use(express.json());


