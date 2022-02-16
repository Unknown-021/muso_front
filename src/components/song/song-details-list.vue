<template>
  <div class="modal-details-list h-list">
    <div class="details">
      <strong class="details__title">Tempo:</strong>
      <strong class="details__text" :data-empty="!song.bpm">
        <editable-content
          :component="maskedInput"
          :accepts="[/\d/]"
          :max-length="3"
          :value="Math.floor(song.bpm) || ''"
          :save="saveBpm"
          :enabled="editable"
        >
          <template #after>BPM</template>
        </editable-content>
      </strong>
      <span class="h-line" />
    </div>
    <div class="details">
      <strong class="details__title">Length:</strong>
      <strong class="details__text" :data-empty="!songDuration">
        <editable-content
          :component="maskedInput"
          :accepts="[/\d/, /:/]"
          :max-length="maxSongLength"
          v-model="songDuration"
          placeholder="00:00"
          :save="saveLength"
          :enabled="editable"
          :invalid="$v.songDuration.$invalid"
        />
      </strong>
      <span class="h-line" />
    </div>
    <div class="details">
      <strong class="details__title">Key:</strong>
      <strong class="details__text">
        <editable-content
          placeholder="No Key"
          v-model="songKey"
          :enabled="editable"
          :save="saveKey"
        />
      </strong>
      <span class="h-line" />
    </div>
    <div class="details">
      <strong class="details__title">Genre:</strong>
      <strong class="details__text" :data-empty="!song.genres">
        <genre-field :source="song" :save="saveGenre" />
      </strong>
    </div>
  </div>
</template>

<script>
import DropdownTrigger from 'components/ui/base-dropdown-trigger/base-dropdown-trigger.vue';
import BaseMenu from 'components/ui/base-menu/base-menu.vue';
import EditableContent from 'components/ui/editable-content';
import GenreField from 'components/genre/genre-field.vue';
import MaskedInput from 'components/ui/masked-input.vue';
import duration from 'filters/duration';
import { validationMixin } from 'vuelidate'
import { validLength } from 'helpers/validation/song';

export default {
  name: 'song-details-list',
  mixins: [validationMixin],
  components: {
    DropdownTrigger,
    BaseMenu,
    EditableContent,
    GenreField
  },
  props: {
    song: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      songDuration: duration(this.song.duration, ''),
      songKey: this.song.key
    };
  },
  validations: {
    songDuration: {
      validLength
    }
  },
  watch: {
    isFormValid(value) {
      this.$emit('validity-change', value);
    }
  },
  computed: {
    maskedInput: () => TheMask,
    maskedInput: () => MaskedInput,
    isFormValid() {
      return !this.$v.$invalid;
    },
    editable() {
      const isPublished = Boolean(this.song.releaseDate);
      return !this.song.releaseDate && !isPublished;
    }
  },
  methods: {
    saveBpm(bpm) {
      return this.updateSong({ bpm: Number(bpm) });
    },
    saveKey(key) {
      this.updateSong({ key: key || null });
    },
    saveLength(length) {
      if (this.$v.songDuration.$invalid) {
        return this.$notify('The track length was entered incorrectly.', 'error');
      }
      const [mins, seconds] = length.split(':');
      const duration = (mins * 60) + Number(seconds);
      this.updateSong({ length: duration });
    },
    saveGenre({ genres }) {
      this.updateSong({ genres: genres.join(', ') });
    },
    async updateSong(data) {
      this.$emit('change', data);
    },
    maxSongLength(value) {
      return value.match(/^\d{2}:/) ? 5 : 4;
    }
  }
}
</script>

<style lang="scss">
.modal-details-list {
  --vline-height: 15px;
  --vline-color: rgb(61, 60, 59);
  --details-title-width: auto;
  --details-title-color: #8F8F8F;
  --editable-content-color: #F7F7F7;
  --editable-padding-x: 4px;
}
</style>
