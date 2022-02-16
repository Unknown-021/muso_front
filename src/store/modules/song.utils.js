export function ensureTracksNumbers(songs, { force = false } = {}) {
  songs.forEach((item, index) => {
    if (item.trackNum === null || force) {
      item.trackNum = index + 1;
    }
  });

  return songs;
}

export function ensureTracksNumbers2(songs) {
  return songs.map((item, index) => ({
    ...item,
    trackNum: index + 1
  }));
}

export function handleProcessingSongTitle(song) {
  if (song.inProgress) {
    let processingSong = {
      ...song,
      title : song.inProgress ? song.title + ' (processing)' : song.title
    };
    return processingSong;
  } else {
    return song
  }
}
