<template>
  <div>
    <van-popup v-model="show" closeable position="bottom" :style="{ height: '90%' }" />
  </div>
</template>

<script>
export default {
  data () {
    return {
      show: false
    }
  }
}
</script>

<style>
</style>
