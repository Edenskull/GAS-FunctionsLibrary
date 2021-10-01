/**
 * Sum all number from a Sheet Range.
 * @param {Range} range - Should be a Range define with getRange()
 * @return {int} Sum of the range values. Skip string values.
 */
function sum(range) {
  let result = 0;
  if(range.constructor == Object) {
    range.getValues().forEach((item) => {
      result += sum(item);
    });
  } else {
    range.forEach((item) => {
      if(item.constructor == Number) {
        result += item;
      }
    });
  }
  return result;
}