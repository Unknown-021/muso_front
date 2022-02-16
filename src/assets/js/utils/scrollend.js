(function() {
  var scrollTimerId = null;

  window.addEventListener('scroll', function () {
    clearTimeout(scrollTimerId);
    scrollTimerId = setTimeout(dispatchScrollEnd, 60);
  }, true);
  
  function dispatchScrollEnd() {
    var event = new CustomEvent('scrollend');
    window.dispatchEvent(event);
  }
})();
