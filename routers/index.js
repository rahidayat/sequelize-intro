const express = require('express');
const router = express.Router();
const model = require ('../models');


router.get('/', (req, res) => {
  res.render('index', {
    title: 'My Website is KRS Online'
  })
})

router.get('/login', (req, res) => {
  res.render('login', {
    title: 'Login User'
  })
})


router.use(function (req, res, next) {
  // console.log('Time:', Date.now())
  next()
})

router.get('/signup', (req, res) => {
  res.render('signup', {
    title: 'Sign Up New User'
  })
})

router.post('/signup', (req, res) => {
  model.User.create(req.body)
  .then(row => {res.redirect('/login')})
})


module.exports = router
