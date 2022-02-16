import BasicError from './basic';

export default class NotFoundError extends BasicError {
    constructor(message, options) {
        super(message, options);
        this.code = 404;
        this.name = 'Not Found Error'
    }
}
