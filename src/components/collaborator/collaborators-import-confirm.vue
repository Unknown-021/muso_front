<template>
  <action-modal
    ref="modal"
    :closable="false"
    v-bind="$attrs"
    v-on="$listeners"
  >
    <h2 class="action-modal-title">Import Collaborators</h2>

    <div class="action-modal-body">
      <p>Are you sure you want to import collaborators, including their roles from “{{ song.title }}”?</p>
      <div v-if="overwritableProfiles.length" class="modal-note modal-note--my">
        “Import all collaborators” will overwrite the existing track collaborators:
        <artists-enumeration class="modal-note__profiles-enum" :artists="limitedProfiles" target="_blank" />
        <template v-if="limitedCount">and other {{ limitedCount }}</template>
      </div>
    </div>

    <div class="action-modal-footer">
      <action-button v-if="uniqueCollaborators.length" variant="primary" @click="importItems(uniqueCollaborators)">
        Import new collaboratos
      </action-button>
      <action-button @click="importItems(collaborators)">
        Import all collaboratos
      </action-button>
      <action-button class="modal-plain-btn" plain @click="hide">Cancel</action-button>
    </div>
  </action-modal>
</template>

<script>
import ActionModal from 'components/ui/base-action-modal/base-action-modal.vue';
import ActionButton from 'components/ui/action-button.vue';
import PlainButton from 'components/ui/base-plain-button/base-plain-button.vue';
import ArtistsEnumeration from 'components/artist/artists-enumeration.vue';
import { getUniqueItems } from 'helpers/array';

const PROFILES_LIMIT = 5;

export default {
  name: 'confirm-modal',
  components: {
    ActionModal,
    ActionButton,
    PlainButton,
    ArtistsEnumeration
  },
  props: {
    song: {
      type: Object,
      required: true
    },
    collaborators: {
      type: Array,
      required: true
    },
    uniqueCollaborators: {
      type: Array,
      required: true
    }
  },
  computed: {
    limitedCount() {
      return Math.max(this.overwritableProfiles.length - PROFILES_LIMIT, 0);
    },
    limitedProfiles() {
      return this.overwritableProfiles.slice(0, PROFILES_LIMIT)
    },
    overwritableProfiles() {
      const collaborators = getUniqueItems(this.uniqueCollaborators, this.collaborators);
      return collaborators.map(item => item.profile);
    }
  },
  methods: {
    importItems(items) {
      this.$emit('import', items);
      this.hide();
    },
    getModal() {
      return this.$refs.modal.getModal(); 
    },
    hide() {
      this.$emit('canel');
      return this.getModal().hide(); 
    }
  }
}
</script>

<style lang="scss">
.modal-note {
  border-radius: 5px;
  padding: 10px;
  font-size: 12px;
  line-height: 1.3;
  color: #8F8F8F;
  background-color: rgb(22, 20, 20);
  &--my {
    margin-top: 21px;
    margin-bottom: -2px;
  }
  &__profiles-enum {
    display: inline;
    white-space: normal;
  }
}
.modal-plain-btn[class] {
  margin-top: 5px;
  width: auto;
}
</style>
