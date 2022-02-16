import BasicError from './basic';

export default class ServiceUnavailableError extends BasicError {
    constructor(message, options) {
        super(message, options);
        this.name = 'Service Temporary Unavailable';
        this.code = 503;
    }
}
