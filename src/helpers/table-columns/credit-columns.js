import { TableCell } from 'components/ui/table-cell/table-cell';
import { creditsGroupingRoute } from '../routing';

export const title = {
  title: 'Credit',
  key: 'name',
  anatomy: 'master',
  component: TableCell.PlainCell,
  componentProps: item => ({
    value: item.credit
  }),
  class: 'ellipsis'
};

export const titleGrouping = {
  title: 'Credit',
  key: 'name',
  anatomy: 'master',
  component: TableCell.PlainCell,
  componentProps: item => ({
    value: item.credit
  }),
  class: 'ellipsis'
};

export const collaboratorRole = {
  title: 'Role',
  key: 'role',
  anatomy: 'default',
  class: 'ellipsis',
  component: TableCell.PlainCell,
  componentProps: ({ collaborator }) => ({
    value: collaborator.label === 'artist'
      ? 'Artist'
      : 'Profile'
  })
};

export const role = {
  title: 'Role',
  key: 'role',
  anatomy: 'default',
  class: 'ellipsis',
  field: 'credit'
};

export const collabCount = {
  title: 'Collabs',
  key: 'collabCount',
  anatomy: 'default',
  component: TableCell.Number,
  componentProps: item => ({
    value: item.collaborationCount
  })
}

export const songCount = {
  title: 'Track Count',
  key: 'trackCount',
  anatomy: 'default',
  component: TableCell.Number,
  componentProps: item => ({
    value: item.tracksCount
  })
};

export const creditAvatar = {
  title: '',
  key: 'commonCredit',
  anatomy: 'credits-icon',
  component: TableCell.CreditAvatar,
  componentProps: item => ({
    credit: item.parent
  })
}
