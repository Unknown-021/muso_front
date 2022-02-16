import CollaboratorRoleModal from 'components/collaborator/collaborator-role-modal.vue';
import CollaboratorsImportConfirm from 'components/collaborator/collaborators-import-confirm.vue';
import CreateSongModal from 'components/song/create-song-modal.vue';
import RoleSearchModal from 'components/role/role-search-modal.vue';
import CreateAlbumModal from 'components/collection/create-album-modal.vue';
import SongModal from 'components/song/song-modal.vue';
import SubscriptionModal from 'components/subscription/subscription-modal.vue';
import PaymentModal from 'components/subscription/payment-modal.vue';
import CancelSubscriptionModal from 'components/subscription/cancel-subscription-modal.vue';
import LeaveSubscriptionModal from 'components/subscription/leave-subscription-modal.vue';
import CancelSubscriptionReasonsModal from 'components/subscription/cancel-subscription-reasons-modal.vue';
import AddSourceModal from 'components/analytics/add-source-modal.vue'
import RemoveSourceModal from 'components/analytics/remove-source-modal.vue'
import ShareAnalyticsTile from 'components/analytics/share-analytics-tile.vue'

export const mapNameToComponent = {
  'collaborator-role': CollaboratorRoleModal,
  'collaborators-import-confirm': CollaboratorsImportConfirm,
  'create-song': CreateSongModal,
  'role-search': RoleSearchModal,
  'create-album': CreateAlbumModal,
  'song': SongModal,
  'manage-subscription': SubscriptionModal,
  'update-payment': PaymentModal,
  'cancel-subscription': CancelSubscriptionModal,
  'leave-subscription': LeaveSubscriptionModal,
  'cancel-subscription-reasons': CancelSubscriptionReasonsModal,
  'add-source' : AddSourceModal,
  'remove-source' : RemoveSourceModal,
  'share-tile' : ShareAnalyticsTile
};
