import UserInfo from 'components/user/user-info';
import AlbumInfo from 'components/collection/album-info';

export const dataTypeMap = {
  user: {
    component: UserInfo,
    props: (notification) => {
      return { user: getUser(notification) };
    }
  },
  album: {
    component: AlbumInfo,
    props: (notification) => ({
      album: notification.payload.collection
    })
  }
};

function getUser(notification) {
  if (notification.profile) {
    return notification.profile;
  } else {
    const { id, profileId, ...profile } = notification.payload.trigger;
    return {
      id: profileId,
      type: 'PROFESSIONAL',
      ...profile
    };
  }
}
