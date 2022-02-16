<script>
import BaseSearch from 'components/ui/base-search/base-search.vue';
import SyncUrlQuery from 'components/utils/sync-url-query.vue';

export const ALBUMS_SEARCH_QUERY = 'album_query';

export default {
  name: 'user-albums-search',
  functional: true,
  props: {
    value: {
      type: String,
      default: ''
    }
  },
  render: (h, { props, data }) => {
    return [
      <SyncUrlQuery value={props.value} query={ALBUMS_SEARCH_QUERY}>
        <BaseSearch class="user-albums-search" value={props.value} {...data} />
      </SyncUrlQuery>
    ];
  }
}
</script>

<style lang="scss">
.user-albums-search {
  height: 36px;
}
</style>