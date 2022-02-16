<template>
  <div
    :class="{
      'search': true,
      'search--adaptive': adaptive,
      [`search--${variant}`]: true
    }"
    :data-has-query="Boolean(keyword)"
    :data-expanded="String(isExpanded || !this.adaptive)"
  >
    <dropdown-trigger
      transition="search-box"
      :visible="dropdownVisible"
      :offset="[0, 4]"
      trigger="manual"
      placement="bottom"
      :modifiers="modifiers"
    >
      <form autocomplete="off" ref="searchForm" action="." @submit.prevent="handleFormSubmit">
        <input
          v-model="keyword"
          type="search"
          class="search-input mobile-none"
          ref="bigSearch"
          :placeholder="placeholder || 'Search profile, artist, track or album'"
          autocorrect="off"
          spellcheck="false"
          @keydown="handleKeyDown"
          @focus="openPopup"
          @input="debouncedSearch(keyword)"
        />
        <input
          v-model="keyword"
          type="search"
          name="search"
          class="search-input mobile-only"
          ref="smallSearch"
          :placeholder="placeholder || 'Search'"
          autocorrect="off"
          spellcheck="false"
          @focus="openPopupOnMobile"
          @keydown="handleKeyDown"
          @input="handleInputOnMobile"
        />
        <input ref="fakeInput" type="search" name="search" class="fake-search-input" />
        <button type="button" class="search__btn" @click="searchClick" aria-label="Show search input">
          <!-- We have to insert image in base64, because this search can be used as standalone component. We have it on marketing website -->
          <img width="16" src="data:image/svg+xml,%3Csvg viewBox='0 0 16 16' fill='%23CCC' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath fill-rule='evenodd' clip-rule='evenodd' d='M11.02 3.271a5.479 5.479 0 11-7.748 7.749A5.479 5.479 0 0111.02 3.27zm1.047 8.088a6.48 6.48 0 10-.966.92l3.032 3.032.943-.943-3.009-3.009z' /%3E%3C/svg%3E" aria-hidden="true" />
        </button>
        <reset-button class="search__reset-btn" @click="hideMobileSearch" />
        <!-- We need dummy submit button in order to fire "submit" event when user press "search" button on keyboard -->
        <input type="submit" class="visually-hidden" />
      </form>

      <template #dropdown>
        <search-window  
          ref="resultsList"
          :keyword="keyword"
          :list-focus="listFocus"
          :loading="isLoading"
          @close="hidePopup"
        />
      </template>
    </dropdown-trigger>
  </div>
</template>

<script>
import DropdownTrigger from 'components/ui/base-dropdown-trigger/base-dropdown-trigger.vue';
import { sameWidth } from 'components/ui/base-dropdown-trigger/modifiers/same-width';
import SearchWindow from 'components/ui/shared/search-window.vue';
import ResetButton from 'components/ui/reset-button.vue';
import { onTransitionFinished } from 'helpers/dom';
import { debounce, handlersTimeoutControl } from 'helpers/utils';
import { onClickOutside, onWindowResize } from 'helpers/vue';
import { ListFocus } from 'helpers/list-focus';

const overflow = {
  name: 'preventOverflow',
  enabled: false
};
const modifiers = [overflow, sameWidth];

