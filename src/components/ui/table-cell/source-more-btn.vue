<template>
  <div
    :class="{ 'more-btn--disabled': disableBtn }"
    class="more-btn"
    :id="index"
    @click="showMenu"
  >
    <arrow
      v-if="bigDropDownMenu && countType === 'Streams'"
      height="16"
      width="16"
      class="more-btn-arrow"
      :class="{ 'more-btn-rotate-arrow': showDropdownMenu }"
    />
    <dots
      v-else-if="countType === 'Streams'"
      class="more-btn__dots"
      :class="{ active: show }"
      height="24"
      width="24"
    />
    <div :ref="index" class="window" :class="{ show: show }">
      <div class="window__info">
        <div class="window__info-details">
          <source-cover class="window-source-avatar" :iconType="item.source" />
          <div class="window__description">
            <span class="window__description-track-title">{{item.trackTitle}}</span>
            <span class="window__description-track-count">{{ $number(count) }} {{ countType }}</span>
          </div>
        </div>
      </div>
      <div
        class="window__buttons"
        :class="{ 'center-element': !showRemoveBtn }"
      >
        <div class="window__buttons-container">
          <a class="window__buttons-link" :href="sourceUrl" target="_blank">
            View Source
          </a>
        </div>
        <div v-if="showRemoveBtn" class="window__buttons-container">
          <span
            class="window__buttons-remove"
            :class="{ 'center-element': !showRemoveBtn }"
            @click="showRemoveSourceModal"
          >
            Remove Source
          </span>
        </div>
      </div>
    </div>
    <div v-if="countType === 'Streams'">
      <ul :id="'dropdown_' + index" class="more-btn__big-dropdown">
        <template v-for="(source, index) in sourceListType">
          <li class="more-btn__dropdown-link" :key="index">
            <span
              class="more-btn__link--counter"
              :class="{ 'removing-link': processingSource(source) }"
              >{{ index + 1 }}
              </span>
            <a
              :href="source.sourceUrl"
              target="_blank"
              class=""
              :class="{
                'removing-link': processingSource(source),
                'more-btn__sources-link--url': item.source !== 'spotify',
                'shorten-source-link': processingSource(source),
              }"
              >{{ shorterLink(source.sourceUrl) }}</a>
            <span class="removing-link" v-if="source.isRemoved">(deleting)</span>
            <span
              class="removing-link"
              v-if="source.isPending && !source.isRemoved">(pending)</span>
          </li>
        </template>
        <plain-button
          v-if="item.source === 'soundcloud'"
          @click="showModal"
          variant="primary"
          class="sources-table__add-btn plain-btn--primary window__sources-edit"
        >Edit
        </plain-button>
      </ul>
    </div>
  </div>
</template>

<script>
import Dots from "assets/images/icons/more-btn.svg";
import Arrow from "assets/images/icons/arrow-down-white-new.svg";
import SourceCover from "components/ui/table-cell/source-cover";
import PlainButton from "components/ui/base-plain-button/base-plain-button.vue";
import bus from "services/bus.js";

