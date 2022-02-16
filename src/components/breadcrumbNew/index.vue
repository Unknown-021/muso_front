<template>
  <nav class="breadcrumb container">
    <a class="arrow arrow--back" aria-label="Go to previous page" @click="go(-1)" :class="{ active: true }">
      <arrow-icon />
    </a>
    <div class="crumb-list">
      <div
        v-for="(crumb, index) in bread"
        class="crumb"
        :class="{ capitalize: !crumb.explicitLabel }"
        :key="index"
        @click="go(-1)"
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
  name: "BreadcrumbNew",
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
      return this.$store.getters[`${this.storeName}/${this.storePath}Details`];
    },
    loading() {
      return this.$store.getters[`${this.storePath}/loadingDetails`];
    },
    groupingAlbum() {
      return this.$store.getters['analytics/grouping/albumTitle'];
    },
    groupingCollaborators() {
      return this.$store.getters['analytics/grouping/collaboratorsName'];
    },
    groupingCredits() {
      return this.$store.getters['analytics/grouping/creditsTitle'];
    },
    groupingTitle() {
      if (this.routeName === 'collaborators') {
        return this.groupingCollaborators;
      } else if (this.routeName === 'credits') {
        return this.groupingCredits;
      } else {
        return this.groupingAlbum;
      }
    },
    bread() {
      if (this.loading) {
        return [];
      }
      return getBread(this.routeName, this.query, this.data, this.groupingTitle);
    },
    storeName() {
      return this.routeName === 'activity' ? 'analytics/activity' : this.storePath;
    }
  },
  methods: {
    go(direction) {
      if (this.routeName === 'activity') {
        this.$router.push({name: 'analytics-catalog'});
      } else {
        this.$router.go(direction);
      }
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
  width: 16px;
  height: 16px;
  margin-right: 16px;
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
  font-size: 16px;
  font-weight: 500;
  color: #8f8f8f;
  cursor: pointer;
  transition-duration: 150ms;
  transition: color 150ms ease-in-out;
  &:after {
    content: "/";
    margin: 0 6px;
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
.capitalize:hover {
  color: var(--overlay-1-color);
}
</style>
