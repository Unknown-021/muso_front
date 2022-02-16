<template>
  <div
    v-click-outside="hide"
    :class="{ 'more-btn--disabled': disableBtn }"
    class="more-btn"
    @click="show = !show"
    :id="index"
  >
    <arrow
      v-if="countType === 'Streams' && (item.source === 'spotify' || item.source === 'soundcloud')"
      height="16"
      width="16"
      class="more-btn-arrow"
      :class="{ 'more-btn-rotate-arrow': show }"
    />
    <dots
      v-else
      class="more-btn__dots"
      :class="{ active: show }"
      height="24"
      width="24"
    />
    <div
      v-if="showDropdownWithSources"
      :ref="index"
      class="window window--wide"
      :class="{ show: show }"
    >
      <div
        v-if="item.source === 'spotify'"
        class="window__sources-container--spotify"
      >
        <div
          class="window__sources-link"
          v-for="(item, index) in spotifySources"
          :key="index"
        >
          <span class="window__sources-link--counter">{{ index + 1 }}</span>
          <a :href="item.sourceUrl" target="_blank" class="window__sources-link--url" :class="{'removing-link': item.isRemoved}">{{ shorterLink(item) }}</a>
          
        </div>
      </div>
      <div v-else class="window__sources-container--spotify">
        <div
          class="window__sources-link"
          v-for="(item, index) in soundcloudSources"
          :key="index"
        >
          <span class="window__sources-link--counter">{{ index + 1 }}</span>
          <a :href="item.sourceUrl" target="_blank" class="window__sources-link--url" :class="{'removing-link': item.isRemoved || item.isPending}">{{ shorterLink(item) }} </a>
          <span v-if="item.isRemoved">(deleting)</span>
          <span v-if="item.isPending && !item.isRemoved">(pending)</span>
        </div>
        <plain-button @click="showModal" variant="primary" class="sources-table__add-btn plain-btn--primary window__sources-edit">Edit</plain-button>
      </div>
    </div>
    <div v-else :ref="index" class="window" :class="{ show: show }">
      <div class="window__info">
        <div class="window__info-details">
          <source-cover class="window-source-avatar" :iconType="item.source" />
          <div class="window__description">
            <span class="window__description-track-title">{{ item.trackTitle }}</span>
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
  </div>
</template>

<script>
import Dots from "assets/images/icons/more-btn.svg";
import Arrow from "assets/images/icons/arrow-down-white-new.svg";
import vClickOutside from "v-click-outside";
import SourceCover from "components/ui/table-cell/source-cover";
import PlainButton from 'components/ui/base-plain-button/base-plain-button.vue';

export default {
  name: "source-more-btn",
  components: {
    Dots,
    vClickOutside,
    SourceCover,
    Arrow,
    PlainButton
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
    },
    soundcloudSources: {
      type: Array,
    }
  },
  data() {
    return {
      lastElement: null,
      penultimateElement: null,
      check: true,
      show: false    
    };
  },
  mounted() {
    this.tooltipShow();
  },
  watch: {
    show(val) {
      console.log(val);
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
            dropdownElement.style.right = "50px";
            this.tooltipShow();
            const element = window.document.getElementsByClassName("sources-table");
            element[0].after(this.$refs[this.index]);
            this.check = false;
          }
          this.check = false;
        }
      }
    },
    showDropdown() {
      if (this.showDropdown.index === this.index) {
        this.show = this.showDropdown.show;
      }
    }
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
      return (this.item.isPending || this.item.isRemoved) && (this.item.source === 'youtube');
    },
    showDropdownWithSources() {
      return (
        (this.item.source === "spotify" || this.item.source === "soundcloud") &&
        this.countType === "Streams"
      );
    },
    normalizeLinkForModal() {
      return this.soundcloudSources.map(item => {
        return {link: item.sourceUrl}
      })
    },
    showDropdown() {
      return this.$store.getters["analytics/activity/showDropdown"]
    }
  },
  methods: {
    hide() {
      this.show = false;
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
      return link.sourceUrl
        .replace("https://open.", "")
        .replace("https://", "");
    },
    showModal() {
      this.$modal.open({
        name: 'add-source',
        props: {
          soundcloudSources: this.normalizeLinkForModal
        }
      });
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
  max-width: 164px;
}
</style>
