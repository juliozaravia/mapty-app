/*
 * Project: Mapty 
 * File: Helper - Support function file
 * Description: It allows us to carry out support operations necessary for the operation of the main functions. 
 */

'use strict'

// validInputs: Function that allows validating that any of the elements received is a numerical data. 
export const validInputs = (...inputs) =>
inputs.every(inp => Number.isFinite(inp))

// allPositive: Function that allows validating that any of the elements received is a positive numerical data.
export const allPositive = (...inputs) =>
	inputs.every(inp => inp > 0)