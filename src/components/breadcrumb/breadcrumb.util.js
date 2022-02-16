export function getBread(pageName, query, data) {
  switch (pageName) {
    case 'song':
      return getSongParts(data, { isLastPart: true });
    case 'collection':
      return getAlbumParts(data, { isLastPart: true, isCollaborator: data.isCollaborator });
    case 'artist':
    case 'profile':
      return data
        ? getUserParts(data, pageName, { isLastPart: true })
        : getFallback(query)
    case 'song-search-results':
      return getSearchResultsParts(query.keyword, 'Tracks');
    case 'artist-search-results':
      return getSearchResultsParts(query.keyword, 'Artists');
    case 'collection-search-results':
      return getSearchResultsParts(query.keyword, 'Albums');
    case 'profile-search-results':
      return getSearchResultsParts(query.keyword, 'Profiles');
    case 'search': 
      return [{ label: 'Search results', explicitLabel: true }];
    case 'albums':
      return [albumsPart];
    default:
      return [{ label: pageName }];
  }
}

const albumsPart = {
  label: 'My Albums',
  route: {
    name: 'albums'
  }
};

function getFallback(query) {
  const list = [];

  if (query.keyword) {
    list.push({ label: query.keyword });
  }

  return list;
}

function partRoute(isLastPart, route) {
  return isLastPart ? undefined : route;
}

function getUserParts(user, routeName, { isLastPart = false } = {}) {
  const list = [];

  if (user) {
    list.push({
      label: user.name,
      route: partRoute(isLastPart, {
        name: routeName,
        params: {
          id: user.id
        },
        query: {
          keyword: user.name
        }
      })
    });
  }

  return list;
}

function getAlbumParts(album, { isLastPart = false, isCollaborator = false } = {}) {
  const { primaryArtists = [], title } = album;
  const [artist] = primaryArtists;

  const list = isCollaborator
    ? [albumsPart]
    : getUserParts(artist, 'artist');

  list.push({
    label: title,
    route: partRoute(isLastPart, {
      name: 'collection',
      params: { id: album.id }
    })
  });

  return list;
}

function getSongParts(song, { isLastPart = false } = {}) {
  if (!song) {
    return [];
  }
  const list = [...getAlbumParts(song.collection, { isCollaborator: song.isCollaborator })];

  list.push({
    label: song.title,
    route: partRoute(isLastPart, {
      name: 'song',
      params: {
        id: song.id
      }
    })
  });

  return list;
}

function getSearchResultsParts(keyword, currentPage) {
  if (!keyword) {
    return  [];
  }

  return [
    {
      label: 'Search results',
      explicitLabel: true,
      route: { 
        name: 'search',
        query: { 
          keyword: keyword,
        }
      }
    },
    {
      label: currentPage,
    }
  ];
}
