<template>
  <base-menu-item icon="export" v-on="$listeners">
    Export Credits
    <template #menu>
      <base-menu>
        <base-menu-item @click="downloadRIN">Export RIN</base-menu-item>
      </base-menu>
    </template>
  </base-menu-item>
</template>

<script>
import BaseMenu, { BaseMenuItem } from 'components/ui/base-menu/base-menu';

export default {
  name: 'export-credits',
  components: {
    BaseMenu,
    BaseMenuItem
  },
  props: {
    album: {
      type: Object,
      required: true
    }
  },
  computed: {
    exportLink() {
      return this.$store.http.defaults.baseURL + `/album/${this.album.id}/rin/download`;
    }
  },
  methods: {
    async downloadRIN() {
      try {
        await this.$store.dispatch('collection/exportRIN', { id: this.album.id });
      } catch (error) {
        this.$handleError(error);
      }
    }
  }
}
</script>