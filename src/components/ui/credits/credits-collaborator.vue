<template>
  <div :class="componentClass" :data-has-info="hasCreditsData">
    <user-info
      v-touch
      class="credits-artist__inner"
      :user="profile"
      :navigable="!(type === 'album' && hasCreditsData)"
      :disabled="!isVerified"
      :data-editable="dataSource.isAdminPage"
      :data-hovered="isMenuOpen"
      @click="handleRowClick"
      avatar-size="small"
    >
      <template v-if="!isVerified" #name-after>
        <span class="v-line" /><span class="user-info__status">Pending</span>
      </template>

      <template #after>
        <options-button
          v-if="dataSource.isAdminPage"
          :visible.sync="isMenuOpen"
          class="credits-artist__more"
        >
          <template #dropdown="props">
            <collaborator-menu
              :profile="profile"
              :album="album"
              :song-ids="dataSource.songIds"
              @close="isMenuOpen = false"
            />
          </template>
        </options-button>

        <template v-if="type === 'album' && hasCreditsData">
          <span class="credits-artist__tracks-count">{{ collaboratorTracks.length }} tracks</span>
          <toggle-button :active="isShowDetails" aria-label="Show credits for each song" @toggle="toggleDetails" />
        </template>
      </template>
    </user-info>

    <template v-if="type === 'album'">
      <ul v-if="isShowDetails" class="credits-details">
        <template v-for="song in collaboratorTracks">
          <credits-song-item
            :key="song.id"
            :song="song"
            :modal="dataSource.isAdminPage"
          />
        </template>
      </ul>
    </template>
  </div>
</template>

<script>
import ToggleButton from 'components/ui/toggle-button.vue';
import { isParentElementInteractive } from 'helpers/dom';
import { touch } from 'directives/touch';
import { createNumbersSorter } from 'helpers/sorters';
import CollaboratorMenu from 'components/collaborator/collaborator-menu.vue';
import UserInfo from 'components/user/user-info.vue';
import CreditsSongItem from './credits-song-item.vue';
import OptionsButton from 'components/ui/options-button.vue';

const trackNumberSorter = createNumbersSorter('trackNumber');

export default {
  name: 'credits-collaborator',
  components: {
    ToggleButton,
    CollaboratorMenu,
    UserInfo,
    CreditsSongItem,
    OptionsButton
  },
  directives: {
    touch
  },
  inject: {
    dataSource: {
      type: Object,
      required: true
    },
    creditsCard: {
      type: Object,
      required: true
    }
  },
  props: {
    collaborator: {
      type: Object,
      required: true
    },
    associationId: {
      type: String,
      required: false
    }
  },
  data() {
    return {
      isMenuOpen: false,
      isShowDetails: false
    };
  },
  computed: {
    componentClass() {
      return {
        'credits-artist': true,
        [`credits-artist--${this.type}`]: true
      }
    },
    type() {
      return this.creditsCard.isUnassigned
        ? 'unassigned'
        : this.creditsCard.type;
    },
    profile() {
      return this.collaborator.profile;
    },
    album() {
      return this.dataSource.album;
    },
    // TODO: Remove later
    isVerified() {
      return true;
    },
    collaboratorTracks() {
      return (this.collaborator.tracks || [])
        .slice()
        .sort(trackNumberSorter);
    },
    hasCreditsData() {
      return this.collaboratorTracks.length > 0;
    }
  },
  methods: {
    handleRowClick({ target }) {
      if (!isParentElementInteractive(target)) {
        if (this.type === 'album' && this.hasCreditsData) {
          this.toggleDetails();
        }
      }
    },
    toggleDetails() {
      this.isShowDetails = !this.isShowDetails;
    }
  }
}
</script>

<style lang="scss">
:root {
  --credits-artist-transition: 100ms ease-in-out;
}

.credits-artist {
  position: relative;
  padding: 0 10px;
  &__inner {
    --user-avatar-size: 32px;
    --toggle-icon-color: #595857;
    --vline-color: rgb(58, 57, 56);
    --vline-height: 14px;
    --vline-gap: 8px;
    padding-left: 5px;
    padding-right: 10px;
    border-radius: 5px;
    transition:
      background-color var(--credits-artist-transition),
      opacity 150ms ease-in-out;
    cursor: pointer;
    @at-root {
      &.touched,
      &[data-hovered],
      .desktop &:hover {
        background-color: rgba(89, 88, 87, 0.4);
      }
    }
  }
  &__more {
    position: absolute;
    z-index: 2;
    right: 40px;
    top: 0px;
    bottom: 0px;
    margin-top: auto;
    margin-bottom: auto;
    height: 17px;
    opacity: 0;
    transition: opacity var(--credits-artist-transition);
    > * {
      width: 30px;
      height: 100%;
    }
    @at-root {
      .credits-artist--song &,
      .credits-artist--unassigned &,
      .credits-artist:not([data-has-info]) & {
        right: 10px;
      }
      .credits-artist__inner[data-editable]:hover &,
      .credits-artist__inner[data-editable][data-hovered] & {
        opacity: 1;
      }
    }
  }
  &__tracks-count {
    margin-left: 8px;
    margin-right: 14px;
    font-size: 12px;
    font-style: normal;
    line-height: 1.2;
    white-space: nowrap;
    color: #8F8F8F;
    transition: opacity var(--credits-artist-transition);
    @at-root {
       .credits-artist__inner[data-editable]:hover &,
       .credits-artist__inner[data-editable][data-hovered] & {
        opacity: 0;
      }
    }
  }
  &__toggle-button {
    margin-left: 10px;
  }
}

.credits-details {
  margin: 0;
  padding: 5px 0;
  border-radius: 5px;
  background-color: #151413;
}
</style>