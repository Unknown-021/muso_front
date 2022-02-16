export const UPDATE_STICKY_HEADER_EVENT = 'update-sticky-trigger';

export function StickyTriggerController(vm) {
  const self = {
    sticked: false,
    
    setValue(value) {
      self.sticked = value;
    },

    update() {
      vm.$root.$emit(UPDATE_STICKY_HEADER_EVENT);
    }
  };

  return self;
};
