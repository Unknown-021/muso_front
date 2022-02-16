import { createTextSorter } from 'helpers/sorters';
import { parentAssociations, unassignedAssociation } from './credits.constants';

export function normalizeParentAssociations(credits) {
  return credits.map(item => {
    const matchedItem = parentAssociations.find(credit => credit.id === item.id);
    const name = item.id === null
      ? unassignedAssociation.name
      : item.name;

    return {
      ...item,
      name,
      tag: matchedItem?.tag
    }
  });
}

export function populateWithId(credits) {
  return credits.map(item => ({
    id: item.track.id,
    ...item
  }));
}

export function isNoCredits(credits) {
  return credits.every((item => {
    return item.list.length === 0;
  }));
}

export function normalizeRoles(roles) {
  return roles.map(role => ({
    id: role,
    name: role
  }));
}

export function removeNullAssociations(credits) {
  credits.forEach(removeNullAssociation);
  return credits;
}

export function removeNullAssociation(collaborator) {
  const roles = collaborator.associations || collaborator.roles;
  
  const indexOf = roles.findIndex(isUnassigned);
  if (indexOf >= 0) {
    roles.splice(indexOf, 1);
    removeNullAssociation(collaborator);
  }
}

export function isUnassigned(role) {
  return role.id === unassignedAssociation.id;
}

export function filterNullRoles(roles) {
  return roles.filter(role => role.id !== null);
}

export function getCollaboratorRoles(credits, profileId) {
  const roles = [];
  const neededCollaborator = (item) => item.profile.id === profileId;
  const collectNeededRoles = (role) => {
    const collaborator = role.collaborators.find(neededCollaborator);
    if (collaborator) {
      roles.push({
        id: role.id,
        association: role.association
      });
    }
  }
  credits.forEach(category => category.list.forEach(collectNeededRoles));
  return roles;
}

export function taggableRole(role) {
  return {
    id: role.id,
    association: role.association,
    tag: convertTitleToTag(role.association)
  };
}

export function convertTitleToTag(str) {
  return str.toLowerCase().replace(/ /g, '-');
}

const nameSorter = createTextSorter('fullName');

export function collaboratorSorter(a, b) {
  const aLen = a.roles.length;
  const bLen = b.roles.length;
  if (!aLen && bLen) {
    return -1;
  } else if (aLen && !bLen) {
    return 1;
  }
  return nameSorter(a.profile, b.profile);
}

export function normalizeCreditsResponse(data) {
  const credits = [];

  for (let credit in data) {
    const children = data[credit];
    const id = getCreditId(credit);
    credits.push({
      parentAssociation: id,
      id,
      list: normalizeCreditsChildren(children)
    });
  }

  return credits;
}

function normalizeCreditsChildren(data) {
  const children = [];

  for (let childCredit in data) {
    const collaborators = data[childCredit].map(mapCollaboration);
    const id = getCreditId(childCredit);
    children.push({
      id,
      association: id,
      collaborators
    });
  }

  return children;
}

function getCreditId(credit) {
  return (credit === 'undefined') ? null : credit;
}

function mapCollaboration(data) {
  const { id, label, name, avatarUrl, ...rest } = data;
  return {
    id: Math.random(),
    ...rest,
    profile: {
      id,
      label,
      name,
      avatarUrl
    }
  };
}
