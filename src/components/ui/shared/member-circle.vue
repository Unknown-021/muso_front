<template>
  <span class="member-img">
    <router-link class="member-link" :to="memberRoute">
      <img
        class="small-member-avatar"
        :src="avatarUrl"
        @mouseover="memberCardIsOpen = true"
        @mouseleave="memberCardIsOpen = false"
      />
    </router-link>

    <transition name="fade-fast" mode="out-in">
      <div class="member-card" v-if="memberCardIsOpen">
        <div class="pointer-block"></div>
        <img class="member-avatar" :src="avatarUrl" />
        <p class="member-name">{{ member.name }}</p>
        <p class="detail-line" v-if="member.commonCredit">{{ member.commonCredit }}</p>
      </div>
    </transition>
  </span>
</template>

<script>
import RoutingHelper from "helpers/routing";

const types = ['profile', 'artist'];

export default {
  name: 'member-circle',
  data() {
    return {
      memberCardIsOpen: false,
    };
  },
  props: {
    member: {
      required: true,
    },
    type: {
      type: String,
      required: true,
      validator: value => types.includes(value)
    }
  },
  computed: {
    artistDetails() {
      return this.$store.getters['artist/artistDetails'];
    },
    avatarUrl() {
      return this.member.avatarUrl || '/images/default-avatars/profile_default.svg';
    },
    memberRoute() {
      return RoutingHelper.getItemPageRoute(this.type, this.member.id, this.member.fullName);
    }
  }
};
</script>

<style lang="scss" scoped>
.member-img {
  display: flex;
  margin-left: -10px;

  img {
    object-fit: cover;
    border-radius: 50%;
    background: #1e1d1c;
  }
  .small-member-avatar {
    border: 2px solid #21201F;
    width: 28px;
    height: 28px;
    cursor: pointer;
  }
  .member-avatar {
    width: 70px;
    height: 70px;
    text-align: center;
  }
}
.member-link {
  display: inline-flex;
  text-decoration: none;;
}

.member-card {
  position: absolute;
  top: 100%;
  margin-top: 10px;
  margin-left: -10px;
  width: 140px;
  background: #21201f;
  box-shadow: 1px 6px 35px rgba(4, 3, 2, 0.45);
  border-radius: 8px;
  padding: 15px;
  text-align: center;
  z-index: 999;
}
.pointer-block {
  position: absolute;
  width: 10px;
  height: 10px;
  transform: rotate(45deg);
  -webkit-transform: rotate(45deg);
  background: #21201f;
  margin-top: -20px;
  margin-left: 5px;
}
.member-name {
  margin-top: 10px;
  font-weight: 500;
  font-size: 14px;
  line-height: 130%;
}
.detail-line {
  font-weight: normal;
  font-size: 11px;
  line-height: 120%;
  color: #595857;
}
</style>
