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
        :title="item"
        icon="search"
        @click="onSearch(item)"
      />
    </van-cell-group>

    <!-- 历史记录 -->
    <van-cell-group v-show="!value">
      <van-cell title="历史记录">
        <!-- 自定义右侧内容 -->
        <div v-show="isEdit" style="display: inline-block">
        <!-- <div v-show="isEdit" style="display:inline-block "> -->
          <span>全部删除</span>&nbsp;
          <span @click="isEdit=false" >完成</span>&nbsp;
        </div>
          <van-icon @click="isEdit=true" name="delete" size="18px" v-show="!isEdit" />
      </van-cell>
      <van-cell  v-for="(item,index) in histories" :key="item" :title="item">
        <!-- 自定义右侧内容 -->
        <van-icon v-show="isEdit" @click="handleDelete(index)" name="close" size="18px" />
      </van-cell>
    </van-cell-group>
  </div>
</template>

<script>
import { getSuggestion } from '@/api/search'
import { mapState } from 'vuex'
import * as storageTools from '@/utils/localStorage'
export default {
  name: 'Search',
  data () {
    return {
      value: '',
      suggestionList: [],
      isEdit: false,
      histories: []
    }
  },
  computed: {
    ...mapState(['user'])
  },
  created () {
    if (this.user) {
      return
    }
    this.histories = storageTools.getItem('history') || []
  },
  methods: {
    onSearch (item) {
      if (this.histories.includes(item)) {
        // this.histories = set
        // this.histories.unshift(set)
        return
      }
      this.histories.unshift(item)
      // var set = new Set(this.histories)
      if (this.user) {
        return
      }
      storageTools.setItem('history', this.histories)
    },
    onCancel () {},
    handleDelete (index) {
      this.histories.splice(index, 1)
      storageTools.setItem('history', this.histories)
    },
    async handleInput () {
      if (!this.value) {
        return
      }
      try {
        const data = await getSuggestion(this.value)
        this.suggestionList = data.options
      } catch (err) {
        console.log(err)
      }
    }
  }
}
</script>

<style>
</style>
