'use strict'

const express = require('express')
const app = express() //this creates an instance of express
const bodyParser = require('body-parser')
const chalk = require('chalk')
const {connect} = require('./database')
const routes = require('./routes/') //same as ./routes/index




    //pug environment

app.set('view engine', 'pug');

if (process.env.NODE_ENV !== 'production') {
    app.locals.pretty = true //this makes the html look pretty in the terminal
}
app.locals.company = 'pizza palace' //this sets the name in the tab

app.set('port', process.env.PORT || 3000) //sets port


//middlewares\\

app.use(express.static('public'));


app.use(bodyParser.urlencoded({
    extended: false
}))

app.use((req, res, next) => {
    console.log(chalk.magenta("REQUEST:", `[${Date()}]`, chalk.yellow(`${req.method} ${req.url}`), req.headers['user-agent']))
    next()
})

//routes\\
app.use(routes)

// custom 404 page
app.get('/404', (req, res) => {
    res.render('404')
})

// 404 catch and forward to the error handler
app.use((req, res) => {
    const err = Error('Not Found')
    err.status = 404
    res.render('404')
        // next(err)
})

//error handling middlewares
app.use((err, req, res, next) => {
    console.log(chalk.cyan("REQUEST:", `[${Date()}]`, chalk.yellow(`${req.method} ${req.url}`), req.headers['user-agent']))
    console.log(chalk.red('error occurred'))
        // res.status(500).send('internal server error')
    res.sendStatus(err.status || 500)
})


//this listen for the server and console logs which server is active
connect()
// .then(db=> db = _db)
.then(()=> {

    app.listen(app.get("port"), () => 
        console.log(`Express server listening on port ${app.get('port')}`)
        )
})
.catch(console.error)
