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
        <van-grid-item v-for="(channel,index) in channels" :key="channel.id"  @click="MychannelItem(index,channel.id)">
            <!-- 因为在组建内部无法进行样式转化，所以引用插槽对其样式进行改变 -->
       <div slot="text" class="van-grid-item__text" :class="{ active: active === index }" >
           <!--  当所传递过来的索引与其相对应的相等的时候就显示这个样式 -->
          {{ channel.name }}
        </div>
          <van-icon slot="icon" class="close-icon" v-show="isEdit && index!==0" name="close"  />
        </van-grid-item>
      </van-grid>
      <!-- 推荐频道 -->
      <van-cell title="推荐频道" label="点击添加频道" />
      <van-grid>
        <van-grid-item v-for="(item,index) in recommendChannels" :key="index" :text="item.name"  @click="handleChannelItem(item)"/>
      </van-grid>
    </van-popup>
  </div>
</template>

<script>
import { getAllChannels, deleteChannels, addChannel } from '@/api/channel'
import { mapState } from 'vuex'
import { setItem } from '@/utils/localStorage'
export default {
  props: {
    value: {
      require: true,
      type: Boolean
    },
    // 接受频道的列表
    channels: {
      require: true,
      type: Array
    },
    // 接受父组件传过来的索引值
    active: {
      require: true,
      type: Number
    }
  },
  data () {
    return {
      show: false,
      isEdit: false,
      AllChannelList: []
    }
  },
  methods: {
    // 发送请求对全部列表进行渲染
    async AllChannels () {
      try {
        let data = await getAllChannels()
        this.AllChannelList = data.channels
      } catch (err) {
        console.log(err)
      }
    //   console.log(data)
    },
    async MychannelItem (index, channelId) {
      // 非编辑模式
      if (!this.isEdit) {
        this.$emit('changeIndex', index)
        // eslint-disable-next-line no-useless-return
        return
      }
      // 编辑模式
      this.channels.splice(index, 1)
      if (this.user) {
      // 如果用户编辑模式那么发送请求对其数据进行删除
        try {
          await deleteChannels(channelId)
        } catch (err) {
          this.$toast.fail('操作失败')
        }
        // eslint-disable-next-line no-useless-return
        return
      }
      // 最后将其频道的数据保存到本地存储
      setItem('channels', this.channels)
    },
    async handleChannelItem (channel) {
      this.$set(channel, 'timestamp', null)
      this.$set(channel, 'articles', [])
      this.$set(channel, 'loading', false)
      this.$set(channel, 'finished', false)
      this.$set(channel, 'pullLoading', false)
      // 1.把item添加到我的频道里面
      this.channels.push(channel)
      // 2. 如果用户登录的话就进行发送请求
      if (this.user) {
        try {
          await addChannel(channel.id, this.channels.length)
        } catch (err) {
          this.$toast.fail('操作失败')
        }
        //  return
      }
      // 如果没有登录,把我的频道存储到本地存储中
      setItem('channels', this.channels)
    }
  },
  created () {
    this.AllChannels()
  },
  computed: {
    ...mapState(['user']),
    // eslint-disable-next-line vue/return-in-computed-property
    recommendChannels () {
      const ids = this.channels.map((channel) => {
        return channel.id
      })
      // 如果我的列表的id包含于所有的列表的id，那么不要与其相同发的id将其并不重复的数组进行返回
      return this.AllChannelList.filter((channel) => {
        return !ids.includes(channel.id)
      })
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
  .active{
 color: red
  }
</style>
