const express = require('express');
const router = express.Router();
const model = require ('../models');

router.get('/', (req, res) => {
  model.Teacher.findAll({
    include: [model.Subject]
  })
  .then(row => {
    res.render('teachers', {teacher_data: row})
  })
})

router.get('/add', (req, res) => {
  model.Teacher.findAll().then(row => {
    model.Subject.findAll().then(row2 => {
      res.render('add-teachers', {teacher_data: row, subject_data: row2})
    })
  })
})

router.post('/add', (req, res) => {
  model.Teacher.create(req.body)
  .then(row => {res.redirect('/teachers')})
})


router.get('/delete/:id', (req, res) => {
  model.Teacher.destroy({
    where: {id: req.params.id}
  })
  .then(row => {res.redirect('/teachers')})
})

router.get('/edit/:id', (req, res) => {
  model.Teacher.findAll({
    where: {id: req.params.id}
  })
  .then(row => {
    model.Subject.findAll()
      .then(row2 => {
        res.render('edit-teachers', {teachers_data: row, subjects_data:row2})
      })
  })
})

router.post('/edit/:id', (req, res) => {
  model.Teacher.update(req.body,{
    where: {id: req.params.id}
  })
  .then(row => {res.redirect('/teachers')})
  .catch(err => {console.log(err)} )
})

module.exports = router
