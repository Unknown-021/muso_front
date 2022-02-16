import _ from 'lodash';

function checkRoute(acl, user) {
    if (acl.rules) {
        let answer = [];
        let only = [];
        let except = [];
        let userRoles = [];
        if (user && user.roles && user.roles.length) {
            _.each(user.roles, role => {
                userRoles.push(role);
            });
        } else {
            userRoles.push('guest');
        }

        for (let i = 0; i < acl.rules.length; i++) {
            let role = acl.rules[i];
            if (_.isFunction(role)) {
                answer.push(role.call(undefined, user));
            } else if (role === '*') {
                answer.push(true);
            } else if (role[0] === '-') {
                except.push(role.slice(1));
            } else {
                only.push(role);
            }
        }

        if (only.length) {
            _.each(userRoles, role => {
                if (-1 !== only.indexOf(role)) {
                    answer.push(true);
                } else {
                    answer.push(false);
                }
            });
        } else {
            _.each(userRoles, role => {
                if (-1 === except.indexOf(role)) {
                    answer.push(true);
                } else {
                    answer.push(false);
                }
            });
        }

        return -1 === answer.indexOf(false);
    }

    return true;
}

export default {
    checkRoute,
};
