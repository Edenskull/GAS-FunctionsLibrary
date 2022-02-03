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
 * Function to remove duplicates in flat array.
 * @param {Array} array - Array that need to be pruned
 * @param {Bool} ignoreCase - Whether or not to ignore case
 * @returns {Array} new Array without duplicate elements within.
 */
function arrayUnique(array, ignoreCase = false) {
  if(ignoreCase) {
    return array.filter(function(v, i, a){
      a = changeArrayCase(a, "lower");
      try {
        return a.indexOf(v.toLowerCase()) === i;
      } catch(TypeError) {
        return a.indexOf(v) === i;
      }
    });
  } else {
    return array.filter((v, i, a) => a.indexOf(v) === i);
  }
}

/**
 * Function to remove duplicates in multi dimensional array.
 * @param {Array} array - array that need to be pruned
 * @param {Bool} wholeArray - Whether or not to remove whole array instead of removing duplicates in sub arrays
 * @param {Bool} ignoreCase - Whether or not to ignore case
 * @returns {Array} new array without duplicates elements within
 */
function multiDimensionalUnique(array, wholeArray = false, ignoreCase = false) {
  var uniques = [];
  var itemsFound = {};
  if(wholeArray){
    for(var i = 0, l = array.length; i < l; i++) {
      if(ignoreCase){
        if(Array.isArray(array[i])){
          array[i] = changeArrayCase(array[i], 'lower');
        } else {
          try {
            array[i] = array[i].toLowerCase();
          } catch(TypeError) {
            array[i] = array[i]
          }
        }
      }
      var stringified = JSON.stringify(array[i]);
      if(itemsFound[stringified]) { continue; }
      uniques.push(array[i]);
      itemsFound[stringified] = true;
    }
  } else {
    array.forEach(function(x) {
      if(!Array.isArray(x)){
        try {
          x = x.toLowerCase();
        } catch(TypeError){
          x = x;
        }
        if(!uniques.includes(x)){
          uniques.push(x);
        }
      } else {
        uniques.push(multiDimensionalUnique(x));
      }
    });
  }
  return uniques;
}
