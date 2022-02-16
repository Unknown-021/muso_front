<template>
  <div class="sort-container">
    <div class="sorting-section">
      <div v-on:click="toggle()">
        <span class="--grey-8f">Sort by</span>
        <span>{{selectedItem.name}}</span>
        <img src="images/icons/arrow-down-white.svg" v-show="!isShown" alt />
        <img src="images/icons/arrow-up-white.svg" v-show="isShown" alt />
      </div>
      <div v-on:click="toggle()" class="mobile">
        <img src="images/icons/sort.svg" alt />
      </div>
    </div>
    <div v-show="isShown">
      <div class="overlay" v-on:click.stop="hide()"></div>
      <div class="sort-dropdown">
        <div
          class="item"
          v-for="(item, index) in data"
          :key="index"
          v-on:click="selectItem(item)"
        >{{item.name}}</div>
      </div>
      <div class="sort-dropdown-mobile">
        <div class="content">
          <div class="arrow-down" v-on:click="hide()">
            <img src="images/icons/chevron-down.svg" alt />
          </div>
          <div class="title">Sort by</div>
          <div class="items">
            <div
              class="item"
              v-for="(item, index) in data"
              :key="index"
              v-on:click="selectItem(item)"
            >
              <span>{{item.name}}</span>
              <img
                src="images/icons/check-passive.svg"
                v-show="item.field!==selectedItem.field"
                alt
              />
              <img src="images/icons/check-active.svg" v-show="item.field===selectedItem.field" alt />
            </div>
          </div>
          <div class="cancel" v-on:click="hide()">Cancel</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "sort-dropdown",
  props: {
    data: {
      required: true,
    },
  },
  created() {
    this.selectedItem = this.data.find((i) => i.default === true);
  },
  data() {
    return {
      isShown: false,
      selectedItem: {},
    };
  },
  methods: {
    hide() {
      this.isShown = false;
    },
    toggle() {
      this.isShown = !this.isShown;
    },
    selectItem(item) {
      this.selectedItem = item;
      if (this.$route.query && this.$route.query.sortKey === item.field) {
        return;
      }
      this.$router.push({
        query: { ...this.$route.query, sortKey: item.field },
      });
      this.hide();
    },
  },
};
</script>
<style lang="scss" scoped>
.sort-container {
  position: relative;
}
.sort-dropdown {
  right: 0;
  min-width: 160px;
  padding: 15px 0px;
  background: #21201f;
  border-radius: 8px;
  box-shadow: 1px 6px 35px rgba(4, 3, 2, 0.45);
  color: #f7f7f7;
  z-index: 55;
  position: absolute;
  display: block;

  & .item {
    width: 100%;
    height: 30px;
    padding: 5px 20px;
    cursor: pointer;
  }
  & .item:not(:last-of-type) {
    margin-bottom: 10px;
  }
  & .item:hover {
    background: #171615;
  }
}
.overlay {
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  z-index: 10;
  position: fixed;
}
.sort-dropdown-mobile {
  display: none;
}
.sorting-section {
  margin-top: 10px;
  margin-bottom: 15px;
  display: flex;
  justify-content: flex-end;

  & > div {
    max-width: 250px;
    cursor: pointer;
    display: flex;
  }
  & > div.mobile {
    display: none;
  }
  & span {
    width: 92px;
    margin-left: 20px;
    font-weight: 600;
    font-size: 11px;
    line-height: 24px;
    text-align: right;
    letter-spacing: 1px;
    text-transform: uppercase;
  }
}
.arrow {
  width: 20px;
  height: 20px;
  fill: #f7f7f7;
  background-image: url(images/icons/arrow-turn-right.svg);
}

/* For mobile screens */
@media screen and (max-width: 768px) {
  .sort-dropdown {
    display: none;
  }
  .sort-dropdown-mobile {
    width: 100%;
    left: 0;
    bottom: 0;
    position: fixed;
    display: block;
    z-index: 101;
  }
  .sorting-section {
    & > div.mobile {
      display: block;
    }
    & > div:not(.mobile) {
      display: none;
    }
  }
  .overlay {
    z-index: 100;
    background: rgba(12, 11, 9, 0.7);
  }
  .content {
    width: 100%;
    flex: 0;
    background: #0c0b09;
  }
  .arrow-down {
    padding-top: 8px;
    margin-bottom: 24px;

    & img {
      width: 24px;
      height: 24px;
      margin: 0 auto;
      display: block;
    }
  }
  .title {
    font-weight: bold;
    font-size: 26px;
    line-height: 110%;
    padding: 0 15px;
    margin-bottom: 16px;
    color: #ffffff;
  }
  .items {
    margin-left: 15px;

    & .item {
      height: 64px;
      padding-top: 16px;
      padding-right: 15px;
      font-size: 16px;
      line-height: 24px;
      color: #cccccc;
      display: flex;
      justify-content: space-between;

      & img {
        align-self: flex-start;
      }
    }
    & .item:not(:nth-last-of-type(1)) {
      border-bottom: 1px solid #272625;
    }
  }
  .cancel {
    width: 100%;
    height: 100px;
    padding-top: 15px;
    color: #6be7c8;
    text-align: center;
    font-weight: bold;
    font-size: 12px;
    line-height: 24px;
    letter-spacing: 3px;
    text-transform: uppercase;
    border-top: 1px solid #272625;
  }
}
</style>