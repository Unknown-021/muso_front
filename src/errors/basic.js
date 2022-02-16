function getRouteName() {
    return this.routeName;
}

function getName() {
    return this.name
}

function getStatus() {
    return this.status
}

function getRoutePath() {
    return this.routePath;
}

function getCode() {
    return this.code;
}

function getMessage() {
    return this.message;
}

function getRouteParams() {
    return this.routeParams;
}

export default class BasicError extends Error {
    constructor(message, options) {
        super(message);
        this.name = null;
        this.routeName = options.routeName;
        this.routePath = options.routePath;
        this.status = options.status;
        this.routeParams = options.routeParams;

        this.getName = getName;
        this.getRouteName = getRouteName;
        this.getRoutePath = getRoutePath;
        this.getStatus = getStatus;
        this.getCode = getCode;
        this.getMessage = getMessage;
        this.getRouteParams = getRouteParams;
    }
}
