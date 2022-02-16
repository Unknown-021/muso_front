<template>
  <client-only>
    <mounting-portal mount-to="body" append target-slim>
      <div v-if="containerVisible" class="modal-container">
        <transition name="modal-fade" appear>
          <div
            v-if="visible"
            class="modal-overlay"
            :class="overlayClass"
            @click="hide"
          />
        </transition>

        <transition
          appear
          :name="modalTransition"
          @after-leave="afterLeave"
          v-on="transitionEvents"
        >
          <dialog
            v-if="visible"
            :class="cssClass"
            :style="modalStyle"
            :data-mobile-sliding="mobileSliding"
            v-bind="$attrs"
            v-on="$listeners"
          >
            <button v-if="closable" class="modal-close-btn" @click="hide">
              <cross-icon class="modal-close-btn__icon" />
            </button>
            <div v-if="mobileSliding" class="modal-mobile-exit" @click="hide" />

            <slot />
          </dialog>
        </transition>
      </div>
    </mounting-portal>
  </client-only>
</template>

<script>
import { MountingPortal } from 'portal-vue';
import ClientOnly from 'vue-client-only';
import ExitButton from "assets/images/icons/x_circle_button.svg";
import BaseModalCancelButton from './base-modal-cancel-button';
import CrossIcon from 'assets/images/icons/cross-thin.svg';
import { newDestructedPromise } from 'helpers/utils';

export { BaseModalCancelButton };

export default {
  name: 'base-modal',
  inheritAttrs: false,
  components: {
    ExitButton,
    ClientOnly,
    MountingPortal,
    CrossIcon
  },
  props: {
    show: {
      type: Boolean,
      default: false
    },
    closable: {
      type: Boolean,
      default: true
    },
    modalClass: {
      type: String,
      default: ''
    },
    modalStyle: {
      type: [String, Object],
      default: undefined
    },
    overlayClass: {
      type: [String, Object],
      default: ''
    },
    mobileSliding: {
      type: Boolean,
      default: false
    },
    transitionEvents: {
      type: Object,
      default() {
        return {};
      }
    }
  },
  provide() {
    return {
      modalComponent: this
    };
  },
  data() {
    return {
      // We want our modal component to support v-if directive,
      // and "visible" property allows to serve this need
      visible: false,
      containerVisible: false,
      transitionPromise: null
    };
  },
  beforeDestroy() {
    this.ensureTransitionEnd();
  },
  watch: {
    show: {
      immediate: true,
      handler(value) {
        if (value) {
          this.containerVisible = true;
        }
        this.visible = value;
      }
    }
  },
  computed: {
    cssClass() {
      return {
        [this.modalClass]: true,
        'modal-box': true,
        'modal-box--mobile-sliding': this.mobileSliding
      };
    },
    modalTransition() {
      return this.mobileSliding
        ? 'modal-mobile-sliding-transition'
        : 'modal-transition';
    }
  },
  methods: {
    hide() {
      this.visible = false;
      this.transitionPromise = newDestructedPromise();
      return this.transitionPromise.promise;
    },
    _innerHide() {
      this.$emit('update:show', false);
      this.containerVisible = false;
    },
    afterLeave(el) {
      this._innerHide();
      if (this.transitionPromise) {
        this.transitionPromise.resolve();
        this.transitionPromise = null;
      }
    },
    ensureTransitionEnd() {
      if (this.transitionPromise) {
        const transitionError = new Error('[base-modal] Transition cancelled');
        this.transitionPromise.reject(transitionError);
      }
    }
  }
};
</script>

<style lang="scss">
.modal-container {
  position: absolute;
  top: 0;
  left: 0;
  display: flex;
  flex-direction: column;
  width: 100%;
  min-height: 100%;
  z-index: 1000;
  @media (min-width: 768px) {
    padding: 45px 0;
  }
}

.modal-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(4, 3, 2, 0.79);
  @media (max-width: 767px) {
    align-items: flex-end;
  }
}

