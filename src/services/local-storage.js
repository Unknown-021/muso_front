const PREFIX = 'application.';

export default {

    set(attributeName, value) {
        localStorage.setItem(PREFIX + attributeName, value);
        return value;
    },

    get(attribute, defaultValue = null) {
        let value = localStorage.getItem(PREFIX + attribute);
        if (value === null) {
            value = defaultValue;
        }
        switch(value) {
            case 'true':
                value = true;
                break;
            case 'false':
                value = false;
                break;
        }
        return value;
    },

    setAll(data) {
        _.each(data, (value, key) => {
            this.set(key, value);
        });
    },

    remove(attribute) {
        localStorage.removeItem(PREFIX + attribute);
    },

    clear() {
        localStorage.clear()
    }

}
