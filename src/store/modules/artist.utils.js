export function toArtistNames(artistsStr) {
  return (artistsStr || '').split('/').filter(_ => _);
}

export function decreaseArtistsCount(artists, artistNamesList) {
  const updateArtist = (artist) => (
    artistNamesList.includes(artist.fullName)
      ? {
        ...artist,
        count: artist.count - 1
      }
      : artist
  );
  return artists.map(updateArtist).filter(artist => artist.count);
}