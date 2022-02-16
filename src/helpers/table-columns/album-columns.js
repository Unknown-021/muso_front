import { TableCell } from 'components/ui/table-cell/table-cell';
import ArtistsEnumeration from 'components/artist/artists-enumeration';
import { albumRoute, songRoute, analyticsTrendsRoute, trackActivityRoute, albumGroupingRoute } from '../routing';
import { handleProcessingSongTitle } from 'store/modules/song.utils';

export const title = {
  title: 'Title',
  key: 'title',
  anatomy: 'master',
  component: TableCell.DiscographyInfo,
  componentProps: (item) => ({
    discography: item,
    route: albumRoute(item)
  })
};

export const titleGrouping = {
  title: 'Title',
  key: 'title',
  anatomy: 'master',
  component: TableCell.DiscographyInfoGrouping,
  componentProps: (item) => ({
    discography: item
  })
};

export const cover = {
  title: '',
  key: 'cover',
  anatomy: 'master-avatar',
  component: TableCell.SongCover,
  componentProps: (item) => ({
    song: item
  })
};

export const cover2 = {
  ...cover,
  componentProps: ({ album }) => ({
    song: album
  })
};

export const artist = {
  title: 'Artist',
  key: 'artist',
  anatomy: 'default',
  component: ArtistsEnumeration,
  componentProps: (item) => ({
    artists: item.artists
  })
};

export const artistSortable = {
  ...artist,
  sorter: true,
  sortIcon: 'mic',
  sortKey: 'performer'
};

export const songNumber = {
  title: '#',
  key: 'songNumber',
  anatomy: 'master-index',
  component: TableCell.PlainCell,
  componentProps: (item) => ({
    value: item.trackNum
  })
};

export const songTitle = {
  title: 'Title',
  key: 'title',
  anatomy: 'master',
  component: TableCell.Link,
  componentProps: (item) => ({
    text: item.inProgress ? item.title + ' (processing)' : item.title,
    route: analyticsTrendsRoute(item)
  })
};

export const songTitleInfo = {
  title: 'Title',
  key: 'title',
  anatomy: 'master',
  component: TableCell.DiscographyInfo,
  componentProps: item => ({
    discography: handleProcessingSongTitle(item),
    route: songRoute(item)
  })
};

export const discographySongName = {
  title: 'Title',
  key: 'title',
  anatomy: 'master',
  component: TableCell.DiscographyInfo,
  componentProps: item => ({
    discography: item,
    route: trackActivityRoute(item)
  })
};

export const discographySongNameDemo = {
  title: 'Title',
  key: 'title',
  anatomy: 'master',
  component: TableCell.DiscographyInfo,
  componentProps: item => ({
    discography: item,
    route: songRoute(item)
  })
};

export const songTitleSortable = {
  ...songTitle,
  sorter: true,
  sortIcon: 'sort-alpha',
  sortKey: 'title'
};

export const songTitle2Sortable = {
  ...songTitleSortable,
  componentProps: ({ track }) => ({
    text: track.title,
    route: songRoute(track)
  })
}

export const songAlbum = {
  title: 'Album',
  key: 'album',
  anatomy: 'default',
  class: 'ellipsis',
  component: TableCell.Link,
  componentProps: ({ collection }) => ({
    route: albumRoute(collection),
    text: collection.title || '-'
  })
};

export const songAlbum2 = {
  ...songAlbum,
  componentProps: ({ album }) => ({
    route: albumRoute(album),
    text: album.title
  })
};

export const songArtistWithFallback = {
  title: 'Artist',
  key: 'artist',
  anatomy: 'default',
  component: TableCell.SongArtistWithFallback,
  componentProps: ({ primaryArtists, performer }) => ({
    artist: primaryArtists.length ? primaryArtists : performer
  })
};

export const releaseDate = {
  title: 'Release date',
  key: 'releaseDate',
  anatomy: 'default',
  component: TableCell.Date,
  componentProps: (item) => ({
    value: item.releaseDate
  })
};

export const releaseDateSortable = {
  ...releaseDate,
  sorter: true,
  sortIcon: 'calendar',
  sortKey: 'releaseDate',
  sortDirections: ['DESC', 'ASC', 'NONE']
};
