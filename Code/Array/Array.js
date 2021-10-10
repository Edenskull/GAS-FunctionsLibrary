/**
 * Function to change array items case (lower or upper). Work with Spreadsheet array of values (.getValues()). But it doesn't convert Dates, Numbers, Currencies...
 * @param {Array} array - Array that need case update
 * @param {String} mode - You have choice between "upper", "lower", "title"
 * @returns {Array} New Array with updated case.
 */
function changeArrayCase(array, mode) {
    return array.map((item) => {
        Logger.log(item.constructor);
        if (item.constructor == Array) {
            return changeArrayCase(item, mode);
        } else {
            if (item.constructor != Number && item.constructor != Date) {
                if (mode == "lower") {
                    result = item.toLowerCase();
                } else if (mode == "upper") {
                    result = item.toUpperCase();
                } else if (mode == "title") {
                    result = item.substring(0, 1).toUpperCase() + item.substring(1).toLowerCase();
                }
                return result;
            } else {
                return item;
            }
        }
    });
}

/**
 * Function to remove duplicates in arrays.
 * @param {Array} array - Array that need to be pruned
 * @returns {Array} New Array without duplicates.
 */
function multiDimensionalUnique(array, ignoreCase) {
    var uniques = [];
    var itemsFound = {};
    for (var i = 0, l = array.length; i < l; i++) {
        var stringified;
        if (ignoreCase) {
            if (array[i].constructor == Array) {
                stringified = JSON.stringify(array[i].map((item) => {
                    if (item.constructor != Number && item.constructor != Date) {
                        return item.toLowerCase();
                    } else {
                        return item;
                    }
                }));
            } else {

            }
        } else {
            stringified = JSON.stringify(array[i]);
        }
        if (itemsFound[stringified]) {
            continue;
        }
        uniques.push(array[i]);
        itemsFound[stringified] = true;
    }
    return uniques;
}