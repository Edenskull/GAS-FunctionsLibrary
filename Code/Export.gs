/**
 * Function to export sheets as JSON file in Google Drive root directory.
 * @param {bool} fetch - If you need to split json files for every sheets.
 * @param {Sheet} sheets - Sheet object that need to be exported.
 */
function sheetToJSON(fetch, compact, ...sheets) {
    var keys;
    var resultJSON = {};
    var sheetName;
    sheets.forEach((sheet) => {
        let values = sheet.getSheetValues(1, 1, sheet.getLastRow(), sheet.getLastColumn());
        sheetName = sheet.getSheetName();
        if (compact) {
            resultJSON["sheets"] = [];
        } else {
            resultJSON[sheetName] = [];
        }
        values.forEach((row, index) => {
            if (index == 0) {
                keys = row;
            } else {
                var tempJSON = (compact) ? { "sheetName": sheetName } : {};
                row.forEach((item, index) => {
                    tempJSON[keys[index]] = item;
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