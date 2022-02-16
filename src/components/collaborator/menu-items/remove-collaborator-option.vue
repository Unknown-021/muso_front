<template>
  <base-menu-item icon="bin" danger v-on="$listeners">
    <slot>Remove Collaborator</slot>
  </base-menu-item>
</template>

<script>
import { BaseMenuItem } from 'components/ui/base-menu/base-menu';

export default {
  name: 'remove-collaborator',
  components: {
    BaseMenuItem
  }
}
</script>