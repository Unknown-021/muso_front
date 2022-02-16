import env from 'env.json';

function loadScript({ nonce }) {
    return new Promise(resolve => {
        window.fbAsyncInit = function () {
            FB.init({
                appId: env.auth.facebook.appId,
                xfbml: false,
                version: 'v8.0',
                cookie: true
            });
            FB.AppEvents.logPageView();
            resolve();
        };
        (function (d, s, id) {
            const fjs = d.getElementsByTagName(s)[0];
            if (d.getElementById(id)) {
                return;
            }
            const js = d.createElement(s);
            js.id = id;
            js.src = '//connect.facebook.net/en_US/sdk.js';
            js.nonce = nonce;
            fjs.parentNode.insertBefore(js, fjs);
        }(document, 'script', 'facebook-jssdk'));
    });
}

function getLoginStatus() {
    return new Promise(resolve => {
        window.FB.getLoginStatus(responseStatus => {
            resolve(responseStatus);
        });
    });
}

function login(options) {
    return new Promise(resolve => {
        window.FB.login(response => resolve(response), options);
    });
}

function logout() {
    return new Promise(resolve => {
        window.FB.logout(response => resolve(response));
    });
}

export const FacebookAuth = {
    loadScript,
    getLoginStatus,
    login,
    logout
};