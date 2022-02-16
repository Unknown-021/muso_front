import axios from 'axios';
import config from 'config';

function buildRequest(method, options, data) {

    if (typeof options === 'string') {
        options = {
            url: options,
        }
    }

    const request = {
        baseURL: config.bases.api,
        method: method,
        headers: {},
        url: options.url,
    };

    if (method === 'GET' || method === 'DELETE') {
        request.params = data;
    } else {
        request.data = data;
    }

    if (options.responseType) {
        request.responseType = options.responseType;
    }

    return request;
}

function makeCall(method, options, data) {
    return axios(buildRequest(method, options, data)).then(response => {
        if (response.data) {
            return response.data;
        }
    }).catch(error => {
        if (error.response && error.response.data) {
            throw error.response.data;
        }

        throw error;
    });
}

export default {
    get(options, data) {
        return makeCall('GET', options, data);
    },
    post(options, data) {
        return makeCall('POST', options, data);
    },
    put(options, data) {
        return makeCall('PUT', options, data);
    },
    patch(options, data) {
        return makeCall('PATCH', options, data);
    },
    delete(options, data) {
        return makeCall('DELETE', options, data);
    },
};
