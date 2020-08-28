const express = require('express')
const router = express.Router()
const bodyParser = require('body-parser')

const cors = require('cors')
router.use(cors())
router.use(bodyParser.json())
const mysqlConnection = require('../../mysql')


const subscriptions = []



router.post('/subscribe', (request, response) => {
  console.log('PushSubscription', request.body.body.pushSubscription);
  subscriptions.push(request.body.body.pushSubscription)


  mysqlConnection.query(
    `UPDATE userdetails SET pushSubscription = ${mysqlConnection.escape(JSON.stringify(request.body.body.pushSubscription))}, pubprivkeys = ${mysqlConnection.escape(JSON.stringify(request.body.body.pubprivkeys))}
     WHERE id = ${mysqlConnection.escape(request.body.body.userId)} ;`, (err, result) => {
      if (err) {
        console.log(err)
        return response.status(500).send()
      }


    });

 

  response.send()
})




module.exports = router
