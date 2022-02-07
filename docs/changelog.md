## [0.0.3-beta](https://github.com/Edenskull/GAS-FunctionsLibrary/compare/v0.0.2-beta...v0.0.3-beta) (2022-02-07)


### Bugfix

- Arrays:
  - Fixe issues with multidimensional arrays. Should now work for any case.

### Remove

- Arrays:
  - Remove Flatten function as it's now handled by appscript with `.flat()`

## [0.0.2-beta](https://github.com/Edenskull/GAS-FunctionsLibrary/compare/v0.0.1-beta...v0.0.2-beta) (2021-10-10)


### Bugfix

- Arrays:
  - Remove useless params
- Exports:
  - Remove compact params
  - Review JSON and XML format

### Global

- Docsify:
  - Setup Docsify
  - Register every functions
- CodeQL:
  - Setup CodeQL

## [0.0.1-beta](https://github.com/Edenskull/GAS-FunctionsLibrary/compare/main@%7B1day%7D...main) (2021-08-10)


### Features

- Arrays:
  - changeArrayCase() : Allow array case manipulation
  - multiDimensionalUnique() : Allow remove of duplicates in a 2D array
- Exports:
  - sheetToJSON() : Allow export of sheets in JSON format
  - sheetToXML() : Allow export of sheets in XML format
- Helpers:
  - columnToLetter() : Convert number to column letter format for Google Sheets
  - letterToColumn() : Convert column letter format for Google Sheets to number
- Operations:
  - sum() : Allow to sum a range in Google Sheets