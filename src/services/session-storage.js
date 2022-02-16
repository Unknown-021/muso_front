const PREFIX = 'application.';

export default {

    set(attributeName, value) {
        sessionStorage.setItem(PREFIX + attributeName, value);
        return value;
    },

    get(attribute) {
        return sessionStorage.getItem(PREFIX + attribute);
    },

    remove(attribute) {
        sessionStorage.remove(PREFIX + attribute);
    },

    clear() {
        sessionStorage.clear()
    }

}