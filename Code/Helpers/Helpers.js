/**
 * Function to convert column letter to number
 * @param {String} column - The column A1 identifier to convert
 * @return {Number} The number representing the given column
 */
function columnToLetter(column) {
    let temp;
    let letter = '';
    while (column > 0) {
        temp = (column - 1) % 26;
        letter = String.fromCharCode(temp + 65) + letter;
        column = (column - temp - 1) / 26;
    }
    return letter;
}

/**
 * Function to convert column number to letter
 * @param {Number} column - The column number identifier to convert
 * @return {String} The A1 notation representing the given column
 */
function letterToColumn(letter) {
    let column = 0;
    let length = letter.length;
    for (let i = 0; i < length; i++) {
        column += (letter.charCodeAt(i) - 64) * Math.pow(26, length - i - 1);
    }
    return column;
}