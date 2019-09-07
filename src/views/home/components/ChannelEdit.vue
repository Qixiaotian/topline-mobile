<template>
  <div>
    <van-popup
      :value="value"
      @input="$emit('input',$event)"
      closeable
      position="bottom"
      :style="{ height: '90%' }"
    >
      <!-- 我的频道 -->
      <van-cell icon="cross" @click="$emit('input', false)" />
      <van-cell title="我的频道" label="点击进入频道" v-show="!isEdit">
        <van-button round type="danger" size="mini" @click="isEdit=true">编辑</van-button>
      </van-cell>
      <van-cell title="我的频道" label="点击进入频道" v-show="isEdit">
        <van-button round type="danger" size="mini" @click="isEdit=false">完成</van-button>
      </van-cell>
      <van-grid>
        <van-grid-item v-for="channel in channels" :key="channel.id" :text="channel.name">
          <van-icon slot="icon" class="close-icon" v-show="isEdit" name="close" />
        </van-grid-item>
      </van-grid>
      <!-- 推荐频道 -->
      <van-cell title="推荐频道" label="点击添加频道" />
      <van-grid>
        <van-grid-item v-for="value in 8" :key="value" text="文字" />
      </van-grid>
    </van-popup>
  </div>
</template>

<script>
export default {
  props: {
    value: {
      require: true,
      type: Boolean
    },
    channels: {
      require: true,
      type: Array
    }
  },
  data () {
    return {
      show: false,
      isEdit: false
    }
  }
}
</script>

<style lang="less" scoped>
  .close-icon {
    position: absolute;
    right: 0;
    top: 0;
  }
</style>
