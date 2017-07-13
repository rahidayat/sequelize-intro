const express = require('express');
const router = express.Router();
const model = require ('../models');

router.get('/', (req, res) => {
  model.Students.findAll().then(row => {
    res.send(row)
    // res.render('teachers', {teacher_data: row})
  })
})




module.exports = router
