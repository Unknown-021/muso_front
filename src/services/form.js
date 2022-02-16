class Form {

    constructor(attributes = {}, scenario) {
        this.attributes = attributes;
        this.initialAttributes = { ...attributes };
        this.scenario = scenario;
        this.processing = false;
        this.errors = {};

        // populate errors for reactivity
        this.attributes.each((value, key) => {
            this.errors[key] = null;
        });
    }

    setProcessing(state) {
        this.processing = state;
    }

    isProcessing() {
        return !!this.processing;
    }

    setScenario(scenario) {
        this.scenario = scenario;
    }

    getScenario() {
        return this.scenario;
    }

    isScenario(value) {
        return this.scenario === value;
    }

    setErrors(errors) {
        errors.forEach((value, key) => {
            this.errors[key] = value;
        });
        this.errors = Object.assign({}, this.errors);
    }

    getError(attribute, idx = null) {
        if (idx !== null && this.errors[attribute]) {
            return this.errors[attribute][idx];
        }

        return this.errors[attribute];
    }

    getErrorMessage(attribute, idx = null) {
        let error = this.errors[attribute];

        if (idx !== null && error) {
            error = error[idx];
        }

        if (error) {
            return error.message;
        }

        return null;
    }

    hasError(attribute, idx = null) {
        return !!this.getError(attribute, idx);
    }

    clearErrors() {
        this.errors = {};
    }

    clearError(attribute) {
        this.errors[attribute] = undefined;
    }

    getAttributes() {
        return this.attributes;
    }

    getAttribute(attribute) {
        return this.attributes[attribute];
    }

    setAttributes(attributes) {
        this.attributes.forEach((value, attribute) => {
            if (attributes[attribute] !== undefined) {
                this.attributes[attribute] = attributes[attribute];
            }
        });
    }

    setAttribute(attribute, value) {
        this.attributes[attribute] = value;
    }

    clearAttributes() {
        this.attributes = { ...this.initialAttributes };
    }

    makeFormData(files) {
        let formData = new FormData();
        this.attributes.forEach((value, key) => {
            if (value) {
                if (files[key]) {
                    formData.append(key, value, files[key])
                } else {
                    formData.append(key, value)
                }
            }
        });
        return formData;
    }
}

export default Form;
