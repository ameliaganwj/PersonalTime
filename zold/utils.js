/**
 * Returns a random integer between 0 and (max - 1).
 * @param {Number} max 
 * @returns 
 * @ref https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random
 */
function randomInt(max) {
    return Math.floor(Math.random() * max);
}

/**
 * Given the id of a neighboring cell, returns the id of the opposite direction.
 * @param {Number} id 
 * @returns 
 */
function oppositeDirection(id) {
    return (id + 2) % 4;
}

/**
 * Returns a random element from an Array.
 * @param {Array} array 
 * @returns 
 */
function randomElement(array) {
    let id = randomInt(array.length);
    return array[id];
}

/**
 * Removes an element from an Array.
 * @param {Any} element 
 * @param {Array} array 
 */
function removeFromArray(element, array) {
    let index = array.indexOf(element);
    array.splice(index, 1);
}