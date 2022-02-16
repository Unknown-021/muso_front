<template>
  <notification data-type="user" v-bind="attrs" v-on="$listeners">
    <template #text>Invited you to <album-link :album="payload.album" /> as a <roles-list :roles="payload.roles" /></template>
    <notification-actions :buttons="buttons" :handler="handler" interactive>
      <template #result v-if="actionStatus !== 'requested'">
        {{ resultText }}
      </template>
    </notification-actions>
  </notification>
</template>

<script>
import { notification, ActionStatus } from '../create-notification';
import { albumRoute } from 'helpers/routing';

const buttons = [{
  action: ActionStatus.ACCEPTED,
  title: 'Approve'
}, {
  action: ActionStatus.DECLINED,
  title: 'Reject',
  props: {
    variant: 'danger'
  }
}];

export default notification({
  name: 'InviteCollaborator',
  computed: {
    route() {
      return albumRoute(this.notification.payload.album);
    },
    buttons: () => buttons,
    payload() {
      return this.notification.payload;
    },
    actionStatus() {
      return this.notification.actionStatus;
    },
    resultText() {
      switch(this.actionStatus) {
        case ActionStatus.ACCEPTED:
          return 'Request Accepted';
        case ActionStatus.DECLINED:
          return 'Request Rejected';
      }
    }
  },
  methods: {
    async handler({ action }) {
      try {
        await this.$store.dispatch('notification/respondInvite', {
          action,
          albumId: this.notification.payload.album.id,
          notificationId: this.notification.id
        });
      } catch (error) {
        this.$handleError(error);
      }
    }
  }
})
</script>