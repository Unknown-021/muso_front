function loadScript({ nonce }) {
  return new Promise((resolve, reject) => {
    if (window.AppleID) {
      resolve();
    }
    const script = document.createElement('script');
    script.src = 'https://appleid.cdn-apple.com/appleauth/static/jsapi/appleid/1/en_US/appleid.auth.js';
    script.onload = resolve;
    script.onerror = reject;
    script.nonce = nonce;
    document.body.append(script);
  });
}

export const AppleAuth = {
  loadScript
};
