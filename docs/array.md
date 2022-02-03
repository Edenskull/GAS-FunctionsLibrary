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

## arrayUnique(array, ignoreCase)

> Function to remove duplicates in flat array.

### Params

> <ins>**@array** <small>Array[]</small></ins> : Array of value that must be flat.
> <ins>**@ignoreCase** <small>bool</small></ins> : Whether or not to ignore case (default false).

### Return

> <ins>**Type** <small>Array[]</small></ins> : Array without duplicates.

### Example

```js
function _test() {
  //var sheetValues = SpreadsheetApp.getActiveSheet().getRange(1, 1, 4, 2).getValues();
  var sheetValues = ["test1", "Test1", "test1", "test2", "test3", "test3", "test4", 1, 2, 3, 4, 1, 2];
  Logger.log(NameSpace.arrayUnique(sheetValues));
  // Logger.log : [test1, Test1, test2, test3, test4, 1.0, 2.0, 3.0, 4.0]
}

function _test() {
  //var sheetValues = SpreadsheetApp.getActiveSheet().getRange(1, 1, 5, 2).getValues();
  var sheetValues = ["test1", "Test1", "test1", "test2", "test3", "test3", "test4", 1, 2, 3, 4, 1, 2];
  Logger.log(NameSpace.multiDimensionalUnique(sheetValues, true));
  // Logger.log : [test1, test2, test3, test4, 1.0, 2.0, 3.0, 4.0]
}
```

## multiDimensionalUnique(array, wholeArray, ignoreCase)

> Function to remove duplicates in more than 1D array with whole array checking.

### Params

> <ins>**@array** <small>Array[]</small></ins> : Array of value that must be more than 2D.
> <ins>**@wholeArray** <small>bool</small></ins> : Whether or not to remove whole array instead of removing duplicates in sub arrays (default false).
> <ins>**@ignoreCase** <small>bool</small></ins> : Whether or not to ignore case (default false).

### Return

> <ins>**Type** <small>Array[]</small></ins> : Array without duplicates.

### Example

```js
function _test() {
  //var sheetValues = SpreadsheetApp.getActiveSheet().getRange(1, 1, 5, 2).getValues();
  var sheetValues = ["test1", "Test1", "test2", ["test1", "test1", "test2"], ["test1", "Test1", "test2"], [1, 2], [1, 2]];
  Logger.log(Namespace.multiDimensionalUnique(sheetValues));
  // Logger.log : [test1, test2, [test1, test2], [test1, test2], [1.0, 2.0], [1.0, 2.0]]
  Logger.log(Namespace.multiDimensionalUnique(sheetValues, true));
  // Logger.log : [test1, Test1, test2, [test1, test1, test2], [test1, Test1, test2], [1.0, 2.0]]
  Logger.log(Namespace.multiDimensionalUnique(sheetValues, true, true));
  // Logger.log : [test1, test2, [test1, test1, test2], [1.0, 2.0]]
  Logger.log(Namespace.multiDimensionalUnique(sheetValues, false, true));
  // Logger.log : [test1, test2, [test1, test2], [test1, test2], [1.0, 2.0], [1.0, 2.0]]
}
```

## transposeMatrix(array)

> Function to transpose rows and cols with the built-in function .getValues().

### Params

> <ins>**@array** <small>Array[][]</small></ins> : this array is the result of the .getValues() (built-in Google Sheets function).

### Return

> <ins>**Type** <small>Array[][]</small></ins> : new array with transposed values (row/col to col/row).

### Example

```js
function _test() {
  //var sheetValues = SpreadsheetApp.getActiveSheet().getRange(1, 1, 4, 2).getValues();
  var sheetValues = [["test1", "test2"], ["test3", "test4"], ["test5", "test6"]];
  Logger.log(NameSpace.transposeMatrix(sheetValues));
  // Logger.log : [[test1, test3, test5], [test2, test4, test6]]
}
```
