/*
 * Project: Mapty 
 * File: Running - Running class file  
 * Description: Class that contains the necessary methods to create an instance of a workout of type Running.  
 */

'use strict'

import Workout from './Workout.js'

export default class Running extends Workout {
	type = 'running' 
	constructor(coords, distance, duration, cadence) {
		super(coords, distance, duration)
		this.cadence = cadence
		this.calcPace()
		this._setDescription()
	}

	calcPace() {
		this.pace = this.duration / this.distance
		return this.pace
	}
}