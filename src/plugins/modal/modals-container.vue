<template>
  <div>
    <template v-for="modal in modals">
      <component
        :ref="modal.key"
        :is="modal.component"
        :key="modal.key"
        :show.sync="isModalVisible[modal.key]"
        v-bind="modal.props"
        @update:show="onVisibilityChange($event, modal)"
      />
    </template>
  </div>
</template>

<script>
import { removeArrayElement } from 'helpers/array';
import { mapNameToComponent } from './modal.config';

let id = 0;

export default {
  name: 'modals-container',
  data() {
    return {
      modals: [],
      isModalVisible: {}
    };
  },
  methods: {
    open({ name, props }) {
      const key = ++id;
      this.modals.push({
        component: mapNameToComponent[name],
        key,
        props
      });
      this.$set(this.isModalVisible, key, true);

      return new Promise(resolve => {
        this.$nextTick(() => resolve(this.$refs[key][0]));
      });
    },
    close(modal) {
      this.isModalVisible[modal.key] = false;
      this.$delete(this.isModalVisible, modal.key);
      removeArrayElement(this.modals, modal);
    },
    onVisibilityChange(isVisible, modal) {
      if (!isVisible) {
        this.close(modal);
      }
    },
    destroyAll() {
      for (let key in this.isModalVisible) {
        this.isModalVisible[key] = false;
      }
    }
  }
}
</script>