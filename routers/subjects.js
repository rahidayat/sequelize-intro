const express = require('express');
const router = express.Router();
const model = require ('../models');

router.get('/', (req, res) => {
  model.Subjects.findAll().then(row => {
    res.render('subjects', {subject_data: row});
  })
})




module.exports = router
