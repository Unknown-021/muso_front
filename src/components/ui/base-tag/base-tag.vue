<template>
  <span class="base-tag" :data-loading="loading" v-on="$listeners">
    <transition name="fade-fast">
      <div v-if="loading" class="base-tag__loader-wrap">
        <base-loader v-if="loading" class="base-tag__loader" />
      </div>
    </transition>

    <slot />
    <button v-if="removable" type="button" class="base-tag__remove zero-btn" @click="emitRemove">
      <cross-icon class="base-tag__remove-icon" />
    </button>
  </span>
</template>

<script>
import CrossIcon from 'assets/images/icons/cross-new.svg';
import BaseLoader from 'components/ui/loader.vue';

export default {
  name: 'base-tag',
  components: {
    CrossIcon,
    BaseLoader
  },
  props: {
    removable: {
      type: Boolean,
      default: false
    },
    loading: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    emitRemove() {
      this.$emit('remove');
    }
  }
}
</script>

<style lang="scss">
:root {
  --tag-padding: 4px 6px;
  --tag-border-radius: 4px;
  --tag-background-color: rgba(89, 88, 87, 0.3);
}

.base-tag {
  display: inline-flex;
  align-items: center;
  position: relative;
  overflow: hidden;
  padding: var(--tag-padding);
  border-radius: var(--tag-border-radius);
  min-height: 20px;
  font-size: 14px;
  font-weight: 500;
  line-height: 1.2;
  color: #F7F7F7;
  background-color: var(--tag-background-color);
  transition: color 100ms;
  &[data-loading] {
    user-select: none;
    color: rgba(247, 247, 247, 0.4);
  }
  &__remove {
    flex-shrink: 0;
    margin-left: 7px;
    margin-right: 1px;
    position: relative;
    width: 9px;
    height: 9px;
    fill: #8F8F8F;
    transition: fill 100ms;
    &::before {
      content: "";
      position: absolute;
      top: -5px;
      right: -5px;
      bottom: -5px;
      left: -3px;
    }
    &:hover {
      fill: rgb(89, 88, 87);
    }
    &:active {
      fill: rgb(71, 70,70);
    }
  }
  &__loader-wrap {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    margin: auto;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  &__loader {
    transform: scale(0.4);
  }
}
</style>