const express = require('express');
const router = express.Router();
const model = require ('../models');
const huruf = require ('../helpers/scoreletter')

router.get('/', (req, res) => {
  model.Subject.findAll({
    include: [model.Teacher]
  })
  .then(row => {
    res.render('subjects', {
      title: 'Data Subject',
      subject_data: row
    });
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
    include: [{all: true}],
    order:[['Student','first_name', 'ASC']]
  })
  .then(row => {
    row.forEach(r => {
      r.letter = huruf (r.score)
    })
    res.render('enrolledstudents', {
      title: 'Enrolled Students',
      enrolled_data: row})
      // console.log('---++--------+++'+row);
  })
})

router.get('/:id/givescore', (req, res) => {
  model.StudentSubject.findAll({
    where: {id: req.params.id},
    include: [{all: true}]
  })
  .then(row => {
    res.render('givescore', {ss_data: row})
  })
})

router.post('/:id/givescore', (req, res) => {
  model.StudentSubject.update({
    score: req.body.score,
    createdAt: new Date(),
    updatedAt: new Date()
  },{
    where: {id: req.params.id}
  })
  .then(row => {
    res.redirect(`/subjects`)
  })
})

module.exports = router
