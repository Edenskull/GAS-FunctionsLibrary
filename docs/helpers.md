# Helpers

## columnToLetter(column)

> Function to convert column number to A1 notation.

### Params

> <ins>**@column** <small>Integer</small></ins> : Column number.

### Return

> <ins>**Type** <small>String</small></ins> : Associated A1 notation for the column number.

### Example

```js
function _test() {
  Logger.log(columnToLetter(115));
  // Logger.log : DK
}
```

## letterToColumn(letter)

> Function to convert column A1 notation to number.

### Params

> <ins>**@letter** <small>String</small></ins> : Column A1 Notation.

### Return

> <ins>**Type** <small>Integer</small></ins> : Associated number for the column A1 notation.

### Example

```js
function _test() {
  Logger.log(letterToColumn("DK"));
  // Logger.log : 115.0
}
```