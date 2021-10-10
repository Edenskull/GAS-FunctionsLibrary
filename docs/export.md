# Export

## sheetToJSON(fetch, lockTypeFromFirstRow, ...sheets)

> Function to export a sheet to JSON format with process params.

### Params

> <ins>**@fetch** <small>Bool</small></ins> : True if you want to export all the defined sheets into one JSON file, otherwise it will create one file for every sheets.

> <ins>**@compact** <small>Bool</small></ins> : True if you want to get generic names as the top node. If false the top node name will be set as the sheet name.

### Return

> <ins>**No return** <small></small></ins> : The formatted JSON will be in the root of the Google Drive.

### Example

```js
function _test() {
  // content : [["colA"],["colB"],["colC"]],[["im"],["batman"],[92]],[["im"],["robin"],[97]];
  var sheetValue = SpreadsheetApp.getActiveSheet().getSheets()[0];
  // content : [["colA"],["colB"],["colC"]],[["im"],["joker"],[92]],[["im"],["quinn"],[97]]
  var sheetValue2 = SpreadsheetApp.getActiveSheet().getSheets()[1];
  sheetToJSON(false, true, sheetValue, sheetValue2);
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

## sheetToXML(fetch, ...sheets)

> Function to export a sheet to XML format with process params.

### Params

> <ins>**@fetch** <small>Bool</small></ins> : True if you want to export all the defined sheets into one XML file, otherwise it will create one file for every sheets.

### Return

> <ins>**No return** <small></small></ins> : The formatted XML will be in the root of the Google Drive.

### Example

```js
function _test() {
  // content : [["colA"],["colB"],["colC"]],[["im"],["batman"],[92]],[["im"],["robin"],[97]];
  var sheetValue = SpreadsheetApp.getActiveSheet().getSheets()[0];
  // content : [["colA"],["colB"],["colC"]],[["im"],["joker"],[92]],[["im"],["quinn"],[97]]
  var sheetValue2 = SpreadsheetApp.getActiveSheet().getSheets()[1];
  sheetToXML(true, sheetValue, sheetValue2);
}
```
XML output is:
```xml
<?xml version="1.0" encoding="UTF-8"?>
<root>
  <sheet sheetName="Sheet1">
    <row>
      <colA>im</colA>
      <colB>batman</colB>
      <colC>92</colC>
    </row>
    <row>
      <colA>im</colA>
      <colB>robin</colB>
      <colC>97</colC>
    </row>
  </sheet>
  <sheet sheetName="Sheet2">
    <row>
      <colA>im</colA>
      <colB>joker</colB>
      <colC>92</colC>
    </row>
    <row>
      <colA>im</colA>
      <colB>quinn</colB>
      <colC>97</colC>
    </row>
  </sheet>
</root>
```