class Filters {
    constructor(attributes, options = {}) {
        this.router = options.router;
        if (!this.router) {
            throw new Error('Router must be set.');
        }

        this.attributes = {};
        this.defaultAttributes = { ...attributes };
        this.storage = sessionStorage;
        this.storagePrefix = options.storagePrefix || 'filters';
        this.excludeAttributes = options.excludeAttributes || [];
        this.emitAttributeChanging = options.emitAttributeChanging || false;
        this.emitActionName = options.emitActionName || 'filters-changed';
        this.timeout = null;
        this.callback = () => {
            console.log(this.attributes);
        };

        if (options.storage === 'session') {
            this.storage = sessionStorage;
        } else if (options.storage === 'local') {
            this.storage = localStorage;
        }

        for (let key in this.defaultAttributes) {
            if (this.router.currentRoute.query[key] !== undefined) {
                this.attributes[key] = this.router.currentRoute.query[key];
            } else if (this.storage.getItem(`${this.storagePrefix}.${key}`) !== null) {
                this.attributes[key] = this.storage.getItem(`${this.storagePrefix}.${key}`);
            } else if (this.defaultAttributes[key] !== undefined) {
                this.attributes[key] = this.defaultAttributes[key];
            }
        }

        if (options.callback) {
            this.callback = options.callback;
        }

        this.setUri();
    }

    /**
     * Set attributes
     * @param attributes
     */
    setAttributes(attributes) {
        for (let key in attributes) {
            const value = attributes[key];
            this.setAttribute(key, value, false);
        }
        this.emitAction(this.emitActionName);
    }

    /**
     * Method works for pub/sub event.
     * Use when attribute changes and emit event
     * @param {object} obj include key and val
     * set val to storage
     * set new val for attribute
     *
     */
    onSetAttribute(obj) {
        if (this.attributes.hasOwnProperty(obj.key)) {
            this.storage.setItem(`${this.storagePrefix}.${obj.key}`, obj.value);
            this.attributes[obj.key] = obj.value;
        }
    }

    /**
     * Set attribute value and emit action
     * @param attribute
     * @param value
     * @param emit
     */
    setAttribute(attribute, value, emit = true) {
        if (this.attributes.hasOwnProperty(attribute)) {
            this.storage.setItem(`${this.storagePrefix}.${attribute}`, value);
            this.attributes[attribute] = value;
            if (emit) {
                this.emitAction(this.emitActionName);
            }
        }
    }

    /**
     * Remove attribute value and emit action
     * @param attribute
     * @param emit
     */
    removeAttribute(attribute, emit = true) {
        if (this.attributes.hasOwnProperty(attribute)) {
            this.storage.removeItem(`${this.storagePrefix}.${attribute}`);
            delete this.attributes[attribute];
            if (emit) {
                this.emitAction(this.emitActionName);
            }
        }
    }

    /**
     * Get attributes
     * @returns {{}}
     */
    getAttributes() {
        return this.attributes;
    }

    /**
     * Get attribute by name
     * @param attribute
     * @returns {*}
     */
    getAttribute(attribute) {
        return this.attributes[attribute];
    }

    /**
     * Check is initial attributes
     */
    isInitialAttributes() {
        let isSame = true;

        for (let key in this.attributes) {
            const item = this.attributes[key];
            if (item !== this.defaultAttributes[key]) {
                isSame = false;
            }
        }

        return isSame;
    }

    /**
     * Set url query parameters
     */
    setUri() {
        let attributes = [];
        for (let key in this.attributes) {
            const value = this.attributes[key];
            let name = `${this.storagePrefix}.${key}`;
            if (value !== '' && value !== null) {
                attributes[key] = value;
                this.storage.setItem(name, value);
            } else {
                this.storage.removeItem(name);
            }
        }

        this.router.push({
            query: attributes,
        });
    }

    /**
     * Trigger action
     * @param callback
     */
    apply(callback) {
        this.emitAction('filters-apply');
        if (typeof callback === 'function') {
            callback();
        }
    }

    /**
     * Method set attributes in default values
     * @param callback {function} function send as attribute.
     */
    clear(callback) {
        for (let key in this.attributes) {
            if (-1 === this.excludeAttributes.indexOf(key)) {
                this.attributes[key] = this.defaultAttributes[key];
                this.storage.removeItem(`${this.storagePrefix}.${key}`);
            }
        }
        this.emitAction('filters-clear');
        if (typeof callback === 'function') {
            callback();
        }
    }

    /**
     *  Method emit one of several types of events, If filter options setup to watch on attributes changes
     *  method always will emit one event "filters-changed", else method will emit events for apply and clear filters.
     * @param action {String} name of event
     */
    emitAction(action) {
        this.setUri();
        this.callback(this.getAttributes());
    }

    triggerChanges() {
        this.emitAction(this.emitActionName);
    }

    triggerAwaitChanges(time) {
        clearTimeout(this.timeout);
        this.timeout = setTimeout(() => {
            this.emitAction('filters-changed');
        }, time || 300);
    }
}

export default Filters;
