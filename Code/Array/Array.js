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
        if(ignoreCase){
          try {
            x = x.toLowerCase();
          } catch(TypeError){
            x = x;
          }
        }
        if(!uniques.includes(x)){
          uniques.push(x);
        }
      } else {
        uniques.push(multiDimensionalUnique(x, wholeArray, ignoreCase));
      }
    });
  }
  return uniques;
}

/**
 * Function to remove specific element from array (can be multi dimensional or flat).
 * @param {Array} array - array that where specific value will be removed
 * @param {Any} value - value that will be removed from the array
 * @param {Bool} ignoreCase - Whether or not to ignore case
 * @returns {Array} new array without the specific element
 */
function removeSpecific(array, value, ignoreCase = false){
  var newArray = [];
  if(ignoreCase){
    try {
      value = value.toLowerCase();
    } catch(TypeError){
      value = value;
    }
  }
  array.forEach(function(item){
    if(Array.isArray(item)){
      newArray.push(removeSpecific(item, value, ignoreCase));
    } else {
      var check = null;
      if(ignoreCase){
        try {
          check = item.toLowerCase() !== value;
        } catch(TypeError) {
          check = item !== value;
        }
      } else {
        check = item !== value;
      }
      if(check){
        newArray.push(item);
      }
    }
  });
  return newArray;
}

/**
 * Function to transpose matrix. In Spreadsheets, change .getValues() result to column instead of rows.
 * @param {Array[][]} array - this array is the result of the .getValues() (built-in Google Sheets function)
 * @returns {Array[][]} new array with transposed values (row/col to col/row)
 */
function transposeMatrix(array) {
  return array[0].map((col, i) => array.map(row => row[i]));
}
