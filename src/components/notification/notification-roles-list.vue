<template>
  <span>
    <template v-for="(role, index) in roles">
      <template v-if="index !== 0">, </template>
      <span :key="index" class="c-overlay-1">{{ role.association }}</span>
    </template>
  </span>
</template>

<script>
export default {
  name: 'notification-roles-list',
  props: {
    roles: {
      type: Array,
      required: true
    }
  }
}
</script>