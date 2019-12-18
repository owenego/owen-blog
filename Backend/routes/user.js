const crypto = require('crypto')
const User = require('../models/user')
const router = require('express').Router();
const md5 = password => crypto.createHash('md5').update(password).digest('hex')

// login
router.post('/login', (req, res) => {
  try {
    if (req.session.userInfo) {
      res.json({ success: true, message: "already login.", data: req.session.userInfo })
      return
    }

    const { name, password } = req.body
    User.findOne({ name, password: md5(password) })
      .then(data => {
        if (data) {
          req.session.userInfo = data;
          res.json({ success: true, message: "login succeed.", data })
          return
        } else {
          res.json({ success: false, message: "err username or password." })
          return
        }
      })
      .catch(err => {
        res.json({ success: false, message: err ? err : "login failed." })
        return
      });
  } catch (err) {
    res.json({ success: false, message: err ? err : "login failed." })
  }
})

router.post('/logout', (req, res) => {
  if (req.session.userInfo) {
    req.session.userInfo = null;

    res.json({ success: true, message: "logout succeed." })
    return
  } else {
    res.json({ success: false, message: "not login yet!" })
    return
  }
})

router.post('/', (req, res) => {
  const { name, password } = req.body
  new User({ name, password: md5(password) })
    .save()
    .then(data => {
      if (data) {
        res.json({ success: true, message: "add new user succeed.", data })
        return
      }
    })
    .catch(err => {
      res.json({ success: false, message: err ? err : "add new user failed." })
      return
    });
})
module.exports = router;