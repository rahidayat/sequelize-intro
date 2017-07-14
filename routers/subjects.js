const express = require('express');
const router = express.Router();
const model = require ('../models');

router.get('/', (req, res) => {
  model.Subject.findAll().then(row => {
    res.render('subjects', {subject_data: row});
  })
})

router.get('/add', (req, res) => {
  model.Subject.findAll().then(row => {
    model.Subject.findAll().then(row2 => {
      res.render('add-subjects', {subject_data: row, teachers_data: row2})
    })
  })
})

router.post('/add', (req, res) => {
  model.Subject.create(req.body)
  .then(row => {res.redirect('/subjects')})
})

module.exports = router
