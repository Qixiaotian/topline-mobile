<template>
  <van-dialog
    :value="value"
    @input="$emit('input', $event)"
    :showConfirmButton="false"
    closeOnClickOverlay
  >
    <van-cell-group>
      <van-cell title="从相册选择图片" @click="handleSelectFile" />
      <!-- 添加一个上传文件的input文本框,隐藏 -->
      <input type="file" ref="file" style="display:none">
      <van-cell title="拍照" />
      <van-cell title="取消" @click="$emit('input', false)" />
    </van-cell-group>
  </van-dialog>
</template>

<script>
import Vue from 'vue'
// 使用vant的预览方法
import { ImagePreview } from 'vant'
Vue.use(ImagePreview)
export default {
  name: 'UploadFile',
  props: ['value'],
  methods: {
    // 通过点击方法 触发点击文件的上传事件
    handleSelectFile () {
      this.$refs.file.click()
      // 如果没有上传文件将会返回
      this.$refs.file.onchange = (e) => {
        if (e.target.files.length === 0) {
          return
        }
        // 找到图片内存中找到可以访问的临时地址
        const url = URL.createObjectURL(e.target.files[0])
        //  将通知父组件进行关闭弹框
        this.$emit('input', false)
        // 图片预览
        ImagePreview({
          images: [
            url
          ],
          showIndex: false,
          onClose () {

          }
        })
      }
    }
  }
}
</script>

<style lang="less" scoped>
.van-cell__title {
  text-align: center;
}
</style>
