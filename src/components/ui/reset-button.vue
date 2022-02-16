<template>
  <!-- We have to insert image in base64, because this search can be used as standalone component. We have it on marketing website -->
  <button type="reset" class="reset-btn" v-on="$listeners">
    <img width="8" src="data:image/svg+xml,%3Csvg viewBox='0 0 8 8' fill='%23F7F7F7' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath fill-rule='evenodd' clip-rule='evenodd' d='M4.047 3.27L.912.136.205.843 3.34 3.978.183 7.135l.707.707 3.157-3.157 3.158 3.158.707-.708-3.158-3.157L7.88.854 7.17.147 4.047 3.27z' /%3E%3C/svg%3E" alt="Reset icon" />
  </button>
</template>

<script>
export default {
  name: 'reset-button'
}
</script>

<style lang="scss">
.reset-btn {
  right: 0;
  left: auto;
  padding: 4px;
  width: 16px;
  height: 16px;
  border-radius: 2px;
  opacity: 0;
  pointer-events: none;
  transition: opacity 120ms ease-in-out;
  background-color: var(--overlay-4-color);
}
</style>