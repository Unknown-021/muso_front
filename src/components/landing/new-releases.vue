<template>
  <transition name="fade-fast" mode="out-in">
    <new-releases-skeleton v-if="loading" />
    <div class="new-releases" v-else>
      <div class="content">
        <div class="title d-flex d-md-none">
          <h2>Rising Profiles</h2>
        </div>
        <div class="top-artists-container no-scrollbar d-flex d-md-none">
          <profile-round
            v-for="artist in topTenProfiles"
            :key="artist.id"
            :item="artist"
            class="top-artist"
          />
        </div>
        <div class="title">
          <h2>New Releases</h2>
        </div>
        <div class="new-releases-container d-none d-xl-flex">
          <collection-square
            v-for="album in topEightAlbums"
            :key="album.id"
            :item="album"
            class="new-release"
          />
        </div>
        <div class="new-releases-container no-scrollbar d-flex d-xl-none">
          <collection-square
            v-for="album in topSixAlbums"
            :key="album.id"
            :item="album"
            class="new-release"
          />
        </div>
        <div class="title">
          <h2>Top Artists</h2>
        </div>
        <div class="top-artists-container no-scrollbar d-none d-xl-flex">
          <profile-round
            v-for="artist in topFiveArtists"
            :key="artist.id"
            :item="artist"
            class="top-artist"
          />
        </div>
        <div
          class="top-artists-container no-scrollbar d-none d-md-flex d-xl-none"
        >
          <profile-round
            class="top-artist"
            v-for="artist in topFourArtists"
            :key="artist.id"
            :item="artist"
          />
        </div>
        <div class="top-artists-container no-scrollbar d-flex d-md-none">
          <profile-round
            class="top-artist"
            v-for="artist in topTenArtists"
            :key="artist.id"
            :item="artist"
          />
        </div>
      </div>
      <div class="top-profiles d-none d-md-block">
        <div class="title">
          <h2>Rising Profiles</h2>
        </div>
        <div class="profiles-container no-scrollbar">
          <template v-for="profile in limitedTopProfiles">
            <profile-list-item :key="profile.id" :item="profile" />
          </template>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import ProfileListItem from "components/ui/profile/list-item";
import ProfileRound from "components/ui/profile/round";
import CollectionSquare from "components/ui/collection/square";
import NewReleasesSkeleton from "components/landing/new-releases-skeleton";

export default {
  name: "NewReleases",
  components: {
    ProfileListItem,
    ProfileRound,
    CollectionSquare,
    NewReleasesSkeleton,
  },
  props: {
    topAlbums: {
      type: Array,
      required: true,
    },
    topArtists: {
      type: Array,
      required: true,
    },
    topProfiles: {
      type: Array,
      required: true,
    },
    loading: {
      type: Boolean,
      required: true,
      default: true,
    },
  },
  data() {
    return {
      windowWidth: process.browser ? window.innerWidth : undefined,
      numberOfNewReleases: 8,
      newReleases: this.topArtists.slice(0, 8),
    };
  },
  watch: {
    windowWidth(newWidth) {
      switch (newWidth) {
        case newWidth >= 1280:
          this.numberOfNewReleases = 8;
          break;
        case newWidth >= 768:
          this.newReleases = this.topArtists.slice(0, 6);
          break;
        default:
          this.numberOfNewReleases = 8;
          break;
      }
    },
  },
  mounted() {
    this.$nextTick(() => {
      if (process.browser) {
        window.addEventListener("resize", this.onResize);
      }
    });
  },
  beforeDestroy() {
    if (process.browser) {
      window.removeEventListener("resize", this.onResize);
    }
  },
  methods: {
    onResize() {
      if (process.browser) {
        this.windowWidth = window.innerWidth;
      }
    },
  },
  computed: {
    topEightAlbums() {
      if (this.topAlbums.length >= 8) {
        return this.topAlbums.slice(0, 8);
      }
      return this.topAlbums;
    },
    topSixAlbums() {
      if (this.topAlbums.length >= 8) {
        return this.topAlbums.slice(0, 6);
      }
      return this.topAlbums;
    },
    topFiveArtists() {
      if (this.topArtists.length >= 5) {
        return this.topArtists.slice(0, 5);
      }
      return this.topArtists;
    },
    topFourArtists() {
      if (this.topArtists.length >= 4) {
        return this.topArtists.slice(0, 4);
      }
      return this.topArtists;
    },
    topTenArtists() {
      if (this.topArtists.length >= 10) {
        return this.topArtists.slice(0, 10);
      }
      return this.topArtists;
    },
    topTenProfiles() {
      if (this.topProfiles.length >= 10) {
        return this.topProfiles.slice(0, 10);
      }
      return this.topProfiles;
    },
    limitedTopProfiles() {
      const limit = 17;
      if (this.topProfiles.length >= limit) {
        return this.topProfiles.slice(0, limit);
      }
      return this.topProfiles;
    },
  }
};
</script>

