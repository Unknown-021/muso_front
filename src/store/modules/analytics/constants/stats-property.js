import {
  appleMusic,
  amazonMusic,
  beaport,
  deezer,
  itunes,
  shazam,
  soundcloud,
  spotify,
  tidal,
  tiktok,
  youtube
} from './data-sources';

export const statsPropertySourceMap = {
  streams: [spotify, soundcloud, youtube],
  shazams: [shazam],
  tiktokViews: [tiktok],
  playlistsReach: [spotify, deezer],
  playlists: [spotify, tidal, youtube, deezer, appleMusic, amazonMusic],
  charts: [appleMusic, amazonMusic, shazam, beaport, itunes]
};

export const statsProperties = [{
  value: 'streams',
  title: 'Streams'
}, {
  value: 'shazams',
  title: 'Shazams'
}, {
  value: 'tiktokViews',
  title: 'TikTok Views'
}, {
  value: 'playlistsReach',
  title: 'Playlist Reach'
}, {
  value: 'playlists',
  title: 'Playlists'
}, {
  value: 'charts',
  title: 'Charts'
}];

export const statsPropertiesTabs = [{
  value: 'streams',
  title: 'Streams'
}, {
  value: 'shazams',
  title: 'Shazams'
}, {
  value: 'tiktokViews',
  title: 'TikTok Views'
}, {
  value: 'playlistsReach',
  title: 'Playlist Reach'
}, {
  value: 'playlists',
  title: 'Playlists'
}, {
  value: 'charts',
  title: 'Charts'
}];

export const statsPropertiesShareTile = [
  {
    value: 'all',
    title: 'All'
  },
  {
  value: 'streams',
  title: 'Streams'
}, {
  value: 'shazams',
  title: 'Shazams'
}, {
  value: 'tiktokViews',
  title: 'TikTok Views'
}, {
  value: 'playlistsReach',
  title: 'Playlist Reach'
}, {
  value: 'playlists',
  title: 'Playlists'
}, {
  value: 'charts',
  title: 'Charts'
}];

export function statsPropertyText(value) {
  return statsProperties.find(item => item.value === value)?.title;
}
