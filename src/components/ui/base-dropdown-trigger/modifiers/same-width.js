export const sameWidth = {
  name: 'sameWidth',
  enabled: true,
  phase: 'beforeWrite',
  requires: ['computeStyles'],
  options: {
    extendWidth: 0,
    prop: 'width'
  },
  fn: ({ state, options }) => {
    state.styles.popper[options.prop] = state.elements.popper.style[options.prop];
  },
  effect({ state, options }) {
    state.elements.popper.style[options.prop] = `${state.elements.reference.offsetWidth + options.extendWidth}px`;
  }
};
