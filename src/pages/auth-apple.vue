<script>
export default {
  name: 'auth-apple',
  render: () => null,
  async serverPrefetch() {
    // This code is needed for case when apple login isn't performed via popup
    // Actually this code isn't used now, because we use "Login with Apple" via popup,
    // but let's keep it all fallback
    const { req } = this.$ssrContext;

    if (req.method !== 'POST') {
      throw { code: 400, message: 'Invalid method type' };
    }
    if (!req.body) {
      throw { code: 400, message: 'Request has no body' };
    }
    const token = req.body.id_token;
    if (!token) {
      throw { code: 400, message: 'id_token is required ' };
    }
  
    await this.$store.dispatch('auth/loginWithApple', { token });

    const { route } = this.$router.resolve({ name: 'home' });
    throw { code: 302, url: route.fullPath };
  }
}
</script>
