import { parentAssociations } from './credits.constants';
import { createIdsMap } from 'helpers/object';

const state = () => ({
  credits: [],
  collaborationsMap: {}
});

export default {
  namespaced: true,
  state,
  getters: {
    credits: (state, getters) => getters.selectCredits(state.collaborationsMap),
    selectCredits: (state) => {
      return collaborationsMap => selectCredits(state.credits, collaborationsMap);
    },
    collaborations: (state) => Object.values(state.collaborationsMap),
    collaborationsMap: (state) => state.collaborationsMap,
    collaboratorCount: (state) => {
      const set = new Set();

      for (let key in state.collaborationsMap) {
        const collaborator = state.collaborationsMap[key];
        set.add(collaborator.profile.id);
      }

      return set.size;
    },
    profilesMap: (state, getters) => createIdsMap(getters.collaborations, item => item.profile),
    profiles: (state, getters) => Object.values(getters.profilesMap)
  },
  mutations: {
    setCredits(state, data) {
      const { credits, collaborationsMap } = normalizeCredits(data);
      state.credits = credits;
      state.collaborationsMap = collaborationsMap;
    }
  },
  actions: {}
};

function selectCredits(credits, collaborationsMap) {
  return credits.map(parentRole => ({
    ...parentRole,
    list: parentRole.list.map(transformRole).filter(item => item.collaborators.length)
  }));
  function transformRole(role) {
    return {
      ...role,
      collaborators: role.collaborators.reduce(collectCollaborators, [])
    }
  };
  function collectCollaborators(arr, id) {
    const item = collaborationsMap[id];
    if (item) {
      arr.push(item);
    }
    return arr;
  };
}

export function normalizeCredits(rawCredits) {
  const collaborations = [];
  const credits = tagCredits(rawCredits).map(transformCategory);

  function transformCategory(category) {
    return {
      ...category,
      list: category.list.map(roleItem => {
        const role = createRole(roleItem, category);
        return {
          ...roleItem,
          collaborators: roleItem.collaborators.map(item => createCollaboration(role, item))
        };
      })
    };
  }

  function createCollaboration(role, collaborator) {
    const collaboration = {
      ...collaborator,
      role
    };
    collaborations.push(collaboration);
    return collaboration.id;
  }

  return { credits, collaborationsMap: createIdsMap(collaborations) };
}

function createRole(role, parentRole) {
  return {
    id: role.id,
    association: role.association,
    parent: {
      id: parentRole.id,
      association: parentRole.association
    }
  };
}

export function tagCredits(rawCredits) {
  return parentAssociations.map(({ id, name, tag }) => {
    const item = rawCredits.find(credit => credit.id === id);
    
    return {
      id,
      association: name,
      tag,
      list: item?.list || []
    };
  });
}
