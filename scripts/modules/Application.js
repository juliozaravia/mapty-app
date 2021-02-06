/*
 * Project: Mapty 
 * File: Application - Application class file 
 * Description: Class that contains or invokes the necessary methods for the operation of our program. 
 */

'use strict'

import * as elements from './Elements.js'
import * as global from './Global.js'
import * as Helper from './Helper.js'

import Running from './Running.js'
import Cycling from './Cycling.js'
import Communicator from './Communicator.js'

export default class App {
	#map
	#mapZoomLevel = 16
	#mapEvent
	#workouts = []

	constructor() {
		// We make sure that any instance of the class has immediately defined the position and the data stored (or not) in local storage. 
		this._getPosition()
		this._getLocalStorage()

		elements.form.addEventListener('submit', this._newWorkout.bind(this))
		elements.inputType.addEventListener('change', this._toggleElevationField)
		elements.containerWorkouts.addEventListener('click', this._moveToPopup.bind(this))
	}

	// Method to calculate current position on the map.
	_getPosition() {
		const notifier = new Communicator()
		// We check if the browser supports geolocation.
		if (navigator.geolocation) {
			navigator.geolocation.getCurrentPosition(this._loadMap.bind(this), function () {
				notifier._eventReporter(global.warning_codes.NO_POSITION)
			})
		} else {
			notifier._eventReporter(global.warning_codes.NO_GEOLOCATION)
		}
	}

