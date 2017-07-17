const express = require('express');
const router = express.Router();


router.get('/', function (req, res) {
  res.render('index', {
    title: 'My Website is KRS Online'
  })
})




module.exports = router
