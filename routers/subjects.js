const express = require('express');
const router = express.Router();
const model = require ('../models');

router.get('/', (req, res) => {
  model.Subject.findAll({
    include: [model.Teacher]
  })
  .then(row => {
    res.render('subjects', {subject_data: row});
    // console.log('--------'+JSON.stringify(row[0], null, 2))
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


router.get('/:id/enrolledstudents', (req, res) => {
  model.StudentSubject.findAll({
    where: {SubjectId: req.params.id},
    include: [{all: true}]
  })
  .then(row => {
      res.render('enrolledstudents', {enrolled_data: row})
      // console.log('---++--------+++'+row);
    })
})

router.get('/:id/givescore', (req, res) => {
  model.Student.findById({
    where: {id: req.params.id}
  })
  .then(row => {
    model.Subject.findAll()
    .then(row2 => {
        res.render('givescore', {students_data: row, subjects_data: row2})
    })
  })
})

module.exports = router
