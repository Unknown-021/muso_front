export function createUserFilterByName(query) {
  return (user) => user.fullName.toLowerCase().includes(query);
}

export function normalizeArtist(artist) {
  const { fullName, ...data } = artist;
  return {
    ...data,
    name: fullName,
    label: 'artist'
  };
}

export function normalizeProfile(profile) {
  const { fullName, ...data } = profile;
  return {
    ...data,
    name: fullName,
    label: 'professional'
  };
}