	// Method to load the map.
	_loadMap(position) {
		// We extract the latitude and longitude of the object "position" 
		// And then we create an array with the coordinates.
		const latitude = position.coords.latitude;
		const longitude = position.coords.longitude;
		const coords = [latitude, longitude]

		this.#map = L.map('map').setView(coords, this.#mapZoomLevel);
		L.tileLayer('https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', {
			attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
		}).addTo(this.#map);

		// We detect the 'click' event and associate the method to display the workout registration form.
		this.#map.on('click', this._showForm.bind(this))
		// In case there are already created workouts: 
		// we go through the 'workouts' array and call the method that allows loading the markers for each workout.
		this.#workouts.forEach(work => {
			this._renderWorkoutMarker(work)
		})
	}

	// Method to display the form when the map is clicked.
	_showForm(mapE) {
		this.#mapEvent = mapE
		elements.form.classList.remove('hidden')
		elements.inputDistance.focus()
	}

	// Method to hide the form after creating a new workout.
	_hideForm() {
		elements.inputDistance.value = ''
		elements.inputDuration.value = ''
		elements.inputCadence.value = ''
		elements.inputElevation.value = ''

		elements.form.style.display = 'none'
		elements.form.classList.add('hidden')
		setTimeout(() => (elements.form.style.display = 'grid'), 1000)
	}

	// Method to change the Cadence field to the Elevation field.
	_toggleElevationField() {
		elements.inputElevation.closest('.form__row').classList.toggle('form__row--hidden')
		elements.inputCadence.closest('.form__row').classList.toggle('form__row--hidden')
	}

	// Method to create a new workout.
	_newWorkout(event) {
		event.preventDefault()

		// We create the constants for the operations.
		const type = elements.inputType.value
		const distance = +elements.inputDistance.value
		const duration = +elements.inputDuration.value
		const { lat, lng } = this.#mapEvent.latlng

		let workout
		const notifier = new Communicator()
		// We verify the values entered by the user according to the type of workout.
		// If everything is correct, an instance of the class corresponding to the type of workout is created.
		if (type === 'running') {
			const cadence = +elements.inputCadence.value
			if (!Helper.validInputs(distance, duration, cadence) ||
				!Helper.allPositive(distance, duration, cadence)) {
				return notifier._eventReporter(global.warning_codes.INVALID_INPUT)
			}
			workout = new Running([lat, lng], distance, duration, cadence)
		}

		if (type === 'cycling') {
			const elevation = +elements.inputElevation.value
			if (!Helper.validInputs(distance, duration, elevation) ||
				!Helper.allPositive(distance, duration)) {
				return notifier._eventReporter(global.warning_codes.INVALID_INPUT)
			}
			workout = new Cycling([lat, lng], distance, duration, elevation)
		}

		// We add the new workout to the workouts array.
		this.#workouts.push(workout)
		// We invoke the following: 
		// Method to show the workout marker.
		// Method to display the workout in the workouts list.
		// Method to hide the registration form.
		// Method that allows to register the workout in the local storage. 
		this._renderWorkoutMarker(workout)
		this._renderWorkout(workout)
		this._hideForm()
		this._setLocalStorage()
	}

	// Method to show the workout marker.
	_renderWorkoutMarker(workout) {
		L.marker(workout.coords)
			.addTo(this.#map)
			.bindPopup(
				L.popup({
					// We adjust the values of the parameters that allow us to format the map marker.
					maxWidth: 250,
					minWidth: 100,
					autoClose: false,
					closeOnClick: false,
					className: `${workout.type}-popup`
				})
			)
			.setPopupContent(`${workout.type === 'running' ? '🏃‍♂️' : '🚴‍♀️'} ${workout.description}`)
			.openPopup();
	}

	// Method to display the workout in the workouts list.
	_renderWorkout(workout) {
		// We modify the content of the HTML block by placing the values according to the type of workout.
		let html = `
		<li class="workout workout--${workout.type}" data-id="${workout.id}">
		<h2 class="workout__title">${workout.description}</h2>
		<div class="workout__details">
			<span class="workout__icon">
				${workout.type === 'running' ? '🏃‍♂️' : '🚴‍♀️'}
			</span>
			<span class="workout__value">${workout.distance}</span>
			<span class="workout__unit">km</span>
		</div>
		<div class="workout__details">
			<span class="workout__icon">⏱</span>
			<span class="workout__value">${workout.duration}</span>
			<span class="workout__unit">min</span>
		</div>
		`

		if (workout.type === 'running') {
			html += `
				<div class="workout__details">
					<span class="workout__icon">⚡️</span>
					<span class="workout__value">${workout.pace.toFixed(1)}</span>
					<span class="workout__unit">min/km</span>
				</div>
				<div class="workout__details">
					<span class="workout__icon">🦶🏼</span>
					<span class="workout__value">${workout.cadence}</span>
					<span class="workout__unit">spm</span>
				</div>
			</li>
			`
		}

		if (workout.type === 'cycling') {
			html += `
				<div class="workout__details">
					<span class="workout__icon">⚡️</span>
					<span class="workout__value">${workout.speed.toFixed(1)}</span>
					<span class="workout__unit">km/h</span>
				</div>
				<div class="workout__details">
					<span class="workout__icon">⛰</span>
					<span class="workout__value">${workout.elevationGain}</span>
					<span class="workout__unit">m</span>
				</div>
			</li>
			`
		}
		// We add the formatted HTML to the list.
		elements.form.insertAdjacentHTML('afterend', html)
	}

	// Method to move the focus to the marker of the selected workout in the list.
	_moveToPopup(event) {
		// We capture the element with class '.workout' that is closest to the area where we clicked.
		const workoutEl = event.target.closest('.workout')
		if (!workoutEl) return
		// We extract the ID of the element
		const workout = this.#workouts.find(work => work.id === workoutEl.dataset.id)
		// The view is modified according to the entered values
		this.#map.setView(workout.coords, this.#mapZoomLevel, {
			animate: true,
			pan: { duration: 1, }
		})
	}

	// Method to save data to local storage.
	_setLocalStorage() {
		// We register the Workouts array in text string format in local storage.
		localStorage.setItem('workouts', JSON.stringify(this.#workouts))
	}

	// Method to extract data in local storage.
	_getLocalStorage() {
		// We process the string and convert it to a JSON object to be able to operate on it. 
		const data = JSON.parse(localStorage.getItem('workouts'))
		if (!data) return
		this.#workouts = data
		// For each record in Workouts we invoke the necessary method to load the data on the map and the list of workouts.
		this.#workouts.forEach((work) => {
			this._renderWorkout(work)
		})
	}
}