<script>
import ProfileListItem from 'components/ui/profile/list-item';
import AlbumListItem from 'components/ui/collection/list-item';
import SongListItem from 'components/ui/song/list-item';

export default {
  name: 'search-item-factory',
  components: {
    ProfileListItem,
    AlbumListItem,
    SongListItem
  },
  props: {
    item: {
      type: Object,
      required: true
    }
  },
  render(h) {
    const itemData = mapTypeToItemData[this.item.type];

    return <itemData.component ref="item" item={this.item} attrs={itemData.props} />;
  },
  methods: {
    // public method
    navigate() {
      const route = this.$refs.item?.getRoute();
      if (route) {
        this.$router.push(route);
      }
    }
  }
}

const mapTypeToItemData = {
  'artists': {
    component: ProfileListItem,
    props: {
      type: 'artist'
    },
  },
  'professionals': {
    component: ProfileListItem,
    props: {
      type: 'professional'
    },
  },
  'tracks': {
    component: SongListItem,
    props: undefined
  },
  'albums': {
    component: AlbumListItem,
    props: undefined
  }
};
</script>