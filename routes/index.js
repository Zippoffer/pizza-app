'use strict'

const {Router} = require('express')
const router = Router()
// const {db} = require('../database')
const contact = require('../models/contact')
const order = require('../models/order')
const size = require('../models/size')
const topping = require('../models/topping')


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


// const mongoose = require('mongoose')
// const contact = mongoose.model('contact')


router.post('/contact', (req, res) => {
  const msg = new contact(req.body)
  msg.save()

  .then(()=> res.redirect('/'))
  // .catch(()=> res.send('BAD'))
  .catch(next)

})



// router.get('/order', (req, res) => {
//   size.find()
//   .sort({inches: 1})
//   .then( (sizes)=>res.render('order', {page: "order", sizes:sizes}))
//   .catch(console.error)
// })


router.get('/order', (req, res) => {
  Promise
    .all([
    size.find()
    .sort({inches: 1}),
    topping.find()
    .sort({name: 1})
    ])

    .then(([sizes, toppings])=>res.render('order', {page: "order", sizes:sizes, toppings:toppings}))
    .catch(console.error)
})




router.post('/order', (req, res, err)=> {
  order
    .create(req.body)
    .then(()=> res.redirect('/'))
    .catch(err)
    console.log(err)
  // res.redirect('/')
})
// router.post('/contact', (req, res) => {

//   db().collection('contact')
//   .insertOne(req.body)
//   .then(()=> res.redirect('/'))
//   .catch(()=> res.send('BAD'))

// })


module.exports = router
