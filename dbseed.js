'use strict'

const {connect, disconnect} = require('./database')
const Size = require('./models/size')
const Topping = require('./models/topping')


connect()
	.then(() => Size.remove({}))
	.then(() => {
		console.log('Inserting Sizes...')
		return Size.insertMany([{
			name: 'small',
			inches: 8
		},{	
			name: 'medium',
			inches: 12
		},{
			name: 'yuge',
			inches: 99
		}])
	})
	.then(() => Topping.remove({}))
	.then(() => {
		console.log('Inserting Toppings...')

		return Topping.insertMany([{
			name: "goat"
		},{
			name: "Tuscan Tea Leaves"
		},{
			name: "surprise"
		},{
			name: "Mmmmm"
		}])
	})

.catch(console.error)
.then(()=>{console.log('toppings inserted')})
.then(() => disconnect())
