<template>
  <profile-list-item
    v-if="isPrimaryArtist"
    v-bind="props"
    :data-prevent-hover="true"
  >
    <template #after>
      <span class="artist-role">{{ role.association }}</span>
    </template>
  </profile-list-item>

  <profile-list-item
    v-else
    v-bind="props"
    :loading="isLoading"
    :data-hovered="isOptionsOpen"
    @click="handleClick"
  >
    <template #after>
      <dropdown-trigger v-model="isOptionsOpen" placement="bottom-end" :offset="[0, 6]">
        <template v-if="role">
          <plain-button variant="default" :component="ToggleButton" :active.sync="isOptionsOpen">
            {{ role.association }}
          </plain-button>
        </template>
        <template v-else>
          <plain-button>Add</plain-button>
        </template>

        <template #dropdown>
          <artist-role-menu
            :role="role"
            @change="selectRole" 
            @remove="removeCollaborator"
            @close="closeOptions"
          />
        </template>
      </dropdown-trigger>
    </template>
  </profile-list-item>
</template>

<script>
import ProfileListItem from 'components/ui/profile/list-item';
import DropdownTrigger from 'components/ui/base-dropdown-trigger/base-dropdown-trigger.vue';
import ToggleButton from 'components/ui/toggle-button.vue';
import PlainButton from 'components/ui/base-plain-button/base-plain-button.vue';
import ArtistRoleMenu from 'components/artist/artist-role-menu.vue';
import { isParentElementInteractive } from 'helpers/dom';

export default {
  name: 'artist-menu-item',
  components: {
    ProfileListItem,
    DropdownTrigger,
    PlainButton,
    ArtistRoleMenu
  },
  inject: {
    artistField: {
      type: Object,
      required: true
    }
  },
  props: {
    artist: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      isOptionsOpen: false,
      isLoading: false
    };
  },
  computed: {
    ToggleButton: () => ToggleButton,
    props() {
      return {
        item: this.artist,
        navigable: false,
        type: 'artist',
        class: 'artist-menu-item'
      };
    },
    role() {
      return this.$store.getters['artist/getRole'](this.artist.associationId);
    },
    isPrimaryArtist() {
      return this.role?.tag === 'primary-artist';
    },
    songIds() {
      return this.artistField.songIds;
    },
    album() {
      return this.$store.getters['collection/collectionDetails'];
    }
  },
  methods: {
    handleClick({ target }) {
      if (!isParentElementInteractive(target)) {
        this.openOptions();
      }
    },
    openOptions() {
      this.isOptionsOpen = true;
    },
    closeOptions() {
      this.isOptionsOpen = false;
    },
    selectRole(role) {
      this.makeRequest((data) => {
        const action = (this.role)
          ? 'collection/credits/updateCollaborators'
          : 'collection/credits/addCollaborators';
        const payload = {
          ...data,
          associationIds: [role.id],
        };
        return this.$store.dispatch(action, payload);
      });
    },
    removeCollaborator() {
      this.makeRequest((payload) => {
        return this.$store.dispatch('collection/credits/deleteCollaborators', payload);
      });
    },
    async makeRequest(request) {
      try {
        this.isLoading = true;
        await request({
          albumId: this.album.id,
          collaboratorIds: [this.artist.id],
          songIds: this.songIds
        });
        this.close();
      } catch (error) {
        this.$handleError(error);
      } finally {
        this.isLoading = false;
      }
    },
    close() {
      this.$emit('close');
    }
  }
}
</script>

<style lang="scss">
.artist-menu-item {
  padding-left: 15px;
  padding-right: 15px;
  --profile-avatar-initials-border-color: #040302;
  --plain-btn-transition-duration: 150ms;
  &:hover,
  &[data-hovered=true] {
    background-color: #151413;
  }
  &[data-prevent-hover] {
    cursor: default;
    background-color: transparent;
  }
}
.artist-role {
  color: #8F8F8F;
}
</style>
