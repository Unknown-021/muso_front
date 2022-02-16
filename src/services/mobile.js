const MOBILE_APPLICATION_SCHEME = 'openmed://';

export default {
    linkRecovery(code) {
        return `${MOBILE_APPLICATION_SCHEME}forgot-password?code=${code}`;
    },
    linkConfirmedPhone() {
        return `${MOBILE_APPLICATION_SCHEME}home?reason=phone_confirmed`;
    },
    linkConfirmedEmail() {
        return `${MOBILE_APPLICATION_SCHEME}home?reason=email_confirmed`;
    },
}
