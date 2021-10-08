/**
 * Function to export sheets as JSON file in Google Drive root directory.
 * @param {bool} fetch - If you need to split json files for every sheets.
 * @param {Sheet} sheets - Sheet object that need to be exported.
 */
function sheetToJson(fetch, ...sheets) {
    var keys;
    var resultJSON = {};
    var sheetName
    sheets.forEach((sheet) => {
        let values = sheet.getSheetValues(1, 1, sheet.getLastRow(), sheet.getLastColumn());
        sheetName = sheet.getSheetName();
        resultJSON[sheetName] = [];
        values.forEach((row, index) => {
            if (index == 0) {
                keys = row;
            } else {
                var tempJSON = {};
                row.forEach((item, index) => {
                    tempJSON[keys[index]] = item;
                });
                resultJSON[sheetName].push(tempJSON);
            }
        });
        if (!fetch) {
            let blob = Utilities.newBlob(JSON.stringify(resultJSON, null, 2), "application/json", sheetName + " - JSON Export");
            DriveApp.createFile(blob);
            delete resultJSON[sheetName];
        }
    });
    if (fetch) {
        let blob = Utilities.newBlob(JSON.stringify(resultJSON, null, 2), "application/json", "Generic data - JSON Export");
        DriveApp.createFile(blob);
    }
}