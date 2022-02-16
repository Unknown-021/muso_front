<template>
  <article v-if="!loading" class="album-item">
    <div :class="imgWrapClass" @click="goToAlbum">
      <figure class="album-item__figure" :aria-hidden="!item.avatarUrl">
        <img class="album-item__img" :src="avatarUrl" alt="Album cover" />
      </figure>
      
      <div class="album-item__img-overlay">
        <base-dropdown-trigger v-if="$slots.dropdown" @visible-change="isDropdownShow = $event">
          <button class="album-item__options zero-btn" aria-label="Show album options">
            <img src="/images/icons/more-white.svg" width="30" height="30" />
          </button>

          <template #dropdown>
            <slot name="dropdown" />
          </template>
        </base-dropdown-trigger>

        <div v-else class="album-item__view" />
      </div>
    </div>

    <div class="album-item__body">
      <h3 class="album-item__title ellipsis">
        <router-link :to="albumRoute">{{ item.title || '-' }}</router-link>
      </h3>
      <p class="album-item__info">
        <template v-if="showArtist">
          <router-link v-if="artistRoute" :class="artistClass" :to="artistRoute">
            {{ primaryArtist.fullName }}
          </router-link>
          <strong v-else :class="artistClass">{{ item.performer || item.artist || item.primaryArtist || 'No Artist' }}</strong>
        </template>
        <time v-if="showRelease" :datetime="date">
          {{ formattedDate }}
        </time>
        <template v-else-if="!showArtist">&nbsp;</template>
      </p>
    </div>
  </article>

  <album-skeleton v-else :show-release="showReleae" :showArtist="showArtist" />
</template>

<script>
import BaseDropdownTrigger from 'components/ui/base-dropdown-trigger/base-dropdown-trigger.vue';
import BaseMenu, { BaseMenuItem } from 'components/ui/base-menu/base-menu.vue';
import AlbumSkeleton, { props } from './square-skeleton';
import { isParentElementInteractive } from 'helpers/dom';
import { albumRoute, artistRoute } from 'helpers/routing';

export default {
  name: 'album-item',
  components: {
    BaseMenu,
    BaseMenuItem,
    BaseDropdownTrigger,
    AlbumSkeleton
  },
  props,
  data() {
    return {
      isDropdownShow: false
    };
  },
  computed: {
    imgWrapClass() {
      return {
        'album-item__img-wrap': true,
        'album-item__img-wrap--hover': this.isDropdownShow
      };
    },
    artistClass() {
      return ['album-item__performer', 'ellipsis'];
    },
    avatarUrl() {
      return this.item.avatarUrl || '/images/default-avatars/project_default_square.png';
    },
    date() {
      return this.item.releaseDate || this.item.publishedAt || this.item.createdAt;
    },
    formattedDate() {
      if (!this.date) {
        return '';
      }
      const dateObj = new Date(this.date);
      return this.$root.$date(dateObj);
    },
    primaryArtist() {
      const { primaryArtists = [] } = this.item;
      return primaryArtists[0];
    },
    artistRoute() {
      return this.primaryArtist
        ? artistRoute(this.primaryArtist)
        : undefined;
    },
    albumRoute() {
      return albumRoute(this.item);
    }
  },
  methods: {
    goToAlbum(event) {
      if (!isParentElementInteractive(event.target)) {
        this.$router.push(this.albumRoute);
      }
    }
  }
};
</script>

<style lang="scss">
.album-skel {
  background: #21201F;
  opacity: 0.8;
  border-radius: 2px;
}

.album-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-bottom: 5px;
  width: 160px;
  max-width: 160px;
  color: #f2f2f2;
  &__figure {
    margin: 0;
    padding: 0;
  }
  &__img-wrap {
    position: relative;
    width: 100%;
    padding-bottom: 100%;
    cursor: pointer;
  }
  &__img {
    position: absolute;
    top: 0;
    left: 0;
    border: 1px solid rgb(33, 32, 31);
    border-radius: 1px;
    width: 100%;
    height: 100%;
    object-fit: cover;
    cursor: pointer;
    background-color: #21201f;
  }
  &__img-overlay {
    position: absolute;
    z-index: 2;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
    width: 100%;
    background-color: rgba(4, 3, 2, 0.7);
    opacity: 0;
    transition: opacity 130ms ease-in-out;
    @at-root {
      .album-item__img-wrap:hover &,
      .album-item__img-wrap--hover & {
        opacity: 1;
      }
    }
  }
  &__options {
    position: relative;
    &::before {
      content: "";
      position: absolute;
      top: -15px;
      right: -15px;
      bottom: -15px;
      left: -15px;
      opacity: 0;
    }
  }
  &__view {
    width: 30px;
    height: 30px;
    background-image: url("images/icons/show.svg");
  }
  &__body {
    margin-top: 6px;
    width: 100%;
    @media (min-width: 768px) {
      margin-top: 10px;
    }
  }
  &__title {
    font-size: 14px;
    line-height: 1.3;
    font-weight: 500;
    @at-root .album-item--loading & {
      margin-top: 1px;
      height: 15px;
      width: calc(100% - 15px);
    }
  }
  &__info {
    display: flex;
    flex-direction: column;
    margin-top: -1px;
    font-size: 14px;
    line-height: 1.2;
    color: #8f8f8f;
    @at-root .album-item--loading & {
      margin-top: 6px;
      height: 15px;
      width: 95px;
      opacity: 0.6;
    }
    > * {
      margin-top: 4px;
    }
  }
  &__performer {
    font-weight: 500;
  }
}
</style>