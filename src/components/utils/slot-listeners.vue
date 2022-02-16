<script>
// IMPORTANT: Works only with native DOM events e.g. 'click', 'mouseenter' etc., no custom Vue events
import { isObjectEqualSimple } from 'helpers/object';

export default {
  name: 'slot-listeners',
  // Here we will pass listeners only to first slots child
  render(h) {
    if (!this.$scopedSlots.default) {
      return null;
    }

    const [firstChild] = this.$scopedSlots.default({});
    if (!firstChild) {
      return null;
    }
    return firstChild;
  },
  data() {
    return {
      el: null
    };
  },
  mounted() {
    this.el = this.$el;
    this.addListeners();
    this.$on('hook:beforeDestroy', this.removeListeners);
    this.$watch('$listeners', this.updateListeners);
  },
  updated() {
    if (this.$el !== this.el) {
      const prev = this.el;
      this.el = this.$el;
      this.updateEl(this.el, prev); 
    }
  },
  methods: {
    addListeners() {
      on(this.el, this.$listeners);
    },
    removeListeners() {
      off(this.el, this.$listeners);
    },
    updateListeners(listeners, oldListeners) {
      if (isObjectEqualSimple(listeners, oldListeners)) return;
      if (oldListeners) {
        off(this.el, oldListeners);
      }
      if (listeners) {
        this.addListeners();
      }
    },
    updateEl(el, oldEl) {
      if (oldEl) {
        off(oldEl, this.$listeners);
      }
      if (el) {
        this.addListeners();
      }
    }
  }
}

function on(el, listeners) {
  doListener(el, listeners);
}

function off(el, listeners) {
  doListener(el, listeners, 'removeEventListener');
}

function doListener(el, listeners, action = 'addEventListener') {
  for (const event in listeners) {
    el[action](event, listeners[event]);
  }
}
</script>