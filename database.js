'use strict'

const mongoose = require('mongoose')
// const MONGODB_URL = 'mongodb://localhost:27017/pugspizza'
const MONGODB_URL = process.env.MONGO_URL || 'mongodb://localhost:27017/pugspizza'

// let db

mongoose.Promise = Promise


// mongoose.model('contact', {
// 	name: String,
// 	email: String,
// 	phone: String,
// 	message: String
// })



// 'mongodb://Zippoffer:Tidaholm@ds033036.mlab.com:33036/pugspizza'

module.exports.connect = ()=> mongoose.connect(MONGODB_URL)//.then(_db => db = _db)
module.exports.disconnect = ()=> mongoose.disconnect()//.then(_db => db = _db)

// module.exports.db = ()=> db
