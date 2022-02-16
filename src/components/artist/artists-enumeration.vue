<template>
  <p class="artists-enum" v-if="artists.length">
    <slot />

    <template v-for="(artist, index) in artists">
      <template v-if="index !== 0">,</template>
      <component
        :is="artistItem.component"
        :key="artist.id"
        class="artists-enum__name"
        v-bind="artistItem.props(artist)"
      >{{ artist.name || artist.fullName }}</component>
      <!-- TODO: Ask backend developer to fix analytics routes, so we get "name" instead of "fullName" -->
    </template>

    <slot name="postfix" />
  </p>
</template>

<script>
import { artistRoute, profileRoute } from 'helpers/routing';

export default {
  name: 'artists-enumeration',
  props: {
    artists: {
      type: Array,
      /*
        [
          { id: 166172, fullName: 'AP' }
        ]
      */
      required: true
    },
    navigable: {
      type: Boolean,
      default: true
    },
    target: {
      type: String,
      default: undefined
    }
  },
  computed: {
    artistItem() {
      if (this.navigable) {
        return {
          component: 'router-link',
          props: artist => ({
            to: this.getRoute(artist),
            target: this.target
          })
        }
      } else {
        return {
          component: 'span',
          props: () => ({})
        }
      }
    }
  },
  methods: {
    getRoute(user) {
      return getUserRoute(user);
    }
  }
}

function getUserRoute(user) {
  const getRoute = user.type === 'PROFESSIONAL'
    ? profileRoute
    : artistRoute;

  return getRoute(user)
}
</script>

<style lang="scss">
.artists-enum {
  // We need this property to make text truncating work
  display: block;
  color: #8f8f8f;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  word-break: break-word;
  &__name {
    // We need this property to make text truncating work
    display: inline;
    color: var(--artist-link-color, #FFF);
  }
}
</style>
