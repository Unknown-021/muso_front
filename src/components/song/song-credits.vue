<template>
  <section class="song-credits">
    <h3 class="visually-hidden">Song credits</h3>
    <template v-if="filteredCreditsSections.length">
      <template v-for="section in filteredCreditsSections">
        <div :key="section.title" class="modal-section">
          <p class="modal-section-title">
            {{ section.title }}
            <span class="modal-section-count">({{ section.items.length }})</span>
          </p>

          <collaborator-credits-table :credits="section.items" v-slot="{ collaborator, index }">
            <component
              :is="getRowComponent(section.key)"
              :collaborator="collaborator"
              :index="index"
              @roles-change="setRoles(collaborator, $event)"
              @admin-change="setAdmin(collaborator, $event)"
              @remove="removeCollaborator(collaborator)"
            />
          </collaborator-credits-table>
        </div>
      </template>
    </template>
    <div v-else class="song-credits__empty">
      <slot name="empty">
        <div class="zero-static">
          <collaborators-icon class="zero-static__img zero-static__img--dark" />
          <p class="zero-static__text">You haven’t added any collaborators yet.</p>
        </div>
      </slot>
    </div>
  </section>
</template>

<script>
import CollaboratorCreditsTable from 'components/collaborator/collaborator-credits-table.vue';
import CollaboratorCreditsRow from 'components/collaborator/collaborator-credits-row.vue';
import ArtistCreditsRow from 'components/artist/artist-credits-row.vue';
import CollaboratorsIcon from 'assets/images/zero-state/collaborators.svg';

export default {
  name: 'song-credits',
  components: {
    CollaboratorCreditsTable,
    CollaboratorsIcon
  },
  props: {
    credits: {
      type: Array,
      required: true
    }
  },
  computed: {
    filteredCreditsSections() {
      return this.creditsSections.filter(section => section.items.some(item => item.roles));
    },
    creditsSections() {
      return [
        {
          title: 'Artists',
          key: 'artists',
          items: this.sections.artists
        },
        {
          title: 'Collaborators',
          key: 'collaborators',
          items: this.sections.collaborators
        }
      ];
    },
    sections() {
      const artists = [];
      const collaborators = [];

      this.credits
        .filter(item => item.roles)
        .forEach(item => {
          const arr = this.isArtist(item) ? artists : collaborators;
          arr.push(item);
        });

      return { artists, collaborators };
    },
    artistRoleIds() {
      const artistTypes = this.$store.getters['artist/mainArtistTypes'];
      return new Set(artistTypes.map(role => role.id));
    }
  },
  methods: {
    getRowComponent(sectionKey) {
      return sectionKey === 'artists'
        ? ArtistCreditsRow
        : CollaboratorCreditsRow;
    },
    isArtist(item) {
      return item.roles.some(role => this.artistRoleIds.has(role.id));
    },
    setRoles(collaborator, roles) {
      this.$emit('roles-change', collaborator, roles);
    },
    setAdmin(collaborator, isAdmin) {
      this.$emit('admin-change', collaborator, isAdmin);
    },
    removeCollaborator(collaborator) {
      this.$emit('remove', collaborator);
    }
  }
}
</script>

<style lang="scss">
.modal-section {
  display: flex;
  flex-direction: column;
  padding-top: 10px;
  padding-bottom: 10px;
  --skeleton-color: #383838;
  &-title {
    margin-bottom: 14px;
    font-size: 20px;
    line-height: 1.3;
    font-weight: 500;
    color: #FFF;
    .skeleton {
      margin-top: 5px;
      margin-bottom: 6px;
    }
  }
  &-count {
    color: rgb(143, 143, 143);
  }
}

.song-credits {
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  &__empty {
    margin-top: auto;
    margin-bottom: auto;
  }
}
</style>