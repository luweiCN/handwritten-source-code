/**
 * Converts `array` to an `arguments` object.
 *
 * @private
 * @param {Array} array The array to convert.
 * @returns {Object} Returns the converted `arguments` object.
 */
function toArgs(array) {
    return function () {
        return arguments;
    }.apply(undefined, array);
}

export var stubTrue = function () {
        return true;
    },
    stubFalse = function () {
        return false;
    };

/** Used as references for various `Number` constants. */
export var MAX_SAFE_INTEGER = 9007199254740991,
    MAX_INTEGER = 1.7976931348623157e308;

/** Used to provide falsey values to methods. */
export var falsey = [, null, undefined, false, 0, NaN, ""];

export var symbol = Symbol ? Symbol("a") : undefined;

export var args = toArgs([1, 2, 3]);
