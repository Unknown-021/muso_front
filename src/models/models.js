import { AuthModel } from './auth';
import { UserModel } from './user';
import { ArtistModel } from './artist';
import { ProfileModel } from './profile';
import { AlbumModel } from './collection';
import { MemberModel } from './member';
import { SearchModel } from './search';
import { objectMap } from 'helpers/object';

const modelsMap = {
  auth: AuthModel,
  user: UserModel,
  profile: ProfileModel,
  artist: ArtistModel,
  album: AlbumModel,
  member: MemberModel,
  search: SearchModel
};

export function createModels(http) {
  return objectMap(modelsMap, Model => new Model({ http }));
}
