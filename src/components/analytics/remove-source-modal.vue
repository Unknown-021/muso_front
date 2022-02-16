<template>
  <base-modal
    ref="modal"
    modal-class="subs-modal remove-source"
    v-bind="$attrs"
    v-on="$listeners"
  >
    <div class="remove-source__header">
      <span class="remove-source__title">Remove Source</span>
    </div>
    <div class="remove-source__content">
      <div class="remove-source__text-wrapper">
        <span class="remove-source__text"
        >Are you sure you want to remove this source? Once removed your analytics will be recalculated.</span>
        <br/>
      </div>
      <form action="" @submit.prevent="removeSource">
      </form>
      <div class="remove-source__button">
        <action-button @click="hide" variant="primary-ghost">Cancel</action-button>
        <action-button @click="removeSource" variant="primary-danger">Remove</action-button>
      </div>
    </div>
  </base-modal>
</template>

<script>
import BaseModal from 'components/ui/base-modal/base-modal.vue';
import BinIcon from 'assets/images/icons/bin-2.svg';
import PlusIcon from 'assets/images/icons/plus.svg';
import ActionButton from 'components/ui/action-button.vue';

export default {
  name: 'remove-source-modal',
  components: {
    BaseModal,
    BinIcon,
    PlusIcon,
    ActionButton
  },
  props: {
    sourceUrl: {
      type: String,
    },
    source: {
      type: String,
    }
  },
  computed: {
    sources() {
      return this.$store.getters['analytics/activity/additionalSourceUrl'];
    },
    user() {
      return this.$store.getters['user/data'];
    },
    trackId() {
      return this.$store.getters['analytics/trends/selectedIds'];
    }
  },
  methods: {
    removeSource() {
      let sourceResponse = this.$store.dispatch('analytics/activity/removeSource', {
        profileId: this.user.id,
        trackId: this.trackId[0],
        params: {
          link: this.sourceUrl,
          source: this.source
        }
      });
      sourceResponse.then(respone => {
          this.$notify('Source removed', 'info')
          this.hide();
          this.$router.go(this.$router.currentRoute);
        }
      ).catch(error => this.$handleError(error))
    },
    hide() {
      this.$refs.modal.hide();
    }
  }
};
</script>

<style lang='scss'>
@import "~assets/styles/utils/utils.abstract";

.remove-source.subs-modal {
  max-width: 580px;
  min-height: 200px;
  max-height: 700px;
  background: var(--base-1-color);
  flex-direction: column;
  flex-grow: 0;
  --modal-border-radius: 2px;
  overflow: hidden;
}

.remove-source {
  &__content {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-top: 16px;
  }

  &__text {
    color: var(--overlay-2-color);
    padding-right: 46px;
  }

  &__text-wrapper {
    margin-bottom: 12px;
    width: 423px;
  }

  &__header {
    display: flex;
    align-items: center;
    padding: 0 16px;
    height: 52px;
    background: var(--base-3-color);
    border-top-left-radius: 2px;
    border-top-right-radius: 2px;
  }

  &__title {
    font-size: 20px;
    font-weight: 500;
    color: var(--overlay-5-color);
  }

  &__input {
    margin-bottom: 12px;
    display: flex;
  }

  &__input:last-of-type {
    margin-bottom: 0;
  }

  &__input-control {
    @include reset-outline;
    width: 391px;
    border: 0;
    border-radius: 2px;
    padding: 7px 25px 8px 8px;
    margin-right: 12px;
    height: 32px;
    font-size: 14px;
    caret-color: #4cc2a5;
    color: var(--overlay-1-color);
    background-color: #2a2827;
  }

  &__input-control::placeholder {
    color: var(--overlay-2-color);
  }

  &__icon {
    margin-top: 6px;
    cursor: pointer;
  }
}
</style>