<style lang="scss" scoped>
.new-releases {
  display: flex;
  width: 100%;
  margin-bottom: 50px;
}
.content {
  flex: 1;
  overflow: hidden;
  margin-right: 70px;
}
.top-profiles {
  width: 300px;
  max-width: 300px;
  min-width: 300px;
}
.title {
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
  & h2 {
    font-weight: 500;
    font-size: 20px;
    line-height: 130%;
  }
}
.new-releases-container {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
}
.new-release {
  min-width: 0;
  max-width: none;
  width: 0;
  flex-basis: 25%;
  padding-right: 10px;
  margin-bottom: 40px;
  & .content {
    width: 100%;
    &:after {
      content: "";
      display: block;
      padding-bottom: 100%;
    }
  }
}
.album-details {
  max-width: 100%;
  & .album-title {
    font-weight: 500;
    font-size: 14px;
    line-height: 130%;
  }
  & .album-release-date {
    font-weight: normal;
    font-size: 14px;
    line-height: 120%;
    color: #554545;
  }
}
.top-profiles {
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  overflow: hidden;
  min-width: 0;
  position: relative;
  & .profile {
    padding: 5px;
    border-radius: 6px;
    width: 100%;
  }
  & .profiles-container {
    position: absolute;
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    overflow: hidden;
    top: 46px;
    bottom: 0;
    left: 0;
    right: 0;
    & .profile-item {
      padding: 5px;
      border-radius: 6px;
      &:hover {
        background-color: #222020;
      }
    }
  }
}
.top-artists-container {
  display: flex;
  & .top-artist {
    flex-shrink: 0;
    flex-basis: 100px;
    padding-right: 10px;
    width: 0;
    @media (min-width: 768px) {
      flex-basis: 110px;
    }
    @media (min-width: 1000px) {
      flex-basis: 150px;
    }
  }
}

/* For tablet screens */
@media (min-width: 768px) and (max-width: 1280px) {
  .new-release {
    width: 0;
    flex-basis: 33.3%;
  }
  .top-profiles {
    width: 225px;
    max-width: 225px;
    min-width: 225px;
  }
  .new-releases {
    padding-bottom: 200px;
  }
  .content {
    margin-right: 25px;
  }
}

@media screen and (max-width: 768px) {
  .new-releases-container {
    width: 100%;
    display: flex;
    flex-wrap: nowrap;
    margin-bottom: 30px;
    overflow-x: scroll;
  }
  .new-release {
    flex-shrink: 0;
    flex-basis: 160px;
    width: 0;
    margin-bottom: 0;
    padding-bottom: 0;
  }
  .top-artists-container {
    display: flex;
    flex-wrap: nowrap;
    overflow-x: scroll;
    margin-bottom: 30px;
  }
  .content {
    margin-right: 0;
  }
}
</style>