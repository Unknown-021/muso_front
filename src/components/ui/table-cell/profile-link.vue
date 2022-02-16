<script>
import ProBadge from 'components/ui/pro-badge.vue';
import { profileRoute } from 'helpers/routing';

export default {
  functional: true,
  props: {
    profile: {
      type: Object,
      required: true
    },
    verified: {
      type: Boolean,
      default: undefined
    },
    getRoute: {
      type: Function,
      default: profileRoute
    }
  },
  render(h, { props, data, children }) {
    const { profile } = props;
    const verified = props.verified === undefined
      ? profile.isVerified
      : props.verified;
    let icon = null;

    if (profile.isPro) {
      icon = <ProBadge class="collab-link-icon" />
    } else if (verified) {
      icon = <img class="collab-link-icon" src="/images/icons/verified.svg" width="12" height="14" />;
    }

    return (
      <div class="collab-link-wrap">
        <router-link class="ellipsis" to={props.getRoute(profile)} {...data}>
          {profile.name || profile.fullName}
        </router-link>
        {icon}
        {children}
      </div>
    );
  }
};
</script>

<style lang="scss">
.collab-link-wrap {
  display: flex;
  align-items: center;
}
.collab-link-icon {
  margin-left: 5px;
}
</style>