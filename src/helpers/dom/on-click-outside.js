export function onClickOutside(el, handler, options) {
  const handleClick = (event) => {
    const target = event.target;
    const isClickedOutside = !el.contains(target);

    if (isClickedOutside) {
      handler(event);
    }
  };

  const on = () => document.addEventListener('click', handleClick, options);
  const off = () => document.removeEventListener('click', handleClick, options);

  on();

  return { on, off };
}
