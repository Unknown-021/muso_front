<template>
  <img
    v-if="logoData"
    :src="logoData.src"
    :srcset="logoData.srcset"
    :alt="alt"
    v-bind="$attrs"
  />
</template>

<script>
import { prepareImages, imagesMap } from 'helpers/image';

const images = [
  {
    name: 'spotify',
    label: 'Spotify',
  },
  {
    name: 'soundcloud',
    label: 'SoundClould',
  },
  {
    name: 'youtube',
    label: 'YouTube',
  },
  {
    name: 'shazam',
    label: 'Shazam',
  },
  {
    name: 'tiktok',
    label: 'TikTok',
  },
  {
    name: 'deezer',
    label: 'Deezer',
  },
  {
    name: 'apple-music',
    label: 'Apple Music',
  },
  {
    name: 'amazon-music',
    label: 'Amazon Music',
  },
  {
    name: 'tidal',
    label: 'Tidal',
  },
  {
    name: 'beatport',
    label: 'Beatport',
  },
  {
    name: 'itunes',
    label: 'iTunes'
  }
];

const iconsDataMap = imagesMap(prepareImages({
  images,
  path: '/images/logos-round/',
  sizes: [
    { resolution: '', size: '' },
    { resolution: '@2x', size: '50w' },
    { resolution: '@3x', size: '75w' }
  ]
}));

export default {
  name: 'base-logo-round',
  props: {
    name: {
      type: String,
      required: true,
      validator: value => (value in iconsDataMap)
    }
  },
  computed: {
    logoData() {
      return iconsDataMap[this.name];
    },
    alt() {
      return `${this.logoData.label} logo`;
    }
  }
}
</script>