<template>
  <div class="stats-list">
    <template v-for="(item, index) in items">
      <p
        :key="item.title"
        class="amount-info"
        :data-streams-info="Boolean(item.infoButton)"
      >
        <strong class="amount-info__title">{{ item.title }}</strong>
        <span class="amount-info__text">
          <template>{{ item.value | NumberFilter(true) }}</template>
          <component v-if="item.infoButton" :is="item.infoButton" class="amount-info__info-btn" />
        </span>
      </p>
      <div :key="index" class="amount-info-sd" />  
    </template>
  </div>
</template>

<script>
export default {
  name: 'stats-list',
  props: {
    items: {
      type: Array,
      required: true
    }
  }
}
</script>

<style lang="scss">
.stats-list {
  display: flex;
  @media (max-width: 767px) {
    flex-grow: 1;
  }
}
</style>
