export default {
  inserted(el, binding) {
    const focusableEl = binding.modifiers.nested
      ? el.querySelector('[data-nested-focus]') || el.querySelector('input')
      : el;

    if (focusableEl) {
      const value = focusableEl.value;
      focusableEl.focus();
      // This trick will force cursor to appear at the end
      // of the text in text input element
      // Source: https://stackoverflow.com/a/2345915
      if (focusableEl instanceof HTMLElement && value) {
        focusableEl.value = '';
        focusableEl.value = value;
      }
    }
  },
};
