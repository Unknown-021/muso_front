import Vue from 'vue';
import { onClickOutside as _onClickOutside } from './dom/on-click-outside';
import { onWindowResize as _onWinowResize } from './dom/on-window-resize';

export function objectAssign(target, source) {
  for (let key in source) {
    Vue.set(target, key, source[key]);
  }
}

export function onWindowResize(vm, ...args) {
  return syncHandler(vm, _onWinowResize(...args));
}

export function onClickOutside(vm, ...args) {
  return syncHandler(vm, _onClickOutside(...args));
}

export function syncHandler(vm, handler) {
  vm.$once('hook:beforeDestroy', handler.off);
  vm.$on('hook:deactivated', handler.off);
  vm.$on('hook:activated', handler.on);

  return handler;
}

export function createPassdownListeners(vm, events) {
  const listeners = {};

  events.forEach(eventName => {
    listeners[eventName] = (...args) => {
      vm.$emit(eventName, ...args);
    };
  });

  return listeners;
}

const transitionEvents = ['before-enter', 'before-leave', 'after-enter', 'after-leave'];
export function createTransitionListeners(vm) {
  return createPassdownListeners(vm, transitionEvents);
}