export default {
  name: "source-more-btn",
  components: {
    Dots,
    SourceCover,
    Arrow,
    PlainButton,
  },
  props: {
    item: {
      type: Object,
      required: true,
    },
    index: {
      type: Number,
      required: true,
    },
    listLength: {
      type: Number,
      required: true,
    },
    count: {
      type: Number,
      default: 0,
    },
    countType: {
      type: String,
      required: true,
    },
    spotifySources: {
      type: Array,
      default: () => [],
    },
    soundcloudSources: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      lastElement: null,
      penultimateElement: null,
      check: true,
      show: false,
      showDropdownMenu: false
    };
  },
  beforeMount() {
    bus.$on("showDropdown", (index) => {
      if (this.index === index && !this.disableBtn) {
        if (this.bigDropDownMenu) {
          this.showBigDropdown();
        } else {
          this.showNormalDropdown();
        }
      }
    });
    bus.$on("hide-menu", () => {
      if (!this.disableBtn && (this.show || this.showDropdownMenu)) {
        this.hide();
      }
    });
  },
  mounted() {
    this.tooltipShow();
  },
  beforeDestroy() {
    bus.$off("hide-menu");
    bus.$off("showDropdown");
  },
  watch: {
    show(val) {
      if (val) {
        if ((this.lastElement || this.penultimateElement) && this.check) {
          let dropdownElement = window.document
            .getElementById(this.index)
            .getElementsByClassName("window")[0];
          let lastElementHeight = null;

          if (this.lastElement) {
            lastElementHeight = this.getCoords(this.lastElement.element);
          } else if (this.penultimateElement) {
            lastElementHeight = this.getCoords(this.penultimateElement.element);
          }

          if (dropdownElement) {
            dropdownElement.style.top = lastElementHeight.top - 18 + "px";
            dropdownElement.style.right = "65px";
            this.tooltipShow();
            const element = window.document.getElementsByClassName("sources-table");
            element[0].after(this.$refs[this.index]);
            this.check = false;
          }
          this.check = false;
        }
      }
    },
  },
  computed: {
    sourceUrl() {
      return this.item.sourceUrl || this.item.externalUrl;
    },
    showRemoveBtn() {
      return (
        this.item.source === "youtube" || this.item.source === "soundcloud"
      );
    },
    id() {
      return this.trackId;
    },
    user() {
      return this.$store.getters["user/data"];
    },
    trackId() {
      return this.$store.getters["analytics/trends/selectedIds"];
    },
    removeModalProps() {
      return {
        sourceUrl: this.item.sourceUrl,
        source: this.item.source,
      };
    },
    disableBtn() {
      return (
        (this.item.isPending || this.item.isRemoved) && (this.sourceListType.length <= 1)
      );
    },
    normalizeLinkForModal() {
      return this.soundcloudSources.map((item) => {
        return { link: item.sourceUrl };
      });
    },
    sourceListType() {
      return this.item.source === "spotify"
        ? this.spotifySources
        : this.soundcloudSources;
    },
    bigDropDownMenu() {
      return (
        (this.item.source === "spotify" || this.item.source === "soundcloud") &&
        this.countType === "Streams" && (this.sourceListType.length > 1)
      );
    },

  },
  methods: {
    hide() {
      this.show = false;
      this.showDropdownMenu = false;
      let p = document.getElementById(`dropdown_${this.index}`);
      p.classList.remove("more-btn__big-dropdown--show");
    },
    getCoords(elem) {
      let box = elem.getBoundingClientRect();

      return {
        top: box.top + pageYOffset,
        left: box.left + pageXOffset,
      };
    },
    tooltipShow() {
      if (this.index + 1 === this.listLength && this.listLength > 1) {
        const lastElement = window.document.getElementById(this.index);
        this.lastElement = {
          elementPostion: "last",
          element: lastElement,
        };
      } else if (this.index + 1 === this.listLength - 1) {
        const penultimateElement = window.document.getElementById(this.index);
        this.penultimateElement = {
          elementPostion: "penultimate",
          element: penultimateElement,
        };
      } else {
        return false;
      }
    },
    showRemoveSourceModal() {
      this.$modal.open({
        name: "remove-source",
        props: this.removeModalProps,
      });
    },
    shorterLink(link) {
      return link.replace("https://open.", "").replace("https://", "");
    },
    showModal() {
      this.$modal.open({
        name: "add-source",
        props: {
          soundcloudSources: this.normalizeLinkForModal,
        },
      });
    },
    showNormalDropdown() {
      if (this.show) {
        this.hide();
      } else {
        bus.$emit("hide-menu");
        this.show = true;
      }
    },
    showBigDropdown() {
      if (this.showDropdownMenu) {
        this.hide();
      } else {
        bus.$emit("hide-menu");
        this.showDropdownMenu = true;
        let p = document.getElementById(`dropdown_${this.index}`);
        document.getElementById(`row_${this.index}`).after(p);
        p.classList.add("more-btn__big-dropdown--show");
      }
    },
    processingSource(source) {
      return source.isPending || source.isRemoved;
    },
    showMenu() {
      if (this.bigDropDownMenu) {
        this.showBigDropdown();
      } else {
        this.showNormalDropdown();
      }
    }
  },
};
</script>

