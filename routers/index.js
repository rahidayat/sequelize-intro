const express = require('express');
const router = express.Router();


router.get('/', function (req, res) {
  res.render('index', {
    title: 'My Website is KRS Online'
  })
})

router.get('/login', function(req, res) {
  res.render('login', {
    title: 'Login User'
  })
})

router.use(function (req, res, next) {
  console.log('Time:', Date.now())
  next()
})


module.exports = router
