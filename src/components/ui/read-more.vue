<template>
  <div>
    {{ limitedText | EmptyFilter }}
    <button
      v-if="text.length !== limitedText.length"
      type="button"
      class="readmore-btn"
      @click="emitReadMore"
    >Read More...</button>
  </div>
</template>

<script>
import { truncateStrToNearestWord, stripHtmlTags } from 'helpers/text';
import { stripMusoTags } from 'helpers/muso-tag';

const MAX_LENGTH = 132;

export default {
  name: 'read-more',
  props: {
    text: {
      type: String,
      required: true
    },
    maxLength: {
      type: Number,
      default: MAX_LENGTH
    }
  },
  computed: {
    textContent() {
      return stripMusoTags(stripHtmlTags(this.text));
    },
    limitedText() {
      return truncateStrToNearestWord(this.textContent, this.maxLength);
    }
  },
  methods: {
    emitReadMore() {
      this.$emit('read-more');
    }
  }
}
</script>

<style lang="scss">
.readmore-btn {
  border: 0;
  border-radius: 0;
  padding: 0;
  background-color: transparent;
  color: #6be7c8;
}
</style>