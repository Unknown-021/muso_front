import ArtistsEnumeration from 'components/artist/artists-enumeration';

const SongArtistWithFallback = {
  name: 'song-perfomer-cell',
  functional: true,
  props: {
    artist: {
      type: [String, Array],
      required: true
    }
  },
  render(h, context) {
    const { artist } = context.props;

    return Array.isArray(artist)
    ? <ArtistsEnumeration artists={artist} {...context.data} />
    : context._v(artist || '-');
  }
};

export default SongArtistWithFallback;
