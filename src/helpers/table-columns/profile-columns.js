import ProfileAvatar from 'components/ui/profile/profile-avatar.vue';
import { TableCell } from "components/ui/table-cell/table-cell";
import CollaboratorInfo from "components/ui/table-cell/collaborator-info.vue";
import { getCollaboratorRoute, collabotatorsGroupingRoute } from '../routing';
import { getCollaboratorTypeOrRole } from 'store/modules/profile.utils';

export const avatar = {
  title: '',
  key: 'avatar',
  anatomy: 'master-avatar',
  component: ProfileAvatar,
  componentProps: profile => ({ profile }),
  skeletonClass: 'rounded'
};

export const bigAvatar = {
  title: '',
  key: 'avatar',
  anatomy: 'master-avatar',
  component: ProfileAvatar,
  componentProps: profile => ({ 
    profile: profile,
    bigAvatar: true
   }),
  skeletonClass: 'rounded'
};

export const name = {
  title: 'Name',
  key: 'name',
  anatomy: 'master',
  component: TableCell.ProfileLink,
  componentProps: item => ({
    profile: item,
    getRoute: getCollaboratorRoute
  })
};

export const name2 = {
  ...name,
  componentProps: ({ collaborator}) => ({
    profile: collaborator,
    getRoute: getCollaboratorRoute
  })
};

export const collaboratorAvatar = {
  ...avatar,
  componentProps: ({ collaborator }) => ({
    profile: collaborator
  })
};

export const collaboratorInfo = {
  title: 'Name',
  key: 'name',
  anatomy: 'master',
  component: CollaboratorInfo,
  componentProps: collaborator => ({ collaborator })
};

export const collaboratorName = {
  title: 'Name',
  key: 'name',
  anatomy: 'master',
  component: TableCell.Info,
  componentProps: item => ({
    title: item.name || item.fullName,
    text: getCollaboratorTypeOrRole(item),
    route: getCollaboratorRoute(item)
  })
};

export const collaboratorGroupName = {
  title: 'Name',
  key: 'name',
  anatomy: 'master',
  component: TableCell.InfoGrouping,
  componentProps: item => ({
    title: item.name || item.fullName,
    text: getCollaboratorTypeOrRole(item),
    item: item
  })
};


