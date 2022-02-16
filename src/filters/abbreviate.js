export default (text) => {
    if (text) {
        const splitted = new RegExp(/\b[A-Z]/, 'g');
        return [...text.matchAll(splitted)].slice(0, 2).join('');
    }
    return '';
}
