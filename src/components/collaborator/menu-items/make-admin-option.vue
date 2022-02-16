<template>
  <base-menu-item
    icon="user-add"
    data-closable="false"
    v-bind="$attrs"
    v-on="$listeners"
  >
    <slot>Make Admin</slot>
  </base-menu-item>
</template>

<script>
import { BaseMenuItem } from 'components/ui/base-menu/base-menu';

export default {
  name: 'remove-admin',
  components: {
    BaseMenuItem
  }
}
</script>