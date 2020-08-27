const express = require('express')
const router = express.Router()
const cors = require('cors')
const uuid = require('uuid')
const mysqlConnection = require('../../mysql')
const WebSocketServer = require('ws').Server
const server = require('../../server.js')
const bodyParser = require('body-parser')
const moment = require('moment')

const webPush = require('web-push')




router.use(cors())
router.use(bodyParser.json())

let clients = []

const wss = new WebSocketServer({ server: server })

wss.on('connection', (socket, request) => {
  console.log(request.socket.remoteAddress + ' has connected')
  console.log('Clients conntected: ' + wss.clients.size)

  clients.push(socket)

  socket.onmessage = (message) => {
    let data = JSON.parse(message.data)
    console.log(data)

    if (data.status === 1) {
      console.log(data.msg)
    } else if (data.status === 2) {
      like(data, 2)
    } else if (data.status === 3) {
      comment(data, 3)
    } else if (data.status === 4) {
      deleteComment(data, 4)
    }
  }

  socket.onclose = () => {
    console.log(request.socket.remoteAddress + ' has disconnected')
    console.log('Clients conntected: ' + wss.clients.size)

    // Remove socket from client list
    clients.splice(clients.indexOf(socket), 1)

    // Close socket
    socket.close()
  }
})

router.post('/feed', (req, res) => {
  getImages(req.body.currentPage, 5).then((images) => {
    res.send(JSON.stringify(images))
  })
})

router.post('/grid', (req, res) => {
  getImages(req.body.currentPage, 50).then((images) => {
    res.send(JSON.stringify(images))
  })
})

function getImages(currentPage, limit) {
  return new Promise((resolve) => {
    mysqlConnection.query(
      'SELECT * FROM images ORDER BY creationTime DESC LIMIT ? OFFSET ?',
      [limit, currentPage * limit],
      (err, images) => {
        if (err) throw err

        mysqlConnection.query(
          'SELECT imageId, imageUserId, likeId, likeImageId, likeUserId, commentId, commentImageId, commentUserId, commentMessage, commentCreationTime, username FROM images LEFT JOIN likes ON images.imageId = likes.likeImageId LEFT JOIN comments ON images.imageId = comments.commentImageId LEFT JOIN userdetails ON images.imageUserId = userdetails.id',
          (err, imageData) => {
            if (err) throw err

            for (let i = 0; i < images.length; i++) {
              let likes = []
              let comments = []

              for (let j = 0; j < imageData.length; j++) {
                if (
                  imageData[j].likeImageId === images[i].imageId &&
                  !likes.includes(imageData[j].likeUserId)
                ) {
                  likes.push(imageData[j].likeUserId)
                }

                if (
                  imageData[j].commentImageId === images[i].imageId &&
                  !comments.some(
                    (comment) => comment.commentId === imageData[j].commentId
                  )
                ) {
                  comments.push({
                    commentId: imageData[j].commentId,
                    commentUserId: imageData[j].commentUserId,
                    commentMessage: imageData[j].commentMessage,
                    commentCreationTime: imageData[j].commentCreationTime
                  })
                }

                resolve(images)
              }

              images[i].likes = likes
              images[i].comments = comments.sort(
                (a, b) =>
                  new Date(b.commentCreationTime) -
                  new Date(a.commentCreationTime)
              )
            }

            resolve(images)
          }
        )
      }
    )
  })
}

function like(data, status) {
  mysqlConnection.query(
    'SELECT * FROM likes WHERE likeImageId=?',
    [data.likeImageId],
    (err, likes) => {
      if (err) throw err

      let likeData = {
        status: status,
        likeImageId: data.likeImageId,
        likeUserId: data.likeUserId
      }

      if (
        likes !== undefined &&
        likes.some((like) => like.likeUserId === data.likeUserId)
      ) {
        mysqlConnection.query(
          'DELETE FROM likes WHERE (likeUserId=? AND likeImageId=?)',
          [data.likeUserId, data.likeImageId],
          (err) => {
            if (err) throw err

            clients.forEach((client) => {
              likeData.isLiking = false
              client.send(JSON.stringify(likeData))
            })
          }
        )
      } else {
        mysqlConnection.query(
          'INSERT INTO likes (likeImageId, likeUserId) VALUES (?, ?)',
          [data.likeImageId, data.likeUserId],
          (err) => {
            if (err) throw err

            mysqlConnection.query(`SELECT * FROM userdetails WHERE id = ${mysqlConnection.escape(data.likeUserId)}`, (err, result) => {
              if (err) throw err
              if (result.length > 0) {


                mysqlConnection.query(`SELECT username, pushSubscription, pubprivkeys FROM images 
                INNER JOIN userdetails ON userdetails.id = imageUserId
                WHERE imageId = ${mysqlConnection.escape(data.likeImageId)}`, (err, result2) => {
                  webPush.setVapidDetails(
                    'mailto:picnet@aviliax.com',
                    JSON.parse(result2[0].pubprivkeys).pub,
                    JSON.parse(result2[0].pubprivkeys).priv
                  )
  
                  webPush.sendNotification(
                    JSON.parse(result2[0].pushSubscription),
                    JSON.stringify({
                      body: result[0].username + ' spocked your image',
                      title: 'New spock!'
                    })
                  )

                });

            
              }

            })


            clients.forEach((client) => {
              likeData.isLiking = true
              client.send(JSON.stringify(likeData))
            })
          }
        )
      }
    }
  )
}

function comment(data, status) {
  const token = uuid.v4()
  const timeStamp = new Date(moment().format())

  mysqlConnection.query(
    'INSERT INTO comments (commentId, commentImageId, commentUserId, commentMessage, commentCreationTime) VALUES (?, ?, ?, ?, ?)',
    [
      token,
      data.commentImageId,
      data.commentUserId,
      data.commentMessage,
      timeStamp
    ],
    (err) => {
      if (err) throw err

      clients.forEach((client) => {
        client.send(
          JSON.stringify({
            status: status,
            commentId: token,
            commentImageId: data.commentImageId,
            commentUserId: data.commentUserId,
            commentMessage: data.commentMessage,
            commentCreationTime: timeStamp
          })
        )
      })
    }
  )
}

function deleteComment(data, status) {
  mysqlConnection.query(
    'DELETE FROM comments WHERE (commentId=?)',
    [data.commentId],
    (err) => {
      if (err) throw err

      clients.forEach((client) => {
        client.send(
          JSON.stringify({
            status: status,
            imageId: data.imageId,
            commentId: data.commentId
          })
        )
      })
    }
  )
}

//Get images for user
router.post('/getImagesFromUser', (req, res) => {
  mysqlConnection.query(
    `SELECT * FROM images WHERE imageUserId = ${mysqlConnection.escape(
      req.body.userId
    )}`,
    (err, result) => {
      if (err) {
        return res.status(504).send({
          message: 'Check your network connection'
        })
      }
      if (result.length) {
        return res.status(200).send({
          images: result
        })
      }
    }
  )
})

module.exports = router