.modal-box {
  --modal-padding-x: 16px;
  --modal-padding-y: 28px;
  --modal-border-radius: 8px;
  --modal-rest-padding-x: calc(-1 * var(--modal-padding-x));
  --modal-full-body-width: calc(100% + 2 * var(--modal-padding-x));
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  position: relative;
  z-index: 1001;
  margin: auto;
  border: 0;
  padding: 0;
  width: 100%;
  max-width: 500px;
  max-height: 500px;
  background: #1A1814;
  box-shadow: 1px 6px 35px rgba(4, 3, 2, 0.45);
  border-radius: var(--modal-border-radius);
  color: #F2F2F2;
  &--mobile-sliding {
    @media (max-width: 767px) {
      border-radius: 0;
      border-top-left-radius: 8px;
      border-top-right-radius: 8px;
      margin-bottom: 0;
      padding-top: 0px;
      max-width: none;
      max-height: calc(100% - 60px);
    }
  }
  @media (min-width: 768px) {
    --modal-padding-x: 30px;
    margin: auto;
    max-width: 688px;
    height: auto;
  }
  &--narrow {
    @media (min-width: 768px) {
      max-width: 370px;
    }
  }
}

.modal-close-btn {
  position: absolute;
  top: 18px;
  right: 15px;
  padding: 0;
  border: 0;
  width: 20px;
  height: 20px;
  box-shadow: none;
  border-radius: 20px;
  color: #424242;
  background-color: unset;
  transition: color 100ms ease-in-out;
  &:hover,
  &:active {
    color: #8F8F8F;
  }
  @media (min-width: 768px) and (max-width: 1100px) {
    top: auto;
    bottom: calc(100% + 10px);
    right: -5px;
  }
  &__icon {
    width: 16px;
    height: 16px;
    fill: currentColor;
  }
}

.modal-text {
  font-size: 17px;
  line-height: 1.5;
  a {
    color: #6BE7C8;
  }
  p {
    margin-bottom: 1em;
    &:last-child {
      margin-bottom: 0;
    }
  }
}

.modal-rich-text {
  a {
    color: #6BE7C8;
  }
  p {
    margin-bottom: 1em;
    &:last-child {
      margin-bottom: 0;
    }
  }
}

.modal-mobile-exit {
  flex: 0;
  display: flex;
  justify-content: center;
  position: relative;
  padding: 8px 0;
  width: 100%;
  background-color: transparent;
  &::before {
    content: "";
    width: 56px;
    min-height: 4px;
    background: #595857;
    border-radius: 100px;
  }
  @media (min-width: 768px) {
    display: none;
  }
}

.modal-header {
  flex-shrink: 0;
  display: flex;
  align-items: center;
  padding: 12px var(--modal-padding-x);
  @media (max-width: 767px) {
    border-bottom: 1px solid #21201f;
  }
  @media (min-width: 768px) {
    padding-top: 28px;
    padding-bottom: 9px;
  }
  + .modal-body {
    padding-top: 6px;
  }
  &__title {
    font-weight: 500;
    font-size: 14px;
    line-height: 130%;
    color: #F2F2F2;
    @media (min-width: 768px) {
      margin-bottom: 4px;
      font-size: 20px;
    }
  }
  &__text {
    font-size: 14px;
    font-weight: normal;
    line-height: 1.2;
    color: #8F8F8F;
  }
  &__image {
    height: 44px;
    width: 44px;
    margin-right: 16px;
    @media (min-width: 768px) {
      margin-right: 20px;
      width: 50px;
      height: 50px;
    }
  }
}

.modal-title {
  flex-shrink: 0;
  padding: 14px var(--modal-padding-x);
  font-size: 24px;
  line-height: 1.1;
  font-weight: bold;
  letter-spacing: 1px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  color: #FFFFFF;
  + .modal-body {
    padding-top: 0;
  }
}

