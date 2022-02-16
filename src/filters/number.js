function isNumeric(value) {
    return !isNaN(parseFloat(value)) && isFinite(value);
}

export default (number, abbreviated = false) => {
    let suffix = '';
    let digit = number;

    if (!isNumeric(number)) {
        return '-';
    }

    if (abbreviated) {
        if (number >= 1e12) {
            suffix = 'T';
            digit = number / 1e12;
        } else if (number >= 1e9) {
            suffix = 'B';
            digit = number / 1e9;
        } else if (number >= 1e6) {
            suffix = 'M';
            digit = number / 1e6;
        } else if (number >= 1e3) {
            suffix = 'K';
            digit = number / 1e3;
        }
    }

    if (!Number.isInteger(digit) && digit < 10) {
        digit = digit.toFixed(1);
    } else {
        digit = Math.floor(digit);
    }

    return digit + suffix;
};
