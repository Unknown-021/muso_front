import Api from 'services/api';

export default {
    getSocialAccount(id, data) {
        return Api.get(`social-account/${id}`, data);
    },
};
