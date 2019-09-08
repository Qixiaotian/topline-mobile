<template>
  <div>
  <!-- 头部结构 点击图标进行返回 -->
   <van-nav-bar
    title="搜索结果"
    left-text="返回"
    left-arrow
    @click-left="$router.back()"
   />
    这是啥呀
   {{q}}
  </div>
</template>

<script>
export default {
  name: 'SearchResult',
  props: ['q']
}
</script>

<style>

</style>
