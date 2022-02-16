export const DEVICE_TYPES = {
  IOS: "ios",
  ANDROID: "android",
  IPOD: "ipod",
  IPAD: "ipad",
  IPHONE: "iphone",
  MOBILE: "mobile",
};

const detectors = {
  [DEVICE_TYPES.IPOD]: Boolean(navigator.userAgent.match(/iPod/i)),
  [DEVICE_TYPES.IPAD]: Boolean(navigator.userAgent.match(/iPad/i)),
  [DEVICE_TYPES.IPHONE]: Boolean(navigator.userAgent.match(/iPhone/i)),
  [DEVICE_TYPES.ANDROID]: Boolean(navigator.userAgent.toLowerCase().match(/android/i)),
};

detectors[DEVICE_TYPES.IOS] = detectors.ipod || detectors.ipad || detectors.iphone;
detectors[DEVICE_TYPES.MOBILE] = detectors.android || detectors.ios;

export const DeviceDetector = detectors;

export const DeviceDetectorPlugin = {
  install(Vue) {
    Vue.prototype.$deviceDetector = detectors;
  }
};
