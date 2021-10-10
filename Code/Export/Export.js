/**
 * Function to export sheets as JSON file in Google Drive root directory.
 * @param {Bool} fetch - If you need to split json files for every sheets.
 * @param {Bool} lockTypeFromFirstRow - If you want to use the first row item type as mandatory types (return error if type is different).
 * @param {Sheet} sheets - Sheet object that need to be exported.
 */
function sheetToJSON(fetch, lockTypeFromFirstRow, ...sheets) {
    var keys;
    var resultJSON = { "sheets": [] };
    var sheetName;
    var sheetJSON;
    sheets.forEach((sheet) => {
        var lockType = [];
        let values = sheet.getSheetValues(1, 1, sheet.getLastRow(), sheet.getLastColumn());
        sheetName = sheet.getSheetName();
        sheetJSON = { "sheetName": sheetName, "sheetValues": [] };
        values[1].forEach((item) => {
            lockType.push(typeof item);
        });
        values.forEach((row, indexRow) => {
            if (indexRow == 0) {
                keys = row;
            } else {
                var tempJSON = {};
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
                sheetJSON["sheetValues"].push(tempJSON);
            }
        });
        if (!fetch) {
            let blob = Utilities.newBlob(JSON.stringify(sheetJSON, null, 2), "application/json", sheetName + " - JSON Export.json");
            DriveApp.createFile(blob);
        } else {
            resultJSON["sheets"].push(sheetJSON);
        }
    });
    if (fetch) {
        let blob = Utilities.newBlob(JSON.stringify(resultJSON, null, 2), "application/json", "Generic data - JSON Export.json");
        DriveApp.createFile(blob);
    }
}

/**
 * Function to export sheets as XML file in Google Drive root directory.
 * @param {Bool} fetch - If you need to split json files for every sheets.
 * @param {Sheet} sheets - Sheet object that need to be exported.
 */
function sheetToXML(fetch, ...sheets) {
    var sheetName, keys;
    var resultXML = XmlService.createElement("root");
    sheets.forEach((sheet) => {
        let values = sheet.getSheetValues(1, 1, sheet.getLastRow(), sheet.getLastColumn());
        sheetName = sheet.getSheetName();
        var sheetNode = XmlService.createElement("sheet").setAttribute("sheetName", sheetName);
        values.forEach((row, index) => {
            if (index == 0) {
                keys = row;
            } else {
                var rowNode = XmlService.createElement("row");
                row.forEach((item, index) => {
                    let valueNode = XmlService.createElement("value")
                        .setName(keys[index])
                        .setText(item);
                    rowNode.addContent(valueNode)
                });
                sheetNode.addContent(rowNode);
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