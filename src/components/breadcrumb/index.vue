<template>
  <nav class="breadcrumb container">
    <a class="arrow arrow--back" aria-label="Go to previous page" @click="go(-1)" :class="{ active: true }">
      <arrow-icon />
    </a>
    <a class="arrow" arai-label="Go to next page" @click="go(1)" :class="{ active: true }">
      <arrow-icon />
    </a>
    <div class="crumb-list">
      <div
        v-for="(crumb, index) in bread"
        class="crumb"
        :class="{ capitalize: !crumb.explicitLabel }"
        :key="index"
      >
        <template v-if="crumb.route && !isLastCrumb(index)">
          <router-link v-if="crumb.route" :to="crumb.route">{{ crumb.label }}</router-link>
        </template>
        <span v-else>{{ crumb.label }}</span>
      </div>
    </div>
  </nav>
</template>

<script>
import ArrowIcon from "assets/images/icons/arrow-left.svg";
import { getBread } from './breadcrumb.util';

export default {
  name: "Breadcrumb",
  components: {
    ArrowIcon,
  },
  computed: {
    routeName() {
      return this.$route.name;
    },
    storePath() {
      return this.routeName;
    },
    query() {
      return this.$route.query;
    },
    data() {
      return this.$store.getters[`${this.storePath}/${this.storePath}Details`];
    },
    loading() {
      return this.$store.getters[`${this.storePath}/loadingDetails`];
    },
    bread() {
      if (this.loading) {
        return [];
      }

      return getBread(this.routeName, this.query, this.data);
    },
  },
  methods: {
    go(direction) {
      this.$router.go(direction);
    },
    isDisabled(direction) {
      return direction === "back";
    },
    isLastCrumb(index) {
      return (index + 1) === this.bread.length;
    }
  },
};
</script>

<style lang="scss">
:root {
  --top-panel-padding-top: 15px;
  --top-panel-padding-bottom: 20px;
}
</style>

<style scoped lang="scss">
.breadcrumb {
  display: flex;
  align-items: center;
  margin: var(--top-panel-padding-top) 0 var(--top-panel-padding-bottom);
  @media (max-width: 767px) {
    display: none;
  }
}
.arrow {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 20px;
  height: 20px;
  margin-right: 10px;
  cursor: pointer;
  text-decoration: none;
  &--back {
    margin-left: -3px;
  }

  svg {
    * {
      fill: #f7f7f7;
    }
  }

  &:nth-child(2) {
    margin-right: 17px;

    svg {
      transform: rotate(180deg);
    }
  }

  &.disabled {
    cursor: default;

    svg {
      * {
        fill: #595857;
      }
    }
  }
}
.crumb {
  display: inline;
  font-family: Inter;
  font-size: 14px;
  color: #8f8f8f;
  cursor: pointer;

  &:after {
    content: "/";
    margin: 0 3px;
    color: #8f8f8f;
  }

  &:last-child {
    color: #f7f7f7;
    cursor: initial;

    &:after {
      display: none;
    }
  }
}
.capitalize {
  text-transform: capitalize;
}

.crumb-list {
  display: block;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  word-break: break-word;
}
</style>
