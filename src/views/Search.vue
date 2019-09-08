<template>
  <div>
    <!-- 搜索框 -->
    <van-search
      v-model="value"
      placeholder="请输入搜索关键词"
      show-action
      @search="onSearch(value)"
      @cancel="onCancel"
      @input="handleInput"
      background="#3e9df8"
    />
    <!-- 搜索提示 -->
    <van-cell-group v-show="value">
      <van-cell
        v-for="item in suggestionList"
        :key="item"
        icon="search"
        @click="onSearch(item)"
      >
      <div slot="title" v-html="heightlight(item)"></div>
      </van-cell>
    </van-cell-group>

    <!-- 历史记录 -->
    <van-cell-group v-show="!value">
      <van-cell title="历史记录">
        <!-- 自定义右侧内容 -->
        <div v-show="isEdit" style="display: inline-block">
          <span>全部删除</span>&nbsp;
          <span @click="isEdit=false">完成</span>&nbsp;
        </div>
        <van-icon @click="isEdit=true" name="delete" size="18px" v-show="!isEdit" />
      </van-cell>
      <van-cell v-for="(item,index) in histories" :key="item" :title="item" @click="onSearch(item)">
        <!-- 自定义右侧内容 -->
        <van-icon v-show="isEdit" @click="handleDelete(index)" name="close" size="18px" />
      </van-cell>
    </van-cell-group>
  </div>
</template>

<script>
import _ from 'lodash'
import { getSuggestion } from '@/api/search'
import { mapState } from 'vuex'
import * as storageTools from '@/utils/localStorage'
export default {
  name: 'Search',
  data () {
    return {
      // 搜索框的值
      value: '',
      // 搜素的内容
      suggestionList: [],
      isEdit: false,
      // 历史记录
      histories: []
    }
  },
  computed: {
    // 引入辅助函数
    ...mapState(['user'])
  },
  created () {
    if (this.user) {
      return
    }
    // 先在本地存储中获取信息
    this.histories = storageTools.getItem('history') || []
  },
  methods: {
    // 设置搜索建议中的匹配内容
    heightlight (item) {
      const reg = new RegExp(this.value, 'gi')
      return item.replace(reg, `<span style="color:red">${this.value}</span>`)
    },
    onSearch (item) {
      // 跳转到搜索结果的页面，将值传过去
      this.$router.push({
        name: 'search-result',
        params: {
          q: item
        }
      })
      // 判断如果搜索历史里面有你输入过的值将返回不执行
      if (this.histories.includes(item)) {
        // this.histories = set
        // this.histories.unshift(set)
        return
      }
      // 没有的话就把这条信息放入历史信息的数组中
      this.histories.unshift(item)
      // var set = new Set(this.histories)
      // 用户登录的状态下进行发送请求
      if (this.user) {
        return
      }
      // 把历史记录信息保存到本地存储中
      storageTools.setItem('history', this.histories)
    },
    onCancel () {},
    // 对历史信息进行删除
    handleDelete (index) {
      this.histories.splice(index, 1)
      // 再讲其索引保存到本地存储中去
      storageTools.setItem('history', this.histories)
    },
    handleInput: _.debounce(async function () {
      if (!this.value) {
        return
      }
      try {
        //  发送请求获取搜索的信息
        const data = await getSuggestion(this.value)
        this.suggestionList = data.options
      } catch (err) {
        console.log(err)
      }
    }, 300)

  }
}
</script>

<style>
</style>
