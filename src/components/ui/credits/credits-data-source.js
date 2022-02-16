import Vue from 'vue';
import { filterObject } from 'helpers/object';

const types = ['album', 'song'];
const defaultSource = {
  isAdmin: false,
  collaboratorCount: 0
};

const CreditsDataSourceOptions = {
  name: 'CreditsDataSource',
  render: null,
  props: {
    type: {
      type: String,
      required: true,
      validator: value => types.includes(value)
    }
  },
  data() {
    return {
      searchQuery: ''
    };
  },
  computed: {
    credits() {
      return this.creditsGetter('credits');
    },
    filteredCredits() {
      if (!this.searchQuery) {
        return this.credits;
      }
      
      const collaborationsMap = this.creditsGetter('collaborationsMap');
      const filtered = filterObject(collaborationsMap, this.filter);
      return this.creditsGetter('selectCredits')(filtered);
    },
    creditsGetter() {
      const storeKey = (this.type === 'album') ? 'collection' : this.type;
      return getter => this.$store.getters[`${storeKey}/credits/${getter}`];
    },
    queryRegexp() {
      return new RegExp(this.searchQuery, 'i');
    },
    source() {
      const source = this.type === 'song'
        ? this.songData
        : this.albumData;
      
      return source || defaultSource;
    },
    album() {
      const album = this.type === 'song'
        ? this.songData?.collection
        : this.albumData;

      return album || null;
    },
    collaboratorCount() {
      return this.source.collaboratorCount || this.creditsGetter('collaboratorCount');
    },
    isAdminPage() {
      return this.source.isAdmin;
    },
    songIds() {
      return this.type === 'song'
        ? [this.songData.id]
        : undefined;
    },
    albumData() {
      return this.$store.getters['collection/collectionDetails'];
    },
    songData() {
      return this.$store.getters['song/songDetails'];
    }
  },
  methods: {
    setSearchQuery(value) {
      this.searchQuery = value;
    },
    filter({ role, profile }) {
      return (
        role.association?.match(this.queryRegexp) ||
        role.parent.association?.match(this.queryRegexp) ||
        profile.name.match(this.queryRegexp)
      );
    }
  }
};

const Component = Vue.extend(CreditsDataSourceOptions);

export function CreditsDataSource({ type, vm }) {
  return new Component({
    parent: vm,
    propsData: {
      type: type,
    }
  });
}
