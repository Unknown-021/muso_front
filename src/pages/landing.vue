<template>
  <div>
    <landing-hero />
    <div class="container">
      <new-releases
        :topAlbums="topAlbums"
        :topArtists="topArtists"
        :topProfiles="topProfiles"
        :loading="loadingNewReleaseData"
      />
    </div>
    <div class="download-muso">
      <div class="container">
        <div class="download-muso-text">
          <img class="album-art lazyload" data-src="images/album-art-1.jpg" />
          <h1>Download The Muso.AI Mobile App</h1>
          <p>
            With over 100 million credits and tons of tracks, profiles, albums
            and artists. Muso.AI is here to bring you closer to the tracks and
            artists you listen to.
          </p>
          <div class="download">
            <a :href="seo.mobileAppUrl" target="_blank">
              Download Mobile App
            </a>
          </div>
        </div>
        <div class="download-muso-image">
          <img
            data-src="images/webflow/iphones-group.jpg"
            width="455"
            class="lazyload"
          />
        </div>
      </div>
    </div>
    <webflow-page />
  </div>
</template>

<script>
import SEO from "seo";
import LandingHero from "components/landing/landing-hero";
import NewReleases from "components/landing/new-releases";
import WebflowPage from "components/webflow/webflow-page";

export default {
  name: "LandingPage",
  metaInfo() {
    return {
      title: SEO.title,
      meta: [
        { name: "description", content: SEO.description },
        { property: "og:description", content: SEO.description },
        { property: "og:url", content: this.$root.origin },
        {
          property: "og:image",
          content: `${this.$root.origin}/${SEO.thumbnail}`,
        },
        { property: "al:ios:url", content: SEO.iosUrl },
        { property: "twitter:title", content: SEO.title },
        {
          property: "twitter:card",
          content: `${this.$root.origin}/${SEO.summaryImg}`,
        },
        { property: "twitter:description", content: SEO.description },
        {
          property: "twitter:image",
          content: `${this.$root.origin}/${SEO.thumbnail}`,
        },
      ],
    };
  },
  data() {
    return {
      loadingNewReleaseData: true,
    };
  },
  components: {
    LandingHero,
    NewReleases,
    WebflowPage,
  },
  mounted() {
    this.fetchData();
  },
  computed: {
    topAlbums() {
      return this.$store.getters["collection/top"];
    },
    topArtists() {
      return this.$store.getters["artist/top"];
    },
    topProfiles() {
      return this.$store.getters["profile/top"];
    },
    seo() {
      return SEO;
    },
  },
  methods: {
    async fetchData() {
      try {
        this.loadingNewReleaseData = true;
        await Promise.all([
          this.fetchTopAlbums(),
          this.fetchTopArtists(),
          this.fetchTopProfiles(),
        ]);
      } catch (error) {
        if (error) {
          if (error.code === 404) {
            this.$router.replace({ name: "not-found" });
          } else if (!this.$isServer) {
            this.$notify("Something went wrong. Please, try later", "error");
          }
        }
        throw error;
      } finally {
        this.loadingNewReleaseData = false;
      }
    },
    async fetchTopAlbums() {
      return this.$store.dispatch("collection/getTop");
    },
    async fetchTopArtists() {
      return this.$store.dispatch("artist/getTop");
    },
    async fetchTopProfiles() {
      return this.$store.dispatch("profile/getTop");
    },
  },
};
</script>

<style lang="scss" scoped>
.container {
  width: 100%;
  max-width: 1240px;
  margin: 0 auto;
  padding-left: 30px;
  padding-right: 30px;
  position: relative;
}
.download-muso {
  min-height: 810px;
  background: rgba(39, 38, 37, 0.7);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 25px 0;
  & .container {
    display: flex;
    align-items: center;
    @media screen and (max-width: 768px) {
      flex-direction: column;
      justify-content: center;
      align-content: center;
    }
  }
}
.download-muso-text {
  position: relative;
  width: 100%;
  & h1 {
    max-width: 600px;
    font-weight: bold;
    font-size: 60px;
    line-height: 110%;
    margin-bottom: 30px;
    @media screen and (max-width: 1279px) {
      font-size: 40px;
    }
  }
  & p {
    max-width: 450px;
    margin-bottom: 30px;
  }
  & .album-art {
    top: -170px;
    width: 160px;
    position: absolute;
    z-index: 1;
  }
}
.download {
  display: inline-block;
  align-items: center;
  text-align: center;
  padding: 8px 26px;
  border: 2px solid #6be7c8;
  -webkit-transition: all 300ms ease;
  transition: all 300ms ease;
  color: #6be7c8;
  font-family: Inter;
  font-style: normal;
  font-weight: 600;
  font-size: 12px;
  line-height: 24px;
  letter-spacing: 3px;
  text-transform: uppercase;
  cursor: pointer;
  &:hover {
    border: 2px solid rgba(107, 231, 200, 0.6);
  }
  @media screen and (max-width: 768px) {
    display: none;
  }
}
.download a {
  display: block;
  &:hover {
    text-decoration: none;
  }
  &:active {
    color: rgba(107, 231, 200, 0.6);
  }
}

/* For tablet screens */
@media (min-width: 768px) and (max-width: 1279px) {
  .download-muso .container {
    padding-top: 100px;
    padding-bottom: 100px;
  }
  .download-muso-text {
    flex: 1;
    & .album-art {
      width: 122px;
      top: -130px;
    }
  }
  .download-muso-image {
    flex: 1;
    & img {
      max-width: 100%;
    }
  }
}

/* For mobile screens */
@media screen and (max-width: 768px) {
  .download-muso .container {
    padding-top: 200px;
  }
  .container {
    padding: 0 16px 16px 16px;
  }
  .download-muso-text {
    flex: 1;
    & .album-art {
      width: 153px;
      top: -160px;
      left: 103px;
    }
  }
  .download-muso-image {
    flex: 1;
    & img {
      max-width: 100%;
    }
  }
}
</style>

<style lang="scss">
img.lazyload:not([src]) {
  visibility: hidden;
}
</style>