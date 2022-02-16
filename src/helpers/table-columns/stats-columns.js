import { TableCell } from 'components/ui/table-cell/table-cell';
import SourceCover from 'components/ui/table-cell/source-cover.vue';
import SourceDetails from 'components/ui/table-cell/source-details.vue';

export const streamsCount = {
  title: 'Streams',
  key: 'streams',
  anatomy: 'default',
  component: TableCell.Number,
  componentProps: item => ({
    value: item.streamCount
  })
};

export const streamsCountSortable = {
  ...streamsCount,
  sorter: true,
  sortKey: 'streamCount',
  sortDirections: ['DESC', 'ASC']
};

export const streams = {
  key: 'streams',
  title: 'Streams',
  anatomy: 'default',
  processable: true,
  class: 'col-right col-number',
  component: TableCell.LocalNumber,
  componentProps: item => ({
    value: item.streams
  })
};

export const streamsSortable = {
  ...streams,
  class: 'col-right col-number th--clickable--no-hover',
  sorter: true,
  sortIcon: 'calendar',
  sortKey: 'streams',
  sortDirections: ['DESC', 'ASC'],
  sortDefault: 'DESC'
}

export const shazams = {
  key: 'shazams',
  title: 'Shazams',
  processable: true,
  anatomy: 'default',
  class: 'col-right col-number',
  component: TableCell.LocalNumber,
  componentProps: item => ({
    value: item.shazams
  })
};

export const shazamsSortable = {
  ...shazams,
  class: 'col-right col-number th--clickable--no-hover',
  sorter: true,
  sortIcon: 'calendar',
  sortKey: 'shazams',
  sortDirections: ['DESC', 'ASC']
}

export const tiktokViews = {
  key: 'tiktokViews',
  title: 'TikTok Views',
  anatomy: 'default',
  processable: true,
  class: 'col-right col-number',
  component: TableCell.LocalNumber,
  componentProps: item => ({
    value: item.tiktokViews
  })
};

export const tiktokViewsSortable = {
  ...tiktokViews,
  class: 'col-right col-number th--clickable--no-hover',
  sorter: true,
  sortIcon: 'calendar',
  sortKey: 'tiktokViews',
  sortDirections: ['DESC', 'ASC'],
}

export const playlistsReach = {
  key: 'playlistsReach',
  title: 'Playlist Reach',
  anatomy: 'default',
  processable: true,
  class: 'col-right col-number',
  component: TableCell.LocalNumber,
  componentProps: item => ({
    value: item.playlistsReach
  })
};

export const playlistsReachSortable = {
  ...playlistsReach,
  class: 'col-right col-number th--clickable--no-hover',
  sorter: true,
  sortIcon: 'calendar',
  sortKey: 'playlistsReach',
  sortDirections: ['DESC', 'ASC'],
}

export const playlists = {
  key: 'playlists',
  title: 'Playlists',
  anatomy: 'default',
  processable: true,
  class: 'col-right col-number',
  component: TableCell.LocalNumber,
  componentProps: item => ({
    value: item.playlists
  })
};

export const playlistsSortable = {
  ...playlists,
  class: 'col-right col-number th--clickable--no-hover',
  sorter: true,
  sortIcon: 'calendar',
  sortKey: 'playlists',
  sortDirections: ['DESC', 'ASC'],
}

export const charts = {
  key: 'charts',
  title: 'Charts',
  anatomy: 'default',
  processable: true,
  class: 'col-right col-number',
  component: TableCell.LocalNumber,
  componentProps: item => ({
    value: item.charts
  })
};

export const chartsSortable = {
  ...charts,
  class: 'col-right col-number th--clickable--no-hover',
  sorter: true,
  sortIcon: 'calendar',
  sortKey: 'charts',
  sortDirections: ['DESC', 'ASC'],
}

export const prevPeriod = {
  title: 'PREVIOS PERIOD',
  key: 'prevPeriod',
  anatomy: 'default',
  class: 'ellipsis col-right col-number th--clickable--no-hover',
  processable: true,
  component: TableCell.LocalNumber,
  componentProps: item => ({
    value: item.prevValue
  })
}

export const prevPeriodSortable = {
  ...prevPeriod,
  sorter: true,
  sortIcon: 'calendar',
  sortKey: 'prevValue',
  sortDirections: ['DESC', 'ASC'],
}

export const currPeriod = {
  title: 'THIS PERIOD',
  key: 'currPeriod',
  anatomy: 'default',
  class: 'ellipsis col-right col-number th--clickable--no-hover',
  processable: true,
  component: TableCell.LocalNumber,
  componentProps: item => ({
    value: item.currentValue
  })
}

export const currPeriodSortable = {
  ...currPeriod,
  sorter: true,
  sortIcon: 'calendar',
  sortKey: 'currentValue',
  sortDirections: ['DESC', 'ASC'],
}



