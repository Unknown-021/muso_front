<script>
import ArtistsEnumeration from 'components/artist/artists-enumeration';

export default {
  name: 'table-cell-discography',
  functional: true,
  props: {
    discography: {
      type: Object,
      required: true
    },
    route: {
      type: Object,
      require: true
    }
  },
  render(h, { props }) {
    const { route, discography } = props;
    return [
      <router-link to={route}>
        {discography.title}
      </router-link>,
      <ArtistsEnumeration class="info-cell-text" artists={discography.artists} />
    ];
  }
}
</script>
