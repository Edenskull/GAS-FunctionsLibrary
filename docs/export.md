# Export

## sheetToJSON(fetch, compact, lockTypeFromFirstRow, ...sheets)

> Function to export a sheet JSON format with process params.

### Params

> <ins>**@fetch** <small>Bool</small></ins> : True if you want to export all the defined sheets into on JSON file, otherwise it will create one file for every sheets.

> <ins>**@compact** <small>Bool</small></ins> : True if you want to get generic names as the top node. If false the top node name will be set as the sheet name.

### Return

> <ins>**No return** <small></small></ins> : The formatted JSOn will be in the root of the Google Drive.

### Example

```js
function _test() {
  // content : [["colA"],["colB"],["colC"]],[["im"],["batman"],[92]],[["im"],["robin"],[97]];
  var sheetValue = SpreadsheetApp.openById("16vYy5B2iiLbowUcqrvUpzexUZ-gvCcPw0M-dJY1C_7g").getSheets()[0];
  // content : [["colA"],["colB"],["colC"]],[["im"],["joker"],[92]],[["im"],["quinn"],[97]]
  var sheetValue2 = SpreadsheetApp.openById("16vYy5B2iiLbowUcqrvUpzexUZ-gvCcPw0M-dJY1C_7g").getSheets()[1];
  sheetToJSON(true, false, true, sheetValue, sheetValue2);
}
```
JSON output is:
```json
{
  "Sheet1": [
    {
      "colA": "im",
      "colB": "batman",
      "colC": 92
    },
    {
      "colA": "im",
      "colB": "robin",
      "colC": 97
    }
  ],
  "Sheet2": [
    {
      "colA": "im",
      "colB": "joker",
      "colC": 92
    },
    {
      "colA": "im",
      "colB": "quinn",
      "colC": 97
    }
  ]
}
```

```js
function _test() {
  // content : [["colA"],["colB"],["colC"]],[["im"],["batman"],[92]],[["im"],["robin"],[97]];
  var sheetValue = SpreadsheetApp.openById("16vYy5B2iiLbowUcqrvUpzexUZ-gvCcPw0M-dJY1C_7g").getSheets()[0];
  sheetToJSON(true, true, true, sheetValue);
}
```
JSON output is:
```json
{
  "Sheets": [
    {
      "sheetName": "Sheet1",
      "colA": "im",
      "colB": "batman",
      "colC": 92
    },
    {
      "colA": "im",
      "colB": "robin",
      "colC": 97
    }
  ],
  "Sheet2": [
    {
      "colA": "im",
      "colB": "joker",
      "colC": 92
    },
    {
      "colA": "im",
      "colB": "quinn",
      "colC": 97
    }
  ]
}
```

## multiDimensionalUnique(array, ignoreCase)

### Params

> <ins>**@array** <small>Array[]</small></ins> : Array of value that must be more than 2D.
> <ins>**@ignoreCase** <small>bool</small></ins> : Array of value that must be more than 2D.

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