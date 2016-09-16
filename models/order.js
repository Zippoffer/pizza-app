'use strict'

const mongoose = require('mongoose')


module.exports = mongoose.model('order', {
	name: String,
	email: String,
	phone: String,
	size: Number,
	toppings: Array
})



// module.exports = mongoose.model('order', {
// 	name: {name: String, required: true},
// 	email: {
// 		type: String,
// 	 	required: true,
// 	  lowercase: true,
// 		match: [HTML5_EMAIL_VALIDATION, 'Please fill in a valid email address']
// 	},
// 	phone: {type: String, required: true},
// 	size: {type: Number, required: true},
// 	toppings: {type: String, default: ["goat"]},
// })
