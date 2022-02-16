<template>
  <!--
    Usage of v-slot is purely optimization step. In this way modal content will be
    rendered only we actually open modal window. We don't want to run regexp on the server
    (which needed to process muso tags) if it's not necessary.
  -->
  <base-modal
    ref="modal"
    :mobile-sliding="true"
    v-bind="$attrs"
    v-on="$listeners"
    v-slot="slotProps"
  >
    <header class="modal-header">
      <profile-avatar class="modal-header__image" :profile="data" width="44" height="44" />
      <div class="modal-header__info">
        <h2 class="modal-header__title">Biography</h2>
        <p class="modal-header__text">{{ data.fullName }}</p>
      </div>
    </header>

    <div class="modal-body modal-text">
      <div class="modal-rich-text" v-html="bioHtml" @click.capture="handleAnchorClick" />
    </div>
  </base-modal>
</template>

<script>
import BaseModal from 'components/ui/base-modal/base-modal.vue';
import ProfileAvatar from 'components/ui/profile/profile-avatar.vue';
import { replaceMustoTagsWithLink } from 'helpers/muso-tag';

export default {
  name: 'biography-modal',
  components: {
    BaseModal,
    ProfileAvatar
  },
  props: {
    data: {
      type: Object,
      required: true
    }
  },
  computed: {
    bioHtml() {
      return replaceMustoTagsWithLink(this.$router, this.data.bio);
    }
  },
  methods: {
    handleAnchorClick(event) {
      const anchorEl = event.target.closest('a');
      if (anchorEl) {
        event.preventDefault();
        this.followLink(anchorEl);
      }
    },
    async followLink({ pathname }) {
      if (pathname) {
        // We want to navigate to clicked link only after modal has been hidden.
        // It allows to prevent glitches and content jumping
        await this.hide();
        this.$router.push(pathname);
      }
    },
    hide() {
      return this.$refs.modal.hide(); 
    }
  }
};
</script>
