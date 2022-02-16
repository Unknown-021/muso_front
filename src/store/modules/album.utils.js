import { createNumbersSorter } from 'helpers/sorters';
import { ensureTracksNumbers } from './song.utils';

export function isAlbumReleased(album) {
  return Boolean(album.releaseDate || album.publishedAt);
}

export function normalizeResponse(data) {
  const { album, release, ...reset } = data;
  return {
    ...album,
    releaseDate: release.releaseDate,
    ...reset
  };
}

export function normalizeSongsResponse(data) {
  const sorter = createNumbersSorter('trackNum');
  const songs = data
    .map(({ trackNumber, ...rest }) => ({
      trackNum: trackNumber || null,
      ...rest
    }))
    .sort(sorter);

  return ensureTracksNumbers(songs);
}
