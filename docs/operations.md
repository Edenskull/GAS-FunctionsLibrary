# Helpers

## sum(...ranges)

> Sum all number from a Sheet Range(s).

### Params

> <ins>**@ranges** <small>Range</small></ins> : Should be a Range define with getRange(). Multiple range can be passed to the function.

### Return

> <ins>**Type** <small>Number</small></ins> : Sum of the range values. Skip string values.

### Example

```js
function _testOperations() {
  // range contain : [[1, 2],["a", 3]];
  var sheetRange = SpreadsheetApp.getActiveSheet().getRange("A1:B2");
  Logger.log(sum(sheetRange)); // Logger log : 6.0
}
```