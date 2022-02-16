<template>
  <base-modal :mobile-sliding="true" v-bind="$attrs" v-on="$listeners">
    <h2 class="modal-title">{{ profile.fullName }}</h2>

    <div class="modal-body">
      <div class="modal-list">
        <template v-for="item in socialAccounts">
          <a :key="item.type" :href="item.link" class="modal-list__item" target="_blank" v-touch>
            <img class="modal-list__round-icon" :src="logos[item.type]" width="20" height="20" />
            {{ item.type }}: {{ profile.fullName }}
          </a>
        </template>
      </div>

      <base-modal-cancel-button />
    </div>
  </base-modal>
</template>

<script>
import BaseModal, { BaseModalCancelButton } from "components/ui/base-modal/base-modal.vue";
import Facebook from "assets/images/logos/facebook-round.svg";
import Twitter from "assets/images/logos/twitter-round.svg";
import Instagram from "assets/images/logos/instagram-round.svg";
import Spotify from "assets/images/logos/spotify-round.svg";
import Website from "assets/images/icons/website-round.svg";
import { touch } from "directives/touch";

const logosMap = {
  facebook: 'images/logos/facebook-round.svg',
  twitter: 'images/logos/twitter-round.svg',
  instagram: 'images/logos/instagram-round.svg',
  spotify: 'images/logos/spotify-round.svg',
  website: 'images/icons/website-round.svg',
};

export default {
  name: "social-links-modal",
  directives: {
    touch
  },
  components: {
    BaseModal,
    BaseModalCancelButton,
    Facebook,
    Twitter,
    Instagram,
    Spotify,
    Website
  },
  props: {
    profile: {
      type: Object,
      required: true,
    },
    socialAccounts: {
      type: Array,
      required: true
    }
  },
  computed: {
    logos() {
      return logosMap;
    }
  }
};
</script>
