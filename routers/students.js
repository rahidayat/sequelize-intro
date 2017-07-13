const express = require('express');
const router = express.Router();
const model = require ('../models');

router.get('/', (req, res) => {
  model.Student.findAll().then(row => {
    // res.send(row)
    res.render('students', {students_data: row})
  })
})

router.get('/add', (req, res) => {
    res.render('add-students')
})

router.post('/add', (req, res) => {
  model.Student.create({
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    email: req.body.email,
    createdAt: new Date(),
    updatedAt: new Date()
  }).then(row => {res.redirect('/students')})

})

router.get('/delete/:id', (req, res) => {
  model.Student.destroy({where: {id: req.params.id}})
  .then(roe => {res.redirect('/students')})
})



module.exports = router
