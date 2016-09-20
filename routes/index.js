'use strict'

const {Router} = require('express')
const router = Router()
const bcrypt = require('bcrypt')
const contact = require('../models/contact')
const order = require('../models/order')
const size = require('../models/size')
const topping = require('../models/topping')
const User = require('../models/user')


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

router.get('/login', (req, res) => {
  res.render('login', {
    title: 'login'
  })
})



router.post('/login', ({session, body: { email, password } }, res, err) => {
  User.findOne({ email })
    .then(user => {
      if (user) {
        return new Promise((resolve, reject) => {
          bcrypt.compare(password, user.password, (err, matches) => {
            if (err) {
              reject(err)
            } else {
              resolve(matches)
            }
          })
        })
      } else {
        res.render('login', { msg: 'Email does not exist in our system' })
      }
    })
    .then((matches) => {
      if (matches) {
        session.email = email
        res.redirect('/')
      } else {
        res.render('login', { msg: 'Password does not match' })
      }
    })
    .catch(err)
})



router.get('/register', (req, res) => {
  res.render('register',{
    title: 'register'
  })
})


router.post('/register', ({ body: { email, password, confirmation } }, res, err) => {
  if (password === confirmation) {
    console.log('hello')
    User.findOne({ email })
      .then(user => {
        if (user) {
          res.render('register', { msg: 'Email is already registered' })
        } else {
          return new Promise((resolve, reject)=>{

          bcrypt.hash(password, 15, (err, hash)=> {
            if(err) {
              reject(err)
            }else{
              resolve(hash)
            }
          })
        })
      }
    })
         .then(hash => User.create({ email, password: hash }))
      .then(() => res.redirect('/login'), { msg: 'User created' })
      .catch(err)
  } else {
    res.render('register', { msg: 'Password & password confirmation do not match' })
  }
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


router.post('/logout', (req, res) => {
  req.session.destroy(err => {
    if (err) throw err
    res.redirect('/login')
  })
})


////guard middleware\\\\\
router.use((req, res, next) => {
  console.log(req.session)
  if (req.session.email) {
    next()
  } else {
    res.redirect('/login')
  }
})

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


// router.get('/logout', (req, res) => {
//   if (req.session.email) {
//     res.render('logout', { page: 'Logout'})
//   } else {
//     res.redirect('/login')
//   }
// })
router.get('/logout', (req, res) =>
  res.render('logout', { page: 'Logout'})
)



module.exports = router
