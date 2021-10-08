/**
   * Function to export sheets as JSON file in Google Drive root directory.
   * @param {bool} fetch - If you need to split json files for every sheets.
   * @param {bool} compact - If you want to get sheets object istead of sheetName object.
   * @param {bool} lockTypeFromFirstRow - If you want to use the first row item type as mandatory types (return error if type is different).
   * @param {Sheet} sheets - Sheet object that need to be exported.
   */
function sheetToJSON(fetch, compact, lockTypeFromFirstRow, ...sheets) {
    var keys;
    var resultJSON = {};
    var sheetName;
    sheets.forEach((sheet) => {
        var lockType = [];
        let values = sheet.getSheetValues(1, 1, sheet.getLastRow(), sheet.getLastColumn());
        sheetName = sheet.getSheetName();
        values[1].forEach((item) => {
            lockType.push(typeof item);
        });
        if (compact) {
            resultJSON["sheets"] = [];
        } else {
            resultJSON[sheetName] = [];
        }
        Logger.log(lockType);
        values.forEach((row, indexRow) => {
            if (indexRow == 0) {
                keys = row;
            } else {
                var tempJSON = (compact) ? { "sheetName": sheetName } : {};
                row.forEach((item, index) => {
                    if (lockTypeFromFirstRow) {
                        if (typeof item == lockType[index]) {
                            tempJSON[keys[index]] = item;
                        } else {
                            throw new Error(`The value ${item} from the cell [${columnToLetter(index + 1) + (indexRow + 1)}] in ${sheetName} don't have the right type : Should be "${lockType[index]}" is "${typeof item}"`);
                        }
                    } else {
                        tempJSON[keys[index]] = item;
                    }
                });
                if (compact) {
                    resultJSON["sheets"].push(tempJSON);
                } else {
                    resultJSON[sheetName].push(tempJSON);
                }
            }
        });
        if (!fetch) {
            let blob = Utilities.newBlob(JSON.stringify(resultJSON, null, 2), "application/json", sheetName + " - JSON Export.json");
            DriveApp.createFile(blob);
            delete resultJSON[sheetName];
        }
    });
    if (fetch) {
        let blob = Utilities.newBlob(JSON.stringify(resultJSON, null, 2), "application/json", "Generic data - JSON Export.json");
        DriveApp.createFile(blob);
    }
}

/**
 * Function to export sheets as XML file in Google Drive root directory.
 * @param {bool} fetch - If you need to split json files for every sheets.
 * @param {bool} compact - If you want to get sheet node with attribute name instead of sheetname node
 * @param {Sheet} sheets - Sheet object that need to be exported.
 */
function sheetToXML(fetch, compact, ...sheets) {
    var keys;
    var resultXML = XmlService.createElement("root");
    var sheetName;
    sheets.forEach((sheet) => {
        let values = sheet.getSheetValues(1, 1, sheet.getLastRow(), sheet.getLastColumn());
        sheetName = sheet.getSheetName();
        var sheetNode = (compact) ? XmlService.createElement("sheet").setAttribute("sheetName", sheetName) : XmlService.createElement("sheet").setName(sheetName);
        values.forEach((row, index) => {
            if (index == 0) {
                keys = row;
            } else {
                row.forEach((item, index) => {
                    var valueNode = XmlService.createElement("value")
                        .setName(keys[index])
                        .setText(item);
                    sheetNode.addContent(valueNode);
                });
            }
        });
        if (!fetch) {
            let document = XmlService.createDocument(sheetNode);
            let xml = XmlService.getPrettyFormat().setIndent('  ').format(document);
            let blob = Utilities.newBlob(xml, "application/xml", sheetName + " - XML Export.xml");
            DriveApp.createFile(blob);
        } else {
            resultXML.addContent(sheetNode);
        }
    });
    if (fetch) {
        let document = XmlService.createDocument(resultXML);
        let xml = XmlService.getPrettyFormat().setIndent('  ').format(document);
        let blob = Utilities.newBlob(xml, "application/xml", "Generic data - XML Export.xml");
        DriveApp.createFile(blob);
    }
}