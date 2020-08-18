<template>
  <div>
    <swiper :options="swiperOption" ref="mySwiper">
      <swiper-slide>
        <img src="../assets/images/6db1bc82007c5dacf854419fea538d3a.jpeg" alt class="w-100" />
      </swiper-slide>
      <swiper-slide>
        <img src="../assets/images/ea7197ee26c76ab5d14204d5ec231dc1.jpeg" alt class="w-100" />
      </swiper-slide>
      <swiper-slide>
        <img src="../assets/images/f801359d7c1d8b6fae518a99c59670ec.jpeg" alt class="w-100" />
      </swiper-slide>
      <div class="swiper-pagination pagination-home pr-3 pb-2" slot="pagination"></div>
    </swiper>
    <!-- end of swiper -->
    <div class="nav-icon bg-white mt-3 text-center pt-3">
      <div class="d-flex flex-wrap">
        <div class="nav-item mb-4" v-for="n in 12" :key="n">
          <i class="sprite sprite-coming"></i>
          <div class="text-dark fs-big pb-2 mt-1">爆料站</div>
        </div>
      </div>
      <div class="py-3 text-center bg-light">
        <i class="sprite sprite-entry"></i>
        <span class="fs-big ml-1">收起</span>
      </div>
    </div>
    <!-- end of nav -->
    <!-- 新闻资讯 -->
    <m-list-card icon="icon-cc-menu-circle" title="新闻资讯" :categories="newsCats">
      <template #items="{category}">
        <router-link
          tag="div"
          :to="`/article/${news._id}`"
          v-for="(news,i) in category.newsList"
          :key="i"
          class="py-3 fs-xxl d-flex ai-center"
        >
          <span
            class="mr-2"
            :class="news.categoryName==='新闻'?'tag-new':news.categoryName==='公告'?'tag-notice':news.categoryName==='活动'?'tag-event':'tag-match'"
          >{{news.categoryName}}</span>
          <span class="text-ellipsis flex-1 fs-xl">{{news.title}}</span>
          <span class="fs-big text-grey-1 ml-3">{{news.createdAt|date}}</span>
        </router-link>
      </template>
    </m-list-card>
    <!-- 英雄列表 -->
    <m-list-card icon="icon-card-hero" title="英雄列表" :categories="heroCats">
      <template #items="{category}">
        <div class="d-flex flex-wrap" style="margin:0 -0.5rem">
          <router-link
            tag="div" 
            v-for="(hero,i) in category.heroList"
            :key="i"
            :to="`/heroes/${hero._id}`"
            class="p-2 text-center"
            style="width:20%"
          >
            <img :src="hero.avatar" alt class="w-100" />
            <h3 class="fw-500 fs-big">{{hero.name}}</h3>
          </router-link>
        </div>
      </template>
    </m-list-card>
    <!-- 视频资讯 -->
    <m-card title="精彩视频" icon="icon-video">
      <!-- 视频内容 -->
      <div>这里有视频</div>
    </m-card>
  </div>
</template>

<script>
import dayjs from "dayjs";
export default {
  filters: {
    date(val) {
      return dayjs(val).format("MM/DD");
    },
  },
  name: "carrousel",
  data() {
    return {
      swiperOption: {
        speed: 500,
        autoplay: {
          disableOnInteraction: false,
        },
        pagination: {
          el: ".pagination-home",
          clickable: true,
        },
      },
      newsCats: [],
      heroCats: [],
    };
  },
  methods: {
    async fetchNewsCats() {
      const res = await this.$http.get("/news/list");
      this.newsCats = res.data;
    },
    async fetchHeroCats() {
      const res = await this.$http.get("/heroes/list");
      // console.log(res);
      this.heroCats = res.data;
    },
  },
  created() {
    this.fetchNewsCats();
    this.fetchHeroCats();
  },
};
</script>
<style lang="scss">
@import "../assets/scss/_variables.scss";

.pagination-home {
  text-align: right !important;
  .swiper-pagination-bullet {
    background-color: map-get($map: $colors, $key: "white");
    height: 0.8462rem;
    width: 0.8462rem;
    border-radius: 3px;
    opacity: 1;
    &.swiper-pagination-bullet-active {
      background-color: map-get($map: $colors, $key: "info");
    }
  }
}

.nav-icon {
  border-top: 1px solid map-get($map: $colors, $key: "light-1");
  border-bottom: 1px solid map-get($map: $colors, $key: "light-1");
  .nav-item {
    width: 25%;
    border-right: 1px solid map-get($map: $colors, $key: "light-1");
    &:nth-child(4n) {
      border-right: none;
    }
  }
}

.tag-new {
  border: 1px solid map-get($map: $colors, $key: "new");
  color: map-get($map: $colors, $key: "new");
  font-size: 13px;
  border-radius: 3px;
  padding: 1px;
}
.tag-notice {
  border: 1px solid map-get($map: $colors, $key: "notice");
  color: map-get($map: $colors, $key: "notice");
  font-size: 13px;
  border-radius: 3px;
  padding: 1px;
}
.tag-event {
  border: 1px solid map-get($map: $colors, $key: "event");
  color: map-get($map: $colors, $key: "event");
  font-size: 13px;
  border-radius: 3px;
  padding: 1px;
}
.tag-match {
  border: 1px solid map-get($map: $colors, $key: "match");
  color: map-get($map: $colors, $key: "match");
  font-size: 13px;
  border-radius: 3px;
  padding: 1px;
}
</style>