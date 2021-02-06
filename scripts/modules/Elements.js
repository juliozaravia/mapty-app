/*
 * Project: Mapty 
 * File: Elements - Element extraction file
 * Description: It allows us to extract the elements from the DOM and store them in containers that will be processed as required. 
 */

'use strict'

// We capture the elements that will allow us to carry out operations in the game
export const form = document.querySelector('.form');
export const containerWorkouts = document.querySelector('.workouts');
export const inputType = document.querySelector('.form__input--type');
export const inputDistance = document.querySelector('.form__input--distance');
export const inputDuration = document.querySelector('.form__input--duration');
export const inputCadence = document.querySelector('.form__input--cadence');
export const inputElevation = document.querySelector('.form__input--elevation');