<script>
import { debounce } from 'helpers/utils';

export default {
  name: 'sync-url-query',
  render() {
    const children = this.$slots.default;

    return children ? children[0] : null;
  },
  props: {
    value: {
      type: [String, Number],
      default: undefined
    },
    debounce: {
      type: Number,
      default: 200
    },
    query: {
      type: String,
      required: true
    },
    replace: {
      type: Boolean,
      default: true
    }
  },
  watch: {
    value() {
      this.updateUrlWithDebounce();
    }
  },
  computed: {
    updateUrlWithDebounce() {
      return debounce(this.updateUrl, this.debounce);
    }
  },
  methods: {
    updateUrl() {
      const value = this.value || undefined;
      const currentValue = this.$route.query[this.query];
      if (value === currentValue) return;

      const route = {
        path: this.$route.path,
        query: {
          ...this.$route.query,
          [this.query]: value
        }
      };

      if (this.replace) {
        this.$router.replace(route);
      } else {
        this.$router.push(route);
      }
    }
  }
}
</script>