<template>
  <article
    :class="className"
    :data-hoverable="Boolean(route) && isHoverable"
    :data-now="isNow"
    @click="handleClick"
    v-on="$listeners"
  >
    <template v-if="type === 'card'">
      <span class="notif__date">{{ timeAgoFormatted }}</span>
    </template>
    <template v-else-if="type === 'alert'">
      <close-button class="notif__close" @close="close" />
    </template>

    <component class="notif-body" :is="bodyData.component" v-bind="bodyProps">
      <template #avatar-icon>
        <slot name="avatar-icon" />
      </template>
      <template #info>
        <slot name="text" />
      </template>
    </component>

    <slot />
  </article>
</template>

<script>
import CloseButton from 'components/ui/close-button.vue';
import { timeAgo, abbreviationFormat } from 'helpers/time-ago';
import { isParentElementInteractive } from 'helpers/dom';
import { dataTypeMap } from './notification.data-type';
import { sleep } from 'helpers/utils';

const types = ['card', 'alert'];
const dataTypes = ['user', 'album'];

const INTERACTIVE_NOTIFICATION_DELAY = 2000;

export default {
  name: 'notification',
  inheritAttrs: false,
  components: {
    CloseButton
  },
  provide() {
    return {
      notificationNode: this
    };
  },
  props: {
    notification: {
      type: Object,
      required: true
    },
    type: {
      type: String,
      required: true,
      validator: value => types.includes(value)
    },
    dataType: {
      type: String,
      required: true,
      validator: value => dataTypes.includes(value)
    },
    route: {
      type: [String, Object],
      default: undefined
    }
  },
  data() {
    return {
      isHoverable: true
    };
  },
  mounted() {
    this.$on('hoverable-change', value => this.isHoverable = value);
    this.$on('action-process', this.handleActionProcess);
  },
  computed: {
    className() {
      return {
        'notif': true,
        [`notif--${this.type}`]: true
      };
    },
    isNow() {
      return this.timeAgo.period === 'NOW';
    },
    timeAgo() {
      return timeAgo(this.notification.payload.date);
    },
    timeAgoFormatted() {
      return abbreviationFormat(this.timeAgo);
    },
    bodyData() {
      return dataTypeMap[this.dataType];
    },
    bodyProps() {
      return this.bodyData.props(this.notification);
    }
  },
  methods: {
    async handleActionProcess({ interactive = false } = {}) {
      if (this.type === 'alert') {
        if (interactive) {
          await sleep(INTERACTIVE_NOTIFICATION_DELAY);
        }
        this.close();
      }
    },
    handleClick({ target }) {
      if (isParentElementInteractive(target)) return;
      if (this.route) {
        this.handleActionProcess();
        this.$router.push(this.route);
      }
    },
    close() {
      this.$emit('close');
    }
  }
}
</script>

<style lang="scss">
@import "~assets/styles/helpers.abstract";

:root {
  --notification-padding: 15px;
  --notification-max-width: 385px;
}

.notif {
  @include set-variable(user album, (
    avatar-margin: 10px
  ));
  --user-avatar-icon-background-color: #272625;
  --notification-actions-offset-left: 50px;
  position: relative;
  padding: var(--notification-padding);
  border-radius: 8px;
  max-width: var(--notification-max-width);
  background-color: #272625;
  transition: background-color 150ms;
  &--alert {
    background-color: #171615;
  }
  &[data-hoverable] {
    cursor: pointer;
  }
  &--card {
    &[data-now] {
      background-color: #343332;
    }
    &[data-hoverable] {
      &:hover {
        background-color: #2b2b2a;
      }
    }
  }
  &__close {
    position: absolute;
    z-index: 1;
    top: 10px;
    right: 10px;
  }
  &__info {
    padding: 0;
  }
  &__date {
    position: absolute;
    right: var(--notification-padding);
    top: var(--notification-padding);
    font-weight: 500;
    color: #595857;
  }
}

.notif-body {
  padding: 0;
  padding-right: 40px;
}

.notif + .notif {
  margin-top: 5px;
}
</style>