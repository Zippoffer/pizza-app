'use strict'

const {Router} = require('express')
const router = Router()



				// routes\\
router.get('/', (req, res) => {
  // res.send('this is the pizza')
  res.render('index', {
    // title: 'home'
  })
})
router.get('/about', (req, res) => {
  // res.send('this is the about')
  res.render('about', {
    title: 'about'
  })
})

router.get('/contact', (req, res) => {
  // res.send('this is the contact')
  // console.log(req.query)
  res.render('contact', {
    title: 'contact'
  })
})

router.post('/contact', (req, res) => {
  // res.send('this is the contact')
  console.log(req.body)
  res.redirect('/')
  // res.send(req.body)
})



module.exports = router