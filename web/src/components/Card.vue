<template>
  <div>
    <div class="card mt-3 bg-white pt-4 pr-4 pl-4 pb-2">
      <div class="card-header d-flex mb-4"
      :class="{'border-bottom':!plain,'pb-4':!plain}">
        <i class="iconfont fw-700" :class="`${icon}`"></i>
        <h3 :class="{'fw-700':plain}"
        class="fw-500 fs-xxl flex-1 ml-2 ">{{title}}</h3>
        <i class="iconfont icon-moreread" v-if="!plain"></i>
      </div>
      <div class="card-body">
          <!-- 插槽 -->
        <slot></slot>
      </div>
    </div>
  </div>
</template>
<script>
export default {
    props:{
        title:{type:String,required:true},
        icon:{type:String,required:true},
        plain:{type:Boolean},
    }
}
</script>

<style lang="scss">
    @import '../assets/scss/_variables.scss';
    .card{
        border-bottom: 1px solid map-get($map: $colors, $key: "light-1");
    }
</style>