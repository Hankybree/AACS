const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const express = require('express')
const uuid = require('uuid')
const router = express.Router()
const bodyParser = require('body-parser')

const cors = require('cors')
router.use(cors())
router.use(bodyParser.json())

const mysqlConnection = require('../../mysql')
const transporter = require('../../mailer')

router.post('/checkIfValidSession', (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1]
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    res.status(200).send(decoded)
  } catch (err) {
    return res.status(401).send({
      msg: 'Your session is not valid!'
    })
  }
})

// Login
router.post('/login', (req, res, next) => {
  mysqlConnection.query(
    `SELECT * FROM userdetails WHERE email = ${mysqlConnection.escape(
      req.body.emailUsername
    )} OR username = ${mysqlConnection.escape(req.body.emailUsername)};`,
    (err, result) => {
      if (err) {
        console.log(err)
        return res.status(500).send()
      }

      if (!result.length) {
        return res.status(401).send({
          msg: 'Felaktigt användarnamn eller lösenord'
        })
      }

      if (result[0].confirmed === 0) {
        return res.status(401).send({
          msg: 'Please confirm your email address first!'
        })
      }

      bcrypt.compare(
        req.body.password,
        result[0]['password'],
        (bErr, bResult) => {
          if (bErr) {
            console.log(bErr)
            return res.status(401).send({
              msg: 'Felaktigt lösenord'
            })
          }
          if (bResult) {
            const token = jwt.sign(
              {
                email: result[0].email,
                userId: result[0].id
              },
              process.env.JWT_SECRET,
              {
                expiresIn: '7d'
              }
            )
            console.log('Logged in: ' + result[0].email)
            delete result[0].password
            return res.status(200).send({
              token,
              user: result[0]
            })
          }
          return res.status(400).send({
            msg: 'Felaktigt användarnamn eller lösenord'
          })
        }
      )
    }
  )
})

// Signup
router.post('/signup', (req, res, next) => {
  console.log(req.body.email + ' <--')

  if (!validateEmail(req.body.email)) {
    return res.status(400).send({
      msg: 'Enter a valid email'
    })
  }

  if (!req.body.email) {
    return res.status(400).send({
      msg: 'Enter an email'
    })
  }

  mysqlConnection.query(
    `SELECT * FROM userdetails WHERE LOWER(email) = LOWER(${mysqlConnection.escape(
      req.body.email
    )}) 
  OR LOWER(username) = LOWER(${mysqlConnection.escape(req.body.username)});`,
    (err, result) => {
      if (err) {
        console.log(err)
        return res.status(500).send()
      }

      if (result.length) {
        if (result[0].email == req.body.email) {
          return res.status(409).send({
            msg: 'This email already exists!'
          })
        } else if (result[0].username == req.body.username) {
          return res.status(409).send({
            msg: 'This username already exists!'
          })
        }
      }

      if (!req.body.username) {
        return res.status(400).send({
          msg: 'Enter an username'
        })
      }

      if (!req.body.password || req.body.password.length < 5) {
        return res.status(400).send({
          msg: 'Enter a password with atleast 6 characters'
        })
      }

      if (
        !req.body.repeatPassword ||
        req.body.password != req.body.repeatPassword
      ) {
        return res.status(400).send({
          msg: 'Passwords does not match!'
        })
      }

      const token = uuid.v4()

      bcrypt.hash(req.body.password, 10, (err, hash) => {
        mysqlConnection.query(
          `INSERT INTO userdetails (id, email, password, username, authToken) 
      VALUES (${mysqlConnection.escape(uuid.v4())}, ${mysqlConnection.escape(
            req.body.email
          )}, ${mysqlConnection.escape(hash)}, ${mysqlConnection.escape(
            req.body.username
          )}, ${mysqlConnection.escape(token)})`,
          (err, result) => {
            if (err) {
              console.log(err)
              return res.status(500).send()
            }
            console.log(`${process.env.HOST}/auth/confirm/${token}`)
            var mailOptions = {
              from: 'PicNet <PicNet@aviliax.com>',
              to: req.body.email,
              subject: 'Confirm your email',
              html: `Hello! Please <a href="http://${process.env.HOST}/auth/confirm/${token}">Confirm your email</a>`
            }

            transporter.sendMail(mailOptions, function (error, info) {
              if (error) {
                console.log(error)
              } else {
                console.log('Email sent: ' + info.response)
              }
            })

            return res.status(201).send({
              msg: 'Registration succeded! Check your email for confirmation!'
            })
          }
        )
      })
    }
  )
})

//Validate email
function validateEmail(email) {
  var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  return re.test(email)
}

