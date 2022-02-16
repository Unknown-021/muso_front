<template>
  <div class="tags-box" :data-empty="noRoles">
    <slot v-if="noRoles" name="empty">
      Unassigned <exclamation-icon class="tags-box__icon" />
    </slot>
    <template v-else>{{ rolesList }}</template>
  </div>
</template>

<script>
import ExclamationIcon from 'assets/images/icons/exclamation-circle.svg';

export default {
  name: 'roles-list',
  components: {
    ExclamationIcon
  },
  props: {
    roles: {
      type: Array,
      required: true
    },
    
  },
  computed: {
    noRoles() {
      return !this.roles.length;
    },
    rolesList() {
      return this.roles.map(role => role.association).join(', ');
    }
  }
}
</script>