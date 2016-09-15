'use strict'

const mongoose = require('mongoose')


module.exports = mongoose.model('size', {
	name: String,
	inches: Number
})
