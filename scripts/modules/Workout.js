/*
 * Project: Mapty 
 * File: Workout - Workout class file
 * Description: Class that contains the methods that will be inherited by the Running and Cycling classes to perform their operations. 
 */

'use strict'

export default class Workout {
	date = new Date()
	id = (Date.now() + '').slice(-10)

	constructor(coords, distance, duration) {
		this.coords = coords
		this.distance = distance
		this.duration = duration
	}

	_setDescription() {
		const months = [
			'January',
			'February',
			'March',
			'April',
			'May',
			'June',
			'July',
			'August',
			'September',
			'October',
			'November',
			'December'
		];

		this.description = `
			${this.type[0].toUpperCase()}${this.type.slice(1)} 
			on ${months[this.date.getMonth()]} ${this.date.getDate()}
		`
	}
}