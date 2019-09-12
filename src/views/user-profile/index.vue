<template>
  <div>
    <van-nav-bar
      title="个人信息"
      right-text="保存"
      left-arrow
      @click-left="$router.back()"
    />
      <!-- @click-right="btnSave" -->
    <van-cell-group>
      <van-cell title="头像" is-link>
        <div slot="default">
          <img width="30" height="30" :src="getProfileObj.photo" alt="">
        </div>
      </van-cell>
      <van-cell title="昵称" is-link :value="getProfileObj.name" />
    </van-cell-group>
    <van-cell-group>
      <van-cell title="性别" is-link :value="getProfileObj.gender?'女':'男'" />
      <van-cell title="生日" is-link :value="getProfileObj.birthday"/>
    </van-cell-group>
  </div>
</template>

<script>
import { getUserProfile } from '@/api/user'

export default {
  name: 'user-profile',
  data () {
    return {
      getProfileObj: {}
    }
  },
  methods: {
    async getProfile () {
      try {
        const data = await getUserProfile()
        this.getProfileObj = data
      } catch (err) {
        this.$toast.fail('获取信息失败')
      }
    }
  },
  created () {
    this.getProfile()
  }

}
</script>

<style>
</style>
