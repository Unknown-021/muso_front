const IOS = 'ios';
const ANDROID = 'android';
const IPOD = 'ipod';
const IPAD = 'ipad';
const IPHONE = 'iphone';
const MOBILE = 'mobile';

let detectors = {
    ipod: navigator.userAgent.match(/iPod/i),
    ipad: navigator.userAgent.match(/iPad/i),
    iphone: navigator.userAgent.match(/iPhone/i),
    android: navigator.userAgent.toLowerCase().match(/android/i),
};
detectors.ios = detectors.ipod || detectors.ipad || detectors.iphone;
detectors.mobile = detectors.android || detectors.ios;

export default {
    types: {
        IOS,
        ANDROID,
        IPOD,
        IPAD,
        IPHONE,
        MOBILE,
    },
    is(type) {
        type = type.toLowerCase();
        return !!detectors[type];
    },
}
