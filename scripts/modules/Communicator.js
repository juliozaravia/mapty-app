/*
 * Project: Mapty 
 * File: Communicator - Communication class file  
 * Description: Class that contains the method that allows displaying notifications to the user.  
 */

'use strict'

import * as global from './Global.js'

export default class Communicator {
	constructor() { }

	// Method that displays an alert informing the user of the result of the requested operation. 
	_eventReporter(code) {
		let notification = `[Warning Code <WC${code}>] `
		switch (code) {
			case global.warning_codes.NO_GEOLOCATION:
				notification += 'The geolocation function is not available on your browser / device.'
				break;

			case global.warning_codes.NO_POSITION:
				notification += 'Could not get your position.'
				break;

			case global.warning_codes.INVALID_INPUT:
				notification += 'The inputs have to be positive numbers.'
				break;
		}
		alert(notification)
	}
}