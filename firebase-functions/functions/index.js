const functions = require('firebase-functions')
const crypto = require('crypto')
const admin = require('firebase-admin')
admin.initializeApp(functions.config().firebase)

const BASECHARACTER = {
  name: '',
  qualities: [
  ]
}

let express = require('express')
let bodyParser = require('body-parser')
let app = express()
let cors = require('cors')
app.use(bodyParser.json())
app.use(cors())

app.post('/register', (req, res) => {
  const salt = crypto.randomBytes(10).toString('hex')
  admin.database().ref(`/users/${req.body.username}`).once('value')
    .then(snapshot => {
      if (!snapshot.exists()) {
        let newCharacter = BASECHARACTER
        newCharacter.name = req.body.username
        admin.database().ref(`/users/${req.body.username}`).set({
          email: req.body.email,
          password: crypto.createHash('sha256').update(req.body.password + salt).digest('hex'),
          salt: salt,
          character: newCharacter
        }).then(() => res.status(200).send())
      } else {
        res.status(404).send()
      }
    })
})

app.post('/login', (req, res) => {
  admin.database().ref(`/users/${req.body.username}`).once('value')
    .then(snapshot => {
      if (snapshot.exists()) {
        const user = snapshot.val()
        const pass = crypto.createHash('sha256').update(req.body.password + user.salt).digest('hex')
        if (user.password === pass) {
          res.status(200).send(user.character)
        }
      }
      res.status(404).send('Username not found or incorrect password')
    })
})

exports.api = functions.https.onRequest(app)
