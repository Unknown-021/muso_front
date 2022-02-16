<template>
  <div class="credits-section-skel">
    <skeleton class="section-header-skel" />

    <columns-grid :column-count="columnCount">
      <template v-for="index in 6">
        <div :key="index" class="credit-card-skel">
          <div class="credit-card-skel__title">
            <skeleton class="middle thin" />
          </div>
          <div class="credit-card-skel__inner">
            <div v-for="itemIndex in 4" :key="itemIndex" class="credit-card-skel__item">
              <skeleton class="small-img rounded mr-15" />
              <skeleton class="short thin" />
              <skeleton class="short thin ml-auto" />
            </div>
          </div>
        </div>
      </template>
    </columns-grid>
  </div>
</template>

<script>
import Skeleton from "components/ui/skeleton";
import ColumnsGrid from 'components/ui/columns-grid.vue';

export default {
  name: 'credits-section-skeleton',
  components: {
    Skeleton,
    ColumnsGrid
  },
  props: {
    showTitle: {
      type: Boolean,
      default: true
    },
    columnCount: {
      type: Number,
      default: 1
    }
  }
}
</script>

<style lang="scss">
.credits-section-skel {
  &__title-mobile {
    margin-top: 1px;
    margin-bottom: 16px;
    @media (min-width: 768px) {
      display: none;
    }
  }
  &__title {
    margin-top: 5px;
    margin-bottom: 26px;
    @media (max-width: 767px) {
      display: none;
    }
  }
}

.credit-card-skel {
  width: 100%;
  &__title {
    display: flex;
    align-items: center;
    padding: 15px;
    height: 50px;
    background-color: rgb(32, 31, 30);
  }
  &__inner {
    padding-top: 10px;
    padding-bottom: 10px;
    background-color: #1d1c1b;
  }
  &__item {
    display: flex;
    align-items: center;
    padding: 4px 15px;
    min-height: 40px;
  }
  .skeleton {
    opacity: 0.3;
    background-color: #595857;
  }
}
</style>