const express = require('express');
const router = express.Router();
const model = require ('../models');

router.get('/', (req, res) => {
  model.Student.findAll({
    order:[['first_name', 'ASC']]
  })
  .then(row => {
    // res.send(row)
    res.render('students', {
      title: 'Data Students',
      students_data: row})
  })
})

router.get('/add', (req, res) => {
    res.render('add-students', {
      title: 'Add Student'
    })
})

router.post('/add', (req, res) => {
  model.Student.create({
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    email: req.body.email,
    createdAt: new Date(),
    updatedAt: new Date()
  })
  .then(row => {res.redirect('/students')})

})

router.get('/delete/:id', (req, res) => {
  model.Student.destroy({
    where: {id: req.params.id}
  })
  .then(row => {res.redirect('/students')})
})

router.get('/edit/:id', (req, res) => {
  model.Student.findAll({
    where: {id: req.params.id}
  })
  .then(row => {res.render('edit-students', {students_data: row})})
})

router.post('/edit/:id', (req, res) => {
  model.Student.update({
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    email: req.body.email,
    createdAt: new Date(),
    updatedAt: new Date()
  },{
    where: {id: req.params.id}
  })
  .then(row => {res.redirect('/students')})
  .catch(err => {email.validate.msg})
})

router.get('/:id/addsubject', (req, res) => {
  model.Student.findAll({where: {id: req.params.id}})
  .then(row => {
    model.Subject.findAll()
    .then(row2 => {
      res.render('add-subject-to-student', {students_data: row, subjects_data:row2})
    })
  })
})

router.post('/:id/addsubject', (req,res) => {
  model.StudentSubject.create({
    StudentId: req.params.id,
    SubjectId: req.body.SubjectId,
    createdAt: new Date(),
    updatedAt: new Date()
  })
  .then(row => {res.redirect('/students')})
})



module.exports = router
