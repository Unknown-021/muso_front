<template>
  <div 
    class="upload"
    :data-has-content="String(Boolean($slots.default))"
    :data-loading="isLoading"
  >
    <div class="upload__inner">
      <slot />
    </div>

    <loader class="upload__loader" v-if="isLoading" />
    <div v-else class="upload__controls">
      <input
        type="file"
        class="upload__input"
        aria-label="Upload image"
        @input="uploadFile"
        accept="image/*"
      />
      <camera-icon class="upload__icon" width="30" height="30" />
    </div>
  </div>
</template>

<script>
import Loader from 'components/ui/loader.vue';
import CameraIcon from 'assets/images/icons/camera.svg';

export default {
  name: 'base-upload',
  components: {
    Loader,
    CameraIcon
  },
  props: {
    upload: {
      type: Function,
      required: true
    }
  },
  data() {
    return {
      isLoading: false
    };
  },
  methods: {
    async uploadFile(event) {
      try {
        this.isLoading = true;
        await this.upload(event);
      } finally {
        this.isLoading = false;
      }
    }
  }
}
</script>

<style lang="scss">
.upload {
  position: relative;
  display: flex;
  cursor: pointer;
  &[data-loading] {
    pointer-events: none;
  }
  &[data-has-content=false] {
    border: 4px solid #21201F;
    border-radius: 1px;
  }
  &__inner {
    width: 100%;
    transition: opacity 150ms ease-in-out;
    @at-root .upload[data-loading] & {
      opacity: 0.2;
    }
  }
  &__loader {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    margin: auto;
    height: 39px;
    transform: scale(0.7);
  }
  &__input {
    position: absolute;
    width: 100%;
    height: 100%;
    z-index: 10;
    background-color: transparent;
    opacity: 0;
    cursor: pointer;
  }
  &__controls {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(4, 3, 2, 0.73);
    transition: opacity 150ms ease-in-out;
    @at-root {
      .upload[data-has-content=true] & {
        opacity: 0;
        &:hover {
          opacity: 1;
        }
      }
    }
  }
  &__icon {
    position: relative;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    margin: auto;
    transition: transform 120ms ease-in-out;
    @at-root .upload[data-has-content=false]:hover & {
      transform: scale(1.15);
    }
  }
}
</style>