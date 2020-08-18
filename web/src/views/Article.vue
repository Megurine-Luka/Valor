<template>
  <div class="page-article" v-if="model">
    <div class="d-flex py-3 px-2 ai-center header">
      <button class="btn px-2" @click="prev">
        <i class="iconfont icon-back iconback text-blue fw-700 mr-2"></i>
      </button>
      <h2 class="fs-xl text-blue flex-1">{{model.title}}</h2>
      <div class="text-grey fs-sm">2020-08-11</div>
    </div>
    <div v-html="model.body" class="body py-3 fs-xl px-4"></div>
    <div class="d-flex ai-center ml-4 mb-4">
      <i class="iconfont icon-lianjie lianjie mr-2"></i>
      <h2 class="text-blue">相关资讯</h2>
    </div>
    <router-link tag="div" 
    v-for="item in model.related" 
    :key="item.id" 
    :to="`/article/${item._id}`">
      <div class="d-flex ml-4 fs-xl my-3 ">
        <div class="flex-1">{{item.title}}</div>
        <div class="text-grey">{{item.createdAt|date}}</div>
      </div>
    </router-link>
  </div>
</template>

<script>
import dayjs from 'dayjs'
export default {
  filters:{
    date(val){
      return dayjs(val).format("MM-DD")
    }
  },
  props: {
    id: { required: true },
  },
  data() {
    return {
      model: null,
    };
  },
  watch: {
    id: "fetch",
  },
  methods: {
    async fetch() {
      const res = await this.$http.get(`article/${this.id}`);
      this.model = res.data;
    },
    prev() {
      this.$router.push('/');
    },
  },
  created() {
    this.fetch();
  },
};
</script>

<style lang="scss">
.iconback {
  font-size: 20px;
}
.page-article {
  .lianjie {
    font-size: 30px;
    color: #535353;
  }
}

.page-article {
  .body {
    p,
    strong {
      margin-bottom: 0.9rem;
    }
    img {
      max-width: 100%;
      height: auto;
      text-align: center;
    }
  }
}
.header {
  border-bottom: 2px solid #d4d9de;
}
</style>