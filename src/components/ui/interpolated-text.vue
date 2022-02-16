<template>
  <component :is="tag">
    <template v-for="(part, index) in text.parts">
      <template v-if="isSlot(index)">
        <slot :name="part" />
      </template>
      <template v-else>{{ part }}</template>
    </template>
  </component>
</template>

<script>
export function compileText(str) {
  const reg = /\{(\w+)\}/g;
  let match = null;
  let lastIndex = 0;

  const parts = [];
  const slots = [];

  while (match = reg.exec(str)) {
    const substr = str.slice(lastIndex, match.index);
    if (substr) {
      parts.push(substr)
      slots.push(false);
    }
    parts.push(match[1]);
    slots.push(true);
    lastIndex = match.index + match[0].length;
  };
  parts.push(str.slice(lastIndex));
  slots.push(false);

  return { parts, slots };
}

export default {
  name: 'interpolated-text',
  props: {
    tag: {
      type: String,
      default: 'p'
    },
    text: {
      type: Object,
      required: true
    }
  },
  methods: {
    isSlot(index) {
      return this.text.slots[index];
    }
  }
}
</script>