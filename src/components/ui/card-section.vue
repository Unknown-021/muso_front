<template>
  <div class="card-section">
    <page-header class="card-section__header">
      <template #title>
        <slot name="title" />
      </template>
      <template #description>
        <slot name="description" />
      </template>
    </page-header>

    <slot />
  </div>
</template>

<script>
import PageHeader from 'components/ui/page-header.vue';

export default {
  name: 'subscription-page',
  components: {
    PageHeader
  }
};
</script>
