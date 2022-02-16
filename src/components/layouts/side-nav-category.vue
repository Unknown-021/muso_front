<template>
  <li class="side-nav__category">
    <p class="side-nav__category-title">{{ category.title }}</p>
    <template v-for="child in children">
      <div
        :key="child.title"
        :class="{
          'side-nav__item': true,
          'side-nav__item--active': isRouteActive(child.route)
        }"
      >
        <router-link class="side-nav__link" :to="child.route">{{ child.title }}</router-link>
        <span v-if="child.count !== undefined" class="side-nav__count">{{ child.count }}</span>
      </div>
    </template>
    <template v-if="childrenExceedLimit">
      <plain-button
        :component="ToggleButton"
        :active.sync="isExpanded"
        class="side-nav__toggle-btn"
        variant="ghost"
      >
        <template v-if="isLimited">Show {{ limitedCount }} More</template>
        <template v-else>Show Less</template>
      </plain-button>
    </template>
  </li>
</template>

<script>
import ToggleButton from 'components/ui/toggle-button.vue';
import PlainButton from 'components/ui/base-plain-button/base-plain-button.vue';
import { isObjectEqualSimple } from 'helpers/object';

export default {
  name: 'side-nav-category',
  components: {
    ToggleButton,
    PlainButton
  },
  props: {
    category: {
      type: Object,
      required: true
    },
    limit: {
      type: Number,
      default: 10
    }
  },
  data() {
    return {
      isExpanded: false
    };
  },
  computed: {
    ToggleButton: () => ToggleButton,
    isLimited() {
      return !this.isExpanded;
    },
    childrenExceedLimit() {
      return this.limitedCount > 0;
    },
    limitedCount() {
      return this.category.children.length - this.limit;
    },
    children() {
      const { children } = this.category;
      return this.childrenExceedLimit && this.isLimited
        ? children.slice(0, this.limit)
        : children;
    }
  },
  methods: {
    isRouteActive(route) {
      const resolved = this.$router.resolve(route);
      
      // IMPORTANT: we cannot simply compare if the routes match with the following condition:
      // resolved.route.fullPath === this.$route.fullPath
      // This is simply because queries might have the same values but in different order
      // '?foo=value1&bar=value2' !== '?bar=value2&foo=value1'
      return (
        resolved.route.path === this.$route.path &&
        isObjectEqualSimple(resolved.route.query, this.$route.query)
      );
    }
  }
}
</script>