//Confirm email
router.post('/confirm', (req, res, next) => {
  mysqlConnection.query(
    `SELECT confirmed FROM userdetails WHERE authToken = ${mysqlConnection.escape(
      req.body.token
    )};`,
    (err, result) => {
      if (err) {
        console.log(err)
        return res.status(500).send()
      }

      if (!result.length) {
        return res.status(401).send({
          msg: 'Invalid key'
        })
      }

      if (result[0].confirmed == 1) {
        return res.status(409).send({
          msg: 'Email already confirmed!'
        })
      }

      mysqlConnection.query(
        `UPDATE userdetails SET confirmed = 1, authToken = '' WHERE authToken = ${mysqlConnection.escape(
          req.body.token
        )}`,
        (err, result) => {
          if (err) {
            console.log(err)
            return res.status(500).send()
          }
          return res.status(200).send({
            msg: 'Email confirmed!'
          })
        }
      )
    }
  )
})

//Forgot password
router.post('/forgot', (req, res, next) => {
  if (!req.body.changingPass) {
    const token = uuid.v4()

    mysqlConnection.query(
      `SELECT * FROM userdetails WHERE email = ${mysqlConnection.escape(
        req.body.email
      )};`,
      (err, result) => {
        if (err) {
          console.log(err)
          return res.status(500).send()
        }

        if (!result.length) {
          return res.status(200).send({
            msg: 'Please check your email'
          })
        }

        mysqlConnection.query(
          `UPDATE userdetails SET authToken = '${token}' WHERE email = ${mysqlConnection.escape(
            req.body.email
          )}`
        )

        var mailOptions = {
          from: 'PicNet <PicNet@aviliax.com>',
          to: req.body.email,
          subject: 'Forgot password?',
          html: `<a href="http://${process.env.HOST}/auth/forgot/${token}">Create a new password</a>`
        }

        transporter.sendMail(mailOptions, function (error, info) {
          if (error) {
            console.log(error)
          } else {
            console.log('Forgot email sent: ' + info.response)
          }
        })

        return res.status(200).send({
          msg: 'Please check your email'
        })
      }
    )
  } else {
    bcrypt.hash(req.body.newPassword, 10, (err, hash) => {
      if (err) {
        console.log(err)
        return res.status(500).send()
      }

      mysqlConnection.query(
        `SELECT authToken FROM userdetails WHERE authToken = ${mysqlConnection.escape(
          req.body.token
        )}`,
        (err, result) => {
          if (err) {
            console.log(err)
            return res.status(500).send()
          }

          if (!result.length > 0) {
            return res.status(409).send({
              msg: 'Password is already updated!'
            })
          }

          if (
            !req.body.repeatPassword ||
            req.body.newPassword != req.body.repeatPassword
          ) {
            return res.status(403).send({
              msg: 'Password does not match!'
            })
          }

          mysqlConnection.query(
            `UPDATE userdetails SET password = ${mysqlConnection.escape(
              hash
            )}, authToken = '', confirmed = 1 WHERE authToken = ${mysqlConnection.escape(
              req.body.token
            )}`,
            (err, result) => {
              if (err) {
                console.log(err)
                return res.status(500).send()
              }

              return res.status(200).send({
                msg: 'Password is changed!'
              })
            }
          )
        }
      )
    })
  }
})

//Reset password
router.post('/reset', (req, res, next) => {

  mysqlConnection.query(`SELECT * FROM userdetails WHERE id = ${mysqlConnection.escape(req.body.userId)}`, (err, result) => {
    if (err) {
      console.log(err)
      return res.status(500).send()
    }

    bcrypt.compare(req.body.oldPass, result[0]['password'], function (bErr, bResult) {
      if (bErr) {
        return res.status(500).send()
      }

      if (!bResult) {
        return res.status(400).send({
          msg: 'Wrong password'
        })
      }

      if (bResult) {

        if (!req.body.newPassword || req.body.newPassword.length < 5) {
          return res.status(400).send({
            msg: 'Enter a password with atleast 6 characters'
          });
        }

        if (!req.body.repeatPassword || req.body.newPassword != req.body.repeatPassword) {
          return res.status(400).send({
            msg: 'Passwords does not match!'
          });
        }

        bcrypt.hash(req.body.newPassword, 10, (cErr, hash) => {
          if (cErr) {
            console.log(cErr);
            return res.status(500).send();
          }

          mysqlConnection.query(
            `UPDATE userdetails SET password = ${mysqlConnection.escape(hash)} WHERE id = ${mysqlConnection.escape(req.body.userId)}`, (dErr, dResult) => {
              if (dErr) {
                console.log(dErr);
                return res.status(500).send();
              }

              return res.status(200).send({
                msg: 'Password successfully changed',
              });
            }
          )
        })
      }
    })
  })
})

module.exports = router
