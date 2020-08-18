<template>
  <div>
    <div class="topbar bg-dark">
      <div class="logo pt-3 pb-2 mx-4 ai-center d-flex">
        <div class="logo_icon mr-3">
          <img src="../assets/logo.png" alt height="38px" />
        </div>
        <div class="logo_title flex-1">
          <h1 class="text-white pt-1 fs-xl">王者荣耀</h1>
          <p class="text-grey-1 mt-2 fs-xxs">团队成就更多</p>
        </div>
        <div id="mt">
          <button type="button" class="btn bg-primary py-2 px-3">立即下载</button>
        </div>
      </div>
    </div>
    <div class="bg-primary pb-2 pt-4">
      <div class="nav d-flex jc-around text-white fs-xl nav-inverse">
        <div class="nav-item active">
          <router-link tag="div" to="/" class="nav-link">首页</router-link>
        </div>
        <div class="nav-item">
          <router-link tag="div" to="/" class="nav-link">攻略中心</router-link>
        </div>
        <div class="nav-item">
          <router-link tag="div" to="/" class="nav-link">赛事中心</router-link>
        </div>
      </div>
    </div>
    <router-view></router-view>
  </div>
</template>
<script>
export default {};
</script>
<style>
#mt {
  margin-top: -0.9rem;
}
.topbar{
  position: sticky;
  top: 0;
  z-index: 999;
}
</style>