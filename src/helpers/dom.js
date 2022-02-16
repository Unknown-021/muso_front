export function isParentElementInteractive(el) {
  return Boolean(
    el.closest('button') ||
    el.closest('a') ||
    el.closest('input') ||
    el.closest('[data-interactive]')
  );
}

export function resetScrollPosition(el) {
  if (el) {
    el.scrollLeft = 0;
    el.scrollTop = 0;
  }
}

export function closest(el, selector, stopOnEl) {
  let currEl = el;

  do {
    if (Element.prototype.matches.call(currEl, selector)) {
      return currEl;
    }
    currEl = currEl.parentElement || currEl.parentNode;
  } while (currEl !== null && currEl.nodeType === 1 && currEl !== stopOnEl);

  return null;
}

export function isMouseMovedToElement(event, el) {
  const toElement = event.toElement || event.relatedTarget;
  return el.contains(toElement);
}

export function setDataset(el, prop, value) {
  if (value === false || value === null || value === undefined) {
    delete el.dataset[prop];
  } else {
    el.dataset[prop] = value;
  }
}

// Supports async callback
export function saveScrollPosition(callback, selectorOrEl = '#main-scroll-wrapper') {
  const scrollContainer = typeof selectorOrEl === 'string'
    ? document.querySelector(selectorOrEl)
    : selectorOrEl;

  if (scrollContainer) {
    const scrollTop = scrollContainer.scrollTop;
    const result = callback();

    Promise.resolve(result)
      .then(() => {
        scrollContainer.scrollTop = scrollTop;
      });
  }
}

export function onTransitionFinished(el, callback) {
  const handler = (event) => {
    el.removeEventListener('transitionend', handler);
    callback(event);
  };

  el.addEventListener('transitionend', handler);
}

export function getScrollableParent(el) {
  let scrollParent = el;
  
  while (scrollParent !== document.scrollingElement) {
    const scrollProp = window.getComputedStyle(scrollParent).getPropertyValue('overflow');
    if (scrollProp.includes('auto') || scrollProp.includes('scroll')) {
      break;
    }
    scrollParent = scrollParent.parentElement;
  }

  return scrollParent;
}

export function scrollToTheCenterOfParent(el) {
  const parentEl = getScrollableParent(el);
  const verticalShift = (parentEl.clientHeight - el.clientHeight) / 2;
  parentEl.scrollTop = el.offsetTop - verticalShift;
}

export function copyToClipboard(text) {
  const textarea = document.createElement('textarea');
  textarea.textContent = text;
  textarea.style.position = 'fixed';  // Prevent scrolling to bottom of page in Microsoft Edge.
  textarea.style.opacity = 0;
  document.body.appendChild(textarea);
  textarea.select();
  try {
    document.execCommand('copy');  // Security exception may be thrown by some browsers.
  } catch (error) {
    console.warn('Copy to clipboard failed.', error);
    throw new Error('Copy to clipboard failed.');
  }
  finally {
    document.body.removeChild(textarea);
  }
}

function createRange(node, chars, range) {
  if (!range) {
    range = document.createRange()
    range.selectNode(node);
    range.setStart(node, 0);
  }

  if (chars.count === 0) {
    range.setEnd(node, chars.count);
  } else if (node && chars.count >0) {
    if (node.nodeType === Node.TEXT_NODE) {
      if (node.textContent.length < chars.count) {
        chars.count -= node.textContent.length;
      } else {
        range.setEnd(node, chars.count);
        chars.count = 0;
      }
    } else {
      for (let lp = 0; lp < node.childNodes.length; ++lp) {
        range = createRange(node.childNodes[lp], chars, range);

        if (chars.count === 0) {
          break;
        }
      }
    }
  } 

  return range;
};

export function setCursorPosition(el, position) {
  if (position < 0) return;
  const range = createRange(el, { count: position });
  const selection = window.getSelection();

  if (range) {
    range.collapse(false);
    selection.removeAllRanges();
    selection.addRange(range);
  }
};

export function cloneElement(el) {
  const bounds = el.getBoundingClientRect();
  const clonedEl = el.cloneNode(true);

  Object.assign(clonedEl.style, {
    position: 'absolute',
    top: bounds.top + 'px',
    left: bounds.left + 'px',
    width: bounds.width + 'px',
    height: bounds.height + 'px'
  });

  return clonedEl;
}

let textWidthEl = null;
export function calcTextWidth(text, fontStyle = '') {
  if (!textWidthEl) {
    textWidthEl = document.createElement('span');
    Object.assign(textWidthEl.style, {
      position: 'absolute',
      left: '-9999px',
      top: 0,
      maxWidth: '100%',
      whiteSpace: 'pre',
      pointerEvents: 'none',
      opacity: 0
    });
    document.body.appendChild(textWidthEl);
  }

  const fontPromise = fontStyle
    ? document.fonts.load(fontStyle)
    : Promise.resolve();

  return fontPromise.then(() => {
    textWidthEl.textContent = text;
    textWidthEl.style.font = fontStyle;
    return textWidthEl.scrollWidth;
  });
}
