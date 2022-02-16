<template>
  <div class="song-square" :class="{ compact }">
    <div v-if="item.id" class="content">
      <div class="song-img pointer" @click="$router.push(songRoute)">
        <div class="img" :style="{backgroundImage: 'url('+ (item.avatarUrl || defaultImg) +')'}"></div>
        <div class="img-overlay">
          <div class="view" ref="button"></div>
        </div>
      </div>
      <div class="text-container">
        <div class="stitle">
          <router-link :to="songRoute" class="ellipsis">{{ item.title || '-' }}</router-link>
        </div>
        <div class="performer">
          <span class="ellipsis">{{ performer || '-' }}</span>
        </div>
      </div>
    </div>

    <div v-if="!item.id" class="content loading">
      <div class="song-img">
        <div></div>
      </div>
      <div class="performer loading"></div>
      <div class="stitle loading"></div>
    </div>
  </div>
</template>
<script>
import RoutingHelper, { songRoute } from 'helpers/routing';

export default {
  name: "song-square",
  props: {
    item: {
      required: true,
    },
    compact: {
      required: false,
      default: true,
    }
  },
  data() {
    return {
      defaultImg: '/images/default-avatars/project_default_square.png',
    };
  },
  computed: {
    songRoute() {
      return songRoute(this.item);
    },
    performer() {
      return this.item.performer || this.item.primaryArtist;
    }
  },
  methods: {
    goTo: RoutingHelper.goToItemPage,
  },
};
</script>

<style lang="scss" scoped>
.song-square {
  color: #f2f2f2;
  max-width: 160px;
  width: 160px;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
}
.song-img {
  width: 160px;
  height: 160px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid #21201f;
  position: relative;
}
.song-img .img {
  width: 100%;
  height: 100%;
  background-size: cover;
  background-position: top center;
  background-color: #21201f;
}
.performer {
  height: 20px;
  color: #8f8f8f;

  & span {
    float: left;
    width: 130px;
  }
}
.stitle {
  margin-top: 5px;
  height: 25px;
  font-weight: 500;
  position: relative;
  & a {
    width: 100%;
  }
}

.text-container {
  margin-top: 10px;
  max-width: 160px;
}
.loading {
  & .performer,
  & .stitle {
    opacity: 0.8;
    border-radius: 2px;
    background-color: #21201f;
  }
  & .performer {
    width: 110px;
    height: 10px;
    margin: 15px 0px 10px 0px;
  }
  & .stitle {
    width: 50px;
    height: 10px;
  }
}
.img-overlay {
  height: 100%;
  width: 100%;
  display: flex;
  z-index: 51;
  visibility: hidden;
  position: absolute;
  align-items: center;
  justify-content: center;
  background-color: rgba(4, 3, 2, 0.7);
}
.song-img:hover .img-overlay {
  visibility: visible;
}
.view {
  width: 30px;
  height: 30px;
  background-image: url(images/icons/show.svg);
}


/* For tablet screens */
@media (min-width: 768px) and (max-width: 1280px) {
  .song-square {
    max-width: 130px;
    width: 130px;
  }
  .song-img {
    width: 130px;
    height: 130px;
  }
  .performer,
  .stitle {
    width: 100%;
  }
  .performer span {
    width: 90px;
  }
  .text-container {
    max-width: 130px;
  }
}

/* For mobile screens */
@media screen and (max-width: 768px) {
  .song-square {
    max-width: 130px;
    width: 130px;
    position: relative;
  }
  .song-img {
    width: 130px;
    height: 130px;
  }
  .text-container {
    max-width: 130px;
  }
  .compact {
    .song-square {
      width: 100%;
      min-width: 100%;
      max-width: 100%;
    }
    .song-img {
      width: 44px;
      height: 44px;
      min-width: 44px;
      flex: 0;
      margin-right: 15px;
    }
    .content {
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: flex-start;
      padding: 5px 10px 5px 5px;
    }
    .text-container {
      max-width: none;
      margin-top: 0px;
      text-align: left;
    }
    .text-container > div {
      width: 100%;
    }
    .performer span {
      width: 100%;
    }
  }
}
</style>