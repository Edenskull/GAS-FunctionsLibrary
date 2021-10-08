# Array

## changeArrayCase(array, mode)

> Function to change array (could be more than 2D) items case (lower or upper). Work with Spreadsheet array of values (.getValues()). But it doesn't convert Dates, Numbers, Currencies...

### Params

> <ins>**@array** <small>Array or Array[]</small></ins> : Array of value that can be more than 2D.

> <ins>**@mode** <small>String</small></ins> : Can be either "lower", "upper" or "title".

### Return

> <ins>**Type** <small>Array or Array[]</small></ins> : Formatted array.

### Example

```js
function _test() {
  //let sheetValues = SpreadsheetApp.getActiveSheet().getRange(1, 1, 3, 2).getValues();
  let sheetValues = [["Im", "baTmAn"], ["IM", "ROBin"], ["IM", "jokER"]]
  Logger.log(changeArrayCase(sheetValues, "lower"));
  // Logger.log : [["im", "batman"], ["im", "robin"], ["im", "joker"] [19, 19]]
}

function _test() {
  //let sheetValues = SpreadsheetApp.getActiveSheet().getRange(1, 1, 1, 7).getValues()[0];
  let sheetValues = ["Im", "baTmAn", "IM", "ROBin", "IM", "jokER", 19]
  Logger.log(changeArrayCase(sheetValues, "title"));
  // Logger.log : ["Im", "Batman", "Im", "Robin", "Im", "Joker", 19]
}
```

## multiDimensionalUnique(array)

### Params

> <ins>**@array** <small>Array[]</small></ins> : Array of value that must be more than 2D.

### Return

> <ins>**Type** <small>Array[]</small></ins> : Array without duplicates.

### Example

```js
function _test() {
  //var sheetValues = SpreadsheetApp.getActiveSheet().getRange(1, 1, 4, 2).getValues();
  let sheetValues = [["im", "batman"], ["im", "robin"], ["im", "batman"], ["im", "Robin"]]
  Logger.log(multiDimensionalUnique(sheetValues, false));
  // Logger.log : [["im", "batman"], ["im", "robin"], ["im", "Robin"]]
}

function _test() {
  //var sheetValues = SpreadsheetApp.getActiveSheet().getRange(1, 1, 5, 2).getValues();
  let sheetValues = [["im", "batman"], ["im", "robin"], ["im", "batman"], [19, 19], ["im", "Robin"]];
  Logger.log(multiDimensionalUnique(sheetValues, true));
  // Logger.log : [["im", "batman"], ["im", "robin"], [19, 19]]
}
```