(function() {
  initDetectionOfDeviceType();
})();

function initDetectionOfDeviceType() {
  function detectMob() {
    var toMatch = [
      /Android/i,
      /webOS/i,
      /iPhone/i,
      /iPad/i,
      /iPod/i,
      /BlackBerry/i,
      /Windows Phone/i
    ];

    return toMatch.some(function(toMatchItem) {
      return navigator.userAgent.match(toMatchItem);
    });
  }

  document.body.classList.add(detectMob() ? 'mobile' : 'desktop');
}