<style lang='scss'>
.window {
  display: none;
  position: absolute;
  right: 5px;
  top: 30px;
  width: 200px;
  border-radius: 2px;
  background-color: var(--base-3-color);
  z-index: 11;
  overflow: hidden;
  box-shadow: 0px 0px 12px rgba(12, 11, 9, 0.5);
  &--wide {
    width: 282px;
    right: 0;
    top: 67px;
  }
  &__sources-container--spotify {
    padding: 8px;
    border-radius: 4px;
    display: flex;
    flex-direction: column;
  }
  &__sources-link:first-of-type {
    margin-bottom: 4px;
    margin-top: 0;
  }
  &__sources-link:last-of-type {
    margin-bottom: 4px;
    // margin-top: 4px;
  }
  &__sources-link {
    display: flex;
    margin-bottom: 4px;
    &--url {
      display: block;
      white-space: nowrap;
      text-overflow: ellipsis;
      overflow: hidden;
      word-break: break-word;
      max-width: 228px;
      color: var(--overlay-1-color);
      height: 17px;
    }
    &--counter {
      width: 20px;
      margin-right: 8px;
      display: inline-block;
    }
  }
  &__sources-edit {
    align-self: center;
    margin-top: 8px;
  }
  &__show-upper {
    top: -119px;
  }
  &__description {
    margin-left: 8px;
    font-size: 12px;
    font-weight: 400;
    padding-bottom: 8px;
    &-track-title {
      color: var(--overlay-1-color);
      display: block;
      white-space: nowrap;
      text-overflow: ellipsis;
      overflow: hidden;
      word-break: break-word;
      max-width: 140px;
      line-height: 1.2;
    }
  }
  &__info {
    display: flex;
    border-bottom: 1px solid var(--base-4-color);
  }
  &__info-details {
    display: flex;
    height: 32px;
    width: 200px;
    margin-bottom: 4px;
    margin-top: 8px;
  }
  &__buttons {
    display: flex;
    flex-direction: column;
    font-size: 14px;
    max-height: 74px;
    &-link {
      flex-grow: 1;
      color: var(--overlay-1-color);
      padding-left: 16px;
    }
    &-remove {
      padding-left: 16px;
      flex-grow: 1;
      color: var(--error-color);
      padding-bottom: 4px;
    }
    &-container:first-of-type {
      margin-top: 4px;
    }
    &-container {
      //flex-grow: 1;
      height: 32px;
      display: flex;
      align-items: center;
      &:hover {
        background-color: var(--base-hover-color);
      }
    }
  }
}
.more-btn {
  width: 24px;
  height: 24px;
  &__dots {
    position: relative;
    top: 3px;
  }
  &__big-dropdown {
    display: none;
    margin-left: 68px;
    background-color: var(--base-3-color);
    padding: 0;
    border-radius: 4px;
    margin-top: 0;
    margin-bottom: 0;
    padding: 8px 8px;
  }
  &__big-dropdown li {
    list-style-type: none;
  }
  &__big-dropdown--show {
    display: flex;
    flex-direction: column;
  }
  &__dropdown-link {
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
    word-break: break-word;
  }
  &__dropdown-link:first-of-type {
    padding-top: 0;
  }
  &__dropdown-link {
    padding-top: 4px;
  }
  &__link--counter {
    width: 20px;
    display: inline-block;
  }
  &__sources-link--url {
    display: inline-block;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
    word-break: break-word;
    width: 220px;
    vertical-align: top;
  }
}
.show {
  display: block;
}
.show-last {
  right: 50px;
  top: 655px;
}
.show-penultimate {
  top: 392px;
}
.window .source-cover-cell {
  margin-left: 16px;
}
.active .more-btn-svg-fill {
  opacity: 1;
}
.active .more-btn-svg-stroke {
  opacity: 1;
}
.more-btn-svg {
  &-fill {
    opacity: 0;
    transition-duration: 150ms;
    transition-timing-function: ease-in-out;
  }
  &-stroke {
    opacity: 0;
  }
  &:hover {
    .more-btn-svg-fill {
      opacity: 1;
    }
    .more-btn-svg-stroke {
      opacity: 1;
    }
  }
}
.center-element {
  margin-bottom: 8px;
}
.more-btn--disabled {
  pointer-events: none;
}
.more-btn-arrow {
  transform: rotate(0deg);
  margin-left: 4px;
}
.more-btn-rotate-arrow {
  transform: rotate(180deg);
}
.removing-link {
  color: var(--overlay-2-color);
  max-width: 164px;
  vertical-align: top;
}
.shorten-source-link {
  width: 160px;
}
</style>
