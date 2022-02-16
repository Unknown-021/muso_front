export default (value, symbol = '-') => {
    if (!value) {
        return symbol;
    }
    return value;
}
