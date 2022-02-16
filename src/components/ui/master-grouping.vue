<template>
  <form-inline-select
    :value="value"
    :options="items"
    placement="bottom-end"
    @update:value="setValue"
    v-slot="selectedOption"
  >
    <master-button class="mobile-none" :value="getTitle(selectedOption)">Group by</master-button>
  </form-inline-select>
</template>

<script>
import MasterButton from './master-button.vue';
import FormInlineSelect from 'components/ui/form-inline-select.vue';

export default {
  name: 'master-grouping',
  components: {
    MasterButton,
    FormInlineSelect
  },
  props: {
    value: {
      type: String,
      default: ''
    },
    items: {
      type: Array,
      required: true
    }
  },
  methods: {
    setValue(value) {
      this.$emit('update:value', value);
    },
    getTitle({ title, value }) {
      return value ? title : '';
    }
  }
}
</script>
