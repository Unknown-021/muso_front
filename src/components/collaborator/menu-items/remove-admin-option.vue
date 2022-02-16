<template>
  <base-menu-item icon="user-times" danger v-on="$listeners">
    <slot>Remove Admin</slot>
  </base-menu-item>
</template>

<script>
import { BaseMenuItem } from 'components/ui/base-menu/base-menu';

export default {
  name: 'remove-admin-option',
  components: {
    BaseMenuItem
  }
}
</script>