export default {
  name: 'search-box',
  components: {
    DropdownTrigger,
    SearchWindow,
    ResetButton
  },
  data() {
    return {
      isLoading: false,
      keyword: null,
      isMobile: false,
      showPopup: false,
      isExpanded: false,
      listFocus: new ListFocus({
        getItems: this.getItems
      })
    };
  },
  props: {
    searchMobileWhileTyping: {
      type: Boolean,
      default: true
    },
    showSearchBoxMobile: {
      type: Boolean,
      default: false
    },
    adaptive: {
      type: Boolean,
      default: false
    },
    placeholder: {
      type: String,
      default: undefined
    },
    variant: {
      type: String,
      default: 'default'
    }
  },
  mounted() {
    onClickOutside(this, this.$refs.searchForm, this.hidePopup);
    onWindowResize(this, this.hidePopup);
    this.$syncMediaWithComponent(this.$mediaQueries.PHONE, 'isMobile');
  },
  computed: {
    modifiers() {
      return modifiers;
    },
    dropdownVisible() {
      return Boolean(this.canShowPopup && this.isPopupCanBeShownOnCurrentScreenSize);
    },
    isPopupCanBeShownOnCurrentScreenSize() {
      return (!this.isMobile || this.showSearchBoxMobile);
    },
    canShowPopup() {
      return (
        this.isLoading ||
        (this.showPopup && this.keyword && this.searchResultsCount !== -1)
      );
    },
    searchResultsCount() {
      return this.$store.getters['search/searchResultsCount'];
    },
    loading() {
      return this.$store.getters['search/loading'];
    },
    debouncedSearch() {
      return debounce(this.searchWithLoading, 300);
    },
    searchWithLoading() {
      return handlersTimeoutControl({
        handler: this.search,
        timeout: 600,
        onTimeoutChange: (countOfTimedOutRequests) => {
          this.isLoading = countOfTimedOutRequests > 0;
        }
      });
    }
  },
  methods: {
    async search(keyword) {
      await this.$store.dispatch('search/search', {
        query: {
          keyword: keyword,
          limit: 2,
        }
      });
    },
    openPopup() {
      this.showPopup = true;
      this.listFocus.reset();
    },
    openPopupOnMobile() {
      if (this.showSearchBoxMobile) {
        this.openPopup();
      }
    },
    hidePopup() {
      const { bigSearch, smallSearch } = this.$refs;
      const blurInput = el => el?.blur();
      blurInput(bigSearch);
      blurInput(smallSearch);
      this.showPopup = false;
      this.listFocus.reset();
    },
    handleFormSubmit() {
      this.goToSearchPage();
      this.hidePopup();
    },
    handleInputOnMobile() {
      this.debouncedSearch(this.keyword);

      if (this.searchMobileWhileTyping) {
        this.goToSearchPage();
      }
    },
    goToSearchPage() {
      if (this.keyword && this.keyword !== this.$route.query.keyword) {
        this.$router.push({ name: 'search', query: { keyword: this.keyword } });
      }
    },
    handleKeyDown(event) {
      switch (event.key) {
        case 'Up': // IE/Edge specific value
        case 'ArrowUp':
          this.listFocus.prev();
          break;
        case 'Down': // IE/Edge specific value
        case 'ArrowDown':
          this.listFocus.next();
          break;
        case 'Enter':
          this.navigateToFocusedItem();
          break;
        case 'Esc': // IE/Edge specific value
        case 'Escape':
          this.hidePopup();
          break;
      }
    },
    navigateToFocusedItem() {
      const { resultsList } = this.$refs;
      if (resultsList) {
        resultsList.navigateToFocusedItem();
      }
    },
    searchClick() {
      if (this.isExpanded) {
        this.goToSearchPage();
        this.keyword = null;
      } else {
        this.isExpanded = true;
        const { fakeInput, smallSearch } = this.$refs;
        if (!fakeInput || !smallSearch) return;

        // We want to focus fake input only for iOS devices, since this hack
        // cases weird behavior on desktop Chrome when we focus fake input for the second time.
        if (isIOS()) {
          fakeInput.focus();
        }
        onTransitionFinished(this.$el, () => {
          smallSearch.focus();
        });
      }
    },
    hideMobileSearch() {
      this.isExpanded = false;
      this.keyword = null;
    },
    getItems() {
      return this.$refs.resultsList?.$el.querySelectorAll('[data-search-item]');
    }
  }
};

function isIOS() {
  return /(iPad|iPhone|iPod)/g.test(navigator.userAgent);
}
</script>

<style lang="scss">
.search-box {
  &-enter {
    opacity: 0;
  }
  &-enter-active {
    transition: opacity 150ms ease-in-out;
  }
}
</style>

<style lang="scss" scoped>
@import "~assets/styles/utils/breakpoints.abstract";
@import "~assets/styles/utils/utils.abstract";

.search {
  width: 100%;
  position: relative;
  @media #{$before-tablet} {
    transition: width 0.3s;
    background-color: inherit;
    &--adaptive {
      width: 40px;
      &[data-expanded=true] {
        width: 100%;
      }
    }
  }
  @media #{$tablet} {
    max-width: 530px;
  }
  &--landing {
    --search-input-border-color: var(--border-color-2);
  }
  &__reset-btn {
    margin-top: auto;
    margin-bottom: auto;
    @at-root .search--adaptive[data-expanded=true] & {
      @media (max-width: 767px) {
        opacity: 1;
        pointer-events: auto;  
      }
    }
    @at-root .search[data-has-query] & {
      opacity: 1;
      pointer-events: auto;
    }
  }
  &__btn,
  &__reset-btn {
    top: 0;
    bottom: 0;
    position: absolute;
    border: 0;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  &__btn {
    padding: 0 8px;
    background-color: transparent;
  }
  &__reset-btn {
    right: 8px;
  }
}
.search-input {
  @include reset-outline;
  width: 100%;
  height: 100%;
  padding: 7px 5px;
  padding-left: 32px;
  line-height: 1.25;
  color: #f7f7f7;
  background: #21201f;
  border-width: 1px;
  border-style: solid;
  border-color: var(--search-input-border-color, transparent);
  caret-color: #4CC2A5;
  border-radius: 2px;
  color: var(--overlay-1-color);
  background-color: var(--base-3-color);
  transition: border-color 150ms ease-in-out;
  &::placeholder {
    line-height: normal;
    color: var(--overlay-2-color);
  }
  &:hover,
  &:focus {
    @media #{$tablet} {
      border-color: var(--overlay-3-color);
    }
  }
  @media #{$before-tablet} {
    @at-root .search[data-expanded=false] & {
      background-color: transparent;
    }
  }
}
.fake-search-input {
  position: absolute;
  z-index: -1;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
  background-color: transparent;
  font-size: 0;
  border: 0;
  pointer-events: none;
  caret-color: #4CC2A5;
}
</style>