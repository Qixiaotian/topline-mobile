<template>
 <!--  整体的列表 -->
  <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
      <!--  每一项 数据-->
    <van-cell v-for="item in list" :key="item" :title="item">
        <!-- 图片 -->
      <div slot="icon">
        <img class="avatar" src="http://toutiao.meiduo.site/Fn6-mrb5zLTZIRG3yH3jG8HrURdU" alt />
      </div>
      <!-- 文章的标题 -->
      <div slot="title">
        <span>只是为了好玩儿</span>
      </div>
      <!-- 默认插槽 -->
      <div slot="default">
        <van-button icon="like-o" size="mini" plain>赞</van-button>
      </div>
      <!-- 注释插槽 -->
      <div slot="label">
        <p>hello world</p>
        <p>
          <span>2019-7-17 14:08:20</span>

          <span>回复</span>
        </p>
      </div>
    </van-cell>
  </van-list>
</template>

<script>
export default {
  name: 'CommentList',
  data () {
    return {
      finished: false,
      loading: false,
      list: [1, 21, 3]
    }
  },
  methods: {
    onLoad () {

    }
  }
}
</script>

<style>
</style>
