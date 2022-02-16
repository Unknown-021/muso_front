export function getCollaboratorTypeOrRole(item) {
  return item.type === 'ARTIST' ? 'Artist' : 'Unassigned';
};

// TODO: Ask backend developer rename "collaborators" property to "collaborators"
export function normalizeCollaborators(data) {
  return data.map(({ collaborators, ...rest }) => ({
    ...rest,
    collaborator: collaborators
  }));
}
