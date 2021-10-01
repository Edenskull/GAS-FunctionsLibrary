/**
 * Function to change array items case (lower or upper). Work with Spreadsheet array of values (.getValues()). But it doesn't convert Dates, Numbers, Currencies...
 * @param {array} array - Array that need case update
 * @param {bool} recurse - If the array is flat or need recursive method
 * @param {string} mode - You have choice between "upper", "lower", "title"
 * @returns {Array} New Array with updated case.
 */
function changeArrayCase(array, recurse, mode) {
    if (!recurse) {
        return array.map((item) => {
            if (item.constructor != Number || item.constructor != Date) {
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
        });
    } else {
        return array.map((item) => {
            if (item.constructor == Array) {
                return changeArrayCase(item, recurse, mode);
            } else {
                if (item.constructor == Number || item.constructor == Date) {
                    return item;
                } else {
                    if (mode == "lower") {
                        result = item.toLowerCase();
                    } else if (mode == "upper") {
                        result = item.toUpperCase();
                    } else if (mode == "title") {
                        result = item.substring(0, 1).toUpperCase() + item.substring(1).toLowerCase();
                    }
                    return result;
                }
            }
        });
    }
}