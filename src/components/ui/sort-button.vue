<template>
  <div class="sort-btn-wrap">
    <button class="sort-btn" type="button" @click="showModal" />
    <sort-modal
      :show.sync="isShowModal"
      :sorting="sorting"
      :columns="sortingColumns"
      @change="emitChange"
    />
  </div>
</template>

<script>
import SortModal from 'components/ui/sort-modal.vue';

export default {
  name: 'sort-button',
  components: {
    SortModal
  },
  props: {
    sortingColumns: {
      type: Array,
      required: true
    },
    sorting: {
      type: Object,
      default: undefined
    }
  },
  data() {
    return {
      isShowModal: false
    };
  },
  methods: {
    showModal() {
      this.isShowModal = true;
    },
    emitChange(event) {
      this.$emit('change', event);
    }
  }
}
</script>

<style lang="scss">
.sort-btn-wrap {
  display: inline-flex;
}

.sort-btn {
  position: relative;
  border: none;
  border-radius: 0;
  padding: 0;
  width: 22px;
  height: 22px;
  background-image: url("images/icons/sort.svg");
  background-size: 24px auto;
  background-position: center;
  background-repeat: no-repeat;
  background-color: transparent;
  &::before {
    content: "";
    position: absolute;
    top: -5px;
    left: -5px;
    right: -5px;
    bottom: -5px;
  }
}
</style>
