/**
 * Sum all number from a Sheet Range(s).
 * @param {Range} ranges - Should be a Range define with getRange(). Multiple range can be passed to the function.
 * @return {int} Sum of the range values. Skip string values.
 */
function sum(...ranges) {
    let result = 0;
    ranges.forEach((range) => {
        if (range.constructor == Object) {
            range.getValues().forEach((item) => {
                result += sum(item);
            });
        } else {
            range.forEach((item) => {
                if (item.constructor == Number) {
                    result += item;
                }
            });
        }
    });
    return result;
}