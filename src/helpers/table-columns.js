// TODO: get rid of these file, because now we have table columns
// grouped be context: album, profile, credit, stats
// new table column definitions placed uner "helpers/table-columns/table-columns";

import ArtistsEnumeration from "components/artist/artists-enumeration";
import ProfileAvatar from 'components/ui/profile/profile-avatar.vue';
import { TableCell } from "components/ui/table-cell/table-cell";
import CollaboratorInfo from "components/ui/table-cell/collaborator-info.vue";
import { getCollaboratorRoute, songRoute } from './routing';

export { TableCell };

const songTitle = {
    title: 'Title',
    key: 'title',
    anatomy: 'master',
    component: TableCell.Link,
    componentProps: item => ({
        text: item.title,
        route: songRoute(item)
    })
};

const songAlbum = {
    title: 'Album',
    key: 'album',
    anatomy: 'default',
    class: 'ellipsis',
    component: TableCell.Link,
    componentProps: ({ albumId, albumTitle }) => ({
        route: `/album/${albumId}`,
        text: albumTitle || ''
    })
};

const songArtistWithFallback = {
    title: 'Artist',
    key: 'artist',
    anatomy: 'default',
    class: 'ellipsis',
    component: TableCell.SongArtistWithFallback,
    componentProps: ({ primaryArtists = [], primaryArtist }) => ({
        artist: primaryArtists.length ? primaryArtists : primaryArtist
    })
};

const profileAvatar = {
    title: '',
    key: 'avatar',
    anatomy: 'master-avatar',
    component: ProfileAvatar,
    componentProps: (item) => ({
        profile: item
    }),
    skeletonClass: 'rounded'
};

const profileName = {
    title: 'Name',
    key: 'name',
    anatomy: 'master',
    component: TableCell.ProfileLink,
    componentProps: item => ({
        profile: item,
        getRoute: getCollaboratorRoute
    })
};

const collaboratorAvatar = {
    ...profileAvatar,
    componentProps: (item) => ({
        profile: item.profile
    })
};

export const collaboratorInfo = {
    title: 'Name',
    key: 'name',
    anatomy: 'master',
    component: CollaboratorInfo,
    componentProps: (collaborator) => ({
        collaborator
    })
};

const releaseDate = {
    title: 'Release date',
    key: 'releaseDate',
    anatomy: 'default',
    component: TableCell.Date,
    componentProps: (item) => ({
        value: item.releaseDate
    })
};

const streamsCount = {
    title: 'Streams',
    key: 'streams',
    anatomy: 'default',
    component: TableCell.Number,
    componentProps: item => ({
        value: item.streamCount
    })
};

const artist = {
    title: 'Artist',
    key: 'artist',
    anatomy: 'default',
    // class: 'col-artist col-flexible',
    component: ArtistsEnumeration,
    componentProps: (item) => ({
        artists: item.artists
    })
};

const roleList = {
    title: 'Role',
    key: 'role',
    component: TableCell.PlainCell,
    componentProps: (item) => ({
        value: item.credit.join(', ')
    })
};

export const tableColumnsDef = {
    songNumber: {
        title: '',
        key: 'songNumber',
        anatomy: 'master-index',
        component: TableCell.PlainCell,
        componentProps: (item) => ({
            value: item.trackNum
        })
    },
    songTitle,
    songTitleWithSorter: {
        ...songTitle,
        sorter: true,
        sortIcon: 'sort-alpha',
        sortKey: 'title'
    },
    songCover: {
        title: '',
        key: 'songCover',
        anatomy: 'master-avatar',
        class: 'col-song-cover',
        component: TableCell.SongCover,
        componentProps: item => ({
            song: item
        })
    },
    songAlbum,
    songArtistWithFallback,
    artist,
    artistWithSorter: {
        ...artist,
        sorter: true,
        sortIcon: 'mic',
        sortKey: 'performer'
    },
    profileAvatar,
    profileName,
    collaboratorAvatar,
    collaboratorsCount: {
        title: 'Collaborators',
        key: 'collaborators',
        anatomy: 'default',
        component: TableCell.Number,
        componentProps: item => ({
            value: item.collaborations
        })
    },
    collaboratorRole: {
        title: 'Role',
        key: 'role',
        anatomy: 'default',
        field: 'commonCredit'
    },
    releaseDate,
    releaseDateWithSorter: {
        ...releaseDate,
        sorter: true,
        sortIcon: 'calendar',
        sortKey: 'releaseDate',
        sortDirections: ['DESC', 'ASC', 'NONE']
    },
    roleList,
    role: {
        title: 'Credit',
        key: 'role',
        anatomy: 'default',
        class: 'ellipsis',
        field: 'associations'
            // class: 'col-role ellipsis',
            // field: 'credit'
    },
    streamsCount,
    streamsCountWithSorter: {
        ...streamsCount,
        sorter: true,
        sortKey: 'streamCount',
        sortDirections: ['DESC', 'ASC', 'NONE']
    }
};

export function columns(columns) {
    return {
        add(column) {
            columns.push(column);
            return this;
        },
        addIf(condition, columnA, columnB) {
            if (condition) {
                this.add(columnA);
            } else if (columnB) {
                this.add(columnB);
            }

            return this;
        },
        value() {
            return columns;
        }
    };
}