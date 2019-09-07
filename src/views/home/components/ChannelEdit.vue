<template>
  <div>
    <van-popup :value='value' @input="$emit('input',$event)" closeable position="bottom" :style="{ height: '90%' }" />
  </div>
</template>

<script>
export default {
  props: {
    value: {
      require: true,
      type: Boolean
    }
  },
  data () {
    return {
      show: false
    }
  }
}
</script>

<style>
</style>
