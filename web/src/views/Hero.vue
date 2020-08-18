<template>
  <div class="page-hero" v-if="model">
    <!-- topbar  -->
    <div class="topbar bg-dark">
      <div class="logo pt-3 pb-2 mx-4 ai-center d-flex">
        <div class="logo_icon mr-3">
          <img src="../assets/logo.png" alt height="38px" />
        </div>
        <div class="logo_title flex-1">
          <h1 class="text-white pt-1 fs-xl fw-500">
            王者荣耀<i class="mx-3"></i>攻略站
          </h1>
        </div>
        <div>
          <router-link to="/" tag="div" class="text-white fs-lg">
            <span class="fw-500">更多英雄</span>
            <span class="ml-3">></span>
          </router-link>
        </div>
      </div>
    </div>
    <!-- end of topbar -->
    <div class="top" :style="{'background-image':`url(${model.banner})`}">
      <div class="text-white fw-500 fs-lg flex-column d-flex jc-end h-100 info p-4">
        <p>{{model.title}}</p>
        <p class="fs-xxl fw-700">{{model.name}}</p>
        <p>{{model.categories.map(v=>v.name).join('/')}}</p>
        <div class="d-flex jc-between ai-center">
          <div class="d-flex pt-1 ai-center scores" v-if="model.scores">
            <span>难度</span>
            <span class="bg-yellow-1 badge mr-3 ml-2">{{model.scores.difficult}}</span>
            <span>技能</span>
            <span class="bg-blue-1 badge mr-3 ml-2">{{model.scores.skills}}</span>
            <span>攻击</span>
            <span class="bg-red-1 badge mr-3 ml-2">{{model.scores.attack}}</span>
            <span>生存</span>
            <span class="bg-grey-2 badge mr-3 ml-2">{{model.scores.survive}}</span>
          </div>
          <router-link to="/" tag="span" class="text-grey fs-lg">皮肤 ：8 &gt;</router-link>
        </div>
      </div>
    </div>
    <!-- end of top  -->
    <div>
      <!-- 导航 -->
      <div class="bg-white px-3 pt-4">
        <div class="nav d-flex jc-around border-bottom fs-xl pb-2">
          <div class="nav-item" 
          v-for="(nav,i) in heronav" :key="i" 
          :class="{active: active===i}" 
          @click="$refs.navlist.swiper.slideTo(i)">
            <div class="nav-link">{{nav}}</div>
          </div>
          <!-- <div class="nav-item">
            <div class="nav-link">进阶攻略</div>
          </div> -->
        </div>
      </div>
      <swiper ref="navlist" 
      @slide-change="()=>active = $refs.navlist.swiper.realIndex">
        <swiper-slide>
          <div>
            <div class="px-3 bg-white pt-2 border-bottom">
              <!-- 英雄介绍 -->
              <div class="d-flex ">
                <router-link to="/" tag="button" class="btn flex-1 btn-lg">
                <i class="iconfont icon-Video"></i>英雄介绍视频
                </router-link>
                <router-link to="/" tag="button" class="btn flex-1 btn-lg ml-2">
                <i class="iconfont icon-image"></i>一图识英雄
                </router-link>
              </div>
              <!-- 技能介绍 -->
              <div class="skills">
                <div class="d-flex jc-around mt-5">
                  <img 
                  v-for="(item,i) in model.skills"
                  :key="i"
                  :src="item.icon" alt=""
                  class="icon"
                  :class="{active2:currentSkillIndex === i}"
                  @click="currentSkillIndex = i">
                </div>
                <!-- 技能描述 -->
                <div class="mt-4 pt-2 ">
                  <span class="fs-xxl fw-700">{{currentSkill.name}}</span>
                  <span class="text-grey-1 ml-5 fs-big">(冷却值：{{currentSkill.cd}} 消耗：{{currentSkill.cost}})</span>
                  <p class="mt-4 py-3 text-dark-1" style="font-size:1.26rem">{{currentSkill.description}}</p>
                </div>
              </div>
            </div>
            <!-- 加点建议 -->
            <m-card plain icon="icon-right-circle" title="加点建议">
              <div class="plus-osal panel">
                <div class="osal-box ml-2" v-if="model.skills" style="float:left">
                  <span class="fs-xxl ">主升</span>
                  <img :src="model.skills[2].icon" alt="" class="mt-3 mb-2">
                  <span v-if="model.skills" class="fs-sm">{{model.skills[2].name}}</span>
                </div>
                <div class="osal-box ml-5" v-if="model.skills" style="float:left">
                  <span class="fs-xxl">副升</span>
                  <img :src="model.skills[1].icon" alt="" class="mt-3 mb-2">
                  <span v-if="model.skills" class="fs-sm">{{model.skills[1].name}}</span>
                </div>
                  <span class="d-flex zhs fs-xxl">召唤师技能</span>
                <div class="osal-box d-flex ml-5"  style="float:left">
                  <div v-if="model.speSkills">
                    <img :src="model.speSkills[0].icon" alt="" class="mt-3 mb-2">
                    <span v-if="model.speSkills" class="fs-sm">{{model.speSkills[0].name}}</span>
                  </div>
                  <div class="ml-3" v-if="model.speSkills">
                    <img :src="model.speSkills[1].icon" alt="" class="mt-3 mb-2">
                    <span v-if="model.speSkills" class="fs-sm">{{model.speSkills[1].name}}</span>
                  </div>
                </div>
              </div>
            </m-card>
            <!-- 出装推荐 -->
            <m-card icon="icon-right-circle" title="出装推荐" plain class="heroitems border-bottom">
              <div>
                <p class="fs-xll mb-2">顺风出装</p>
                <div class="text-center d-flex jc-around border-bottom">
                  <div v-for="item in model.items1" :key="item.name">
                    <img :src="item.icon" alt="">
                    <div class="py-2">{{item.name}}</div>
                  </div>
                </div>
              </div>
              <div>
                <p class="fs-xll my-3">逆风出装</p>
                <div class="text-center d-flex jc-around">
                  <div v-for="item in model.items2" :key="item.name">
                    <img :src="item.icon" alt="">
                    <div class="pt-1">{{item.name}}</div>
                  </div>
                </div>
              </div>
            </m-card>
            <!-- 铭文推荐 -->
            <m-card icon="icon-right-circle" title="铭文推荐" plain></m-card>
            <!-- 使用技巧 -->
            <m-card icon="icon-right-circle" title="使用技巧" plain>
              <p class="fs-xl">{{model.usageTips}}</p>
            </m-card>
            <!-- 对抗技巧 -->
            <m-card icon="icon-right-circle" title="使用技巧" plain>
              <p class="fs-xl">{{model.battleTips}}</p>
            </m-card>
            <!-- 团战思路-->
            <m-card icon="icon-duoren" title="团战思路" plain>
              <p class="fs-xl">{{model.teamTips}}</p>
            </m-card>
            <!-- 英雄关系-->
            <m-card icon="icon-hyl-duoren" title="英雄关系" plain>
              <div class="border-bottom">
                <p class="fs-xll mb-3">最佳搭档</p>
                <div v-if="model.relationship" class="d-flex mb-4">
                    <img :src="model.relationship[0].hero.avatar" alt="" height="60px">
                    <p class="ml-3 fs-xl">{{model.relationship[0].description}}</p>
                </div>
                <div v-if="model.relationship" class="d-flex pt-1 pb-3">
                    <img :src="model.relationship[1].hero.avatar" alt="" height="60px">
                    <p class="ml-3 fs-xl">{{model.relationship[1].description}}</p>
                </div>
              </div>
              <div class="border-bottom">
                <p class="fs-xll mb-3 mt-2">被谁克制</p>
                <div v-if="model.relationship" class="d-flex mb-4">
                    <img :src="model.relationship[2].hero.avatar" alt="" height="60px">
                    <p class="ml-3 fs-xl">{{model.relationship[2].description}}</p>
                </div>
                <div v-if="model.relationship" class="d-flex pt-1 pb-3">
                    <img :src="model.relationship[3].hero.avatar" alt="" height="60px">
                    <p class="ml-3 fs-xl">{{model.relationship[3].description}}</p>
                </div>
              </div>
              <div class="">
                <p class="fs-xll mb-3 mt-2">克制谁</p>
                <div v-if="model.relationship" class="d-flex mb-4">
                    <img :src="model.relationship[4].hero.avatar" alt="" height="60px">
                    <p class="ml-3 fs-xl">{{model.relationship[4].description}}</p>
                </div>
                <div v-if="model.relationship" class="d-flex pt-1 pb-3">
                    <img :src="model.relationship[5].hero.avatar" alt="" height="60px">
                    <p class="ml-3 fs-xl">{{model.relationship[5].description}}</p>
                </div>
              </div>
            </m-card>
          </div>
        </swiper-slide>
        <swiper-slide>
          <div class="fs-xxl pt-5">这里假装有视频</div>
        </swiper-slide>
      </swiper>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    id: { required: true },
  },
  data() {
    return {
      model:null,
      heronav:['英雄初识','进阶攻略'],
      active:0,
      currentSkillIndex:0
    };
  },
  computed: {
    currentSkill(){
      return this.model.skills[this.currentSkillIndex]
    }
  },
  methods: {
    async fetch() {
      const res = await this.$http.get(`/heroes/${this.id}`);
      this.model = res.data;
    },
  },
  created() {
    this.fetch();
  },
};
</script>

<style lang="scss">
@import "../assets/scss/_variables.scss";
.page-hero {
  .top {
    height: 50vw;
    background: #fff no-repeat top center;
    background-size: auto 100%;
  }
  .info {
    background: linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 1));
  }
  .scores {
    .badge {
      display: inline-block;
      border-radius: 50%;
      height: 1.2rem;
      width: 1.2rem;
      text-align: center;
      font-size: 0.6rem;
      border: 1px solid rgba(255, 255, 255, 0.2);
      line-height: 1.2rem;
      text-align: center;
    }
  }
  .skills{
    img.icon{
      height: 82px;
      width: 82px;
      border: 3px solid map-get($map: $colors, $key: "white");
      border-radius: 45%;
      &.active2{
        border-color: map-get($map: $colors, $key: "primary");
      }
    }
  }
  .panel{
    height: 130px;
    .zhs{
      margin-left: 287px;
    }
    img{
      width: 76px;
      height: 76px;
      border-radius: 50%;
    }
    .osal-box{
      width: 85px;
      height: 150px;
      text-align: center;
      
    }
  }
    .heroitems{
      img{
        height: 59px;
        width: 59px;
        border-radius: 50%;
      }
    }
}
</style>