.modal-body {
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: var(--modal-padding-y) var(--modal-padding-x);
  overflow-x: hidden;
  overflow-y: auto;
  @media (max-width: 767px) {
    padding-top: 15px;
  }
  > * {
    flex-shrink: 0;
  }
}

.modal-list {
  display: flex;
  flex-direction: column;
  margin-left: calc(-1 * var(--modal-padding-x));
  margin-right: calc(-1 * var(--modal-padding-x));
  &__item {
    margin-bottom: -1px;
    position: relative;
    display: flex;
    align-items: center;
    padding: 17px var(--modal-padding-x);
    min-height: 58px;
    font-size: 14px;
    line-height: 1.25;
    font-weight: 500;
    color: var(--overlay-1-color);
    text-transform: capitalize;
    text-decoration: none;
    transition: background-color 100ms ease-in-out;
    &:hover {
      text-decoration: none;
    }
    @at-root .desktop &:hover,
    &.touched {
      background-color: #272625;
    }
    &::after {
      content: "";
      position: absolute;
      left: var(--modal-padding-x);
      right: 0;
      bottom: 0;
      border-bottom: 1px solid #272625;
    }
    &:last-child {
      margin-bottom: 0;
    }
    &:last-child::after {
      display: none;
    }
  }
  &__icon,
  &__round-icon {
    flex-shrink: 0;
    margin-right: 15px;
    width: 24px;
    height: 24px;
    fill: #F7F7F7;
    svg {
      fill: inherit;
    }
  }
  &__round-icon {
    border-radius: 50%;
  }
}

.modal-buttons {
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-end;
  border-top: 1px solid rgba(89, 88, 87, 0.4);
  padding: 10px var(--modal-padding-x);
  > button {
    margin-right: 10px;
    width: auto;
    min-width: 120px;
  }
  :last-child {
    margin-right: 0;
  }
}

.modal-cancel {
  display: block;
  border: none;
  margin-bottom: 15px;
  margin-left: var(--modal-rest-padding-x);
  margin-right: var(--modal-rest-padding-x);
  padding: 20px var(--modal-padding-x);
  border-radius: 0;
  border-top: 1px solid #272625;
  width: var(--modal-full-body-width);
  font-weight: bold;
  font-size: 12px;
  line-height: 1.3;
  letter-spacing: 3px;
  text-align: center;
  text-transform: uppercase;
  color: #6be7c8;
  cursor: pointer;
  box-shadow: none;
  background-color: transparent;
  @media (min-width: 768px) {
    display: none;
  }
}

.modal-mobile-sliding-transition {
  &-enter-active,
  &-leave-active {
    transition: transform 350ms cubic-bezier(0.25, 0.1, 0.25, 1);
    @media (min-width: 768px) {
      transition-property: transform, opacity;
      transition-duration: 300ms;
    }
  }
  &-enter-active {
    // Fix transition for iOS devices. Without this delay modal on iOS devices
    // will appear without any animation
    transition-delay: 100ms;
  }
  &-enter,
  &-leave-to {
    transform: translateY(100%);
    @media (min-width: 768px) {
      transform: scale(1.1);
      opacity: 0;
    }
  }
}

.modal-transition {
  &-enter-active,
  &-leave-active {
    transition-property: transform, opacity;
    transition-duration: 300ms;
  }
  &-enter-active {
    // Fix transition for iOS devices. Without this delay modal on iOS devices
    // will appear without any animation
    transition-delay: 100ms;
  }
  &-enter,
  &-leave-to {
    transform: scale(1.1);
    opacity: 0;
  }
}

.modal-fade {
  &-enter-active,
  &-leave-active {
    transition: opacity 350ms cubic-bezier(0.25, 0.1, 0.25, 1);
    @media (min-width: 768px) {
      transition-duration: 300ms;
    }
  }
  &-enter,
  &-leave-to {
    opacity: 0;
  }
}
</style>
