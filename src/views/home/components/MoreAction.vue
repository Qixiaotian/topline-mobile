<template>
 <!-- 弹层组件 不显示确认按钮 点击是否关闭遮罩层 -->
   <van-dialog
   :value= 'value'
   @input="$emit('input',$event)"
   :show-confirm-button='false'
   closeOnClickOverlay
   >
    <van-cell-group v-show="!showReports">
      <van-cell title="不感兴趣" icon="location-o"/>
      <van-cell title="反馈垃圾内容" icon="location-o" is-link @click="showReports=true"/>
      <van-cell title="拉黑作者" icon="location-o"/>
    </van-cell-group>
    <!-- 举报文章 -->
    <van-cell-group v-show="showReports">
      <van-cell icon="arrow-left" @click="showReports=false"/>
      <van-cell title="标题夸张"/>
      <van-cell title="低俗色情"/>
      <van-cell title="错别字多"/>
    </van-cell-group>
   </van-dialog>
</template>

<script>
export default {
  name: 'MoreAction',
  props: {
    value: {
      type: Number,
      required: true
    }
  },
  data () {
    return {
      sha: true,
      showReports: false
    }
  }
}
</script>

<style>

</style>
