/*
 * Project: Mapty 
 * File: Cycling - Cycling class file  
 * Description: Class that contains the necessary methods to create an instance of a workout of type Cycling.  
 */

'use strict'

import Workout from './Workout.js'

export default class Cycling extends Workout {
	type = 'cycling'
	constructor(coords, distance, duration, elevationGain) {
		super(coords, distance, duration)
		this.elevationGain = elevationGain
		this.calcSpeed()
		this._setDescription()
	}

	calcSpeed() {
		this.speed = this.distance / (this.duration / 60)
		return this.speed
	}
}