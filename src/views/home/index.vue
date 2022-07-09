<template>
  <div class="home-container">
    <!-- 导航栏 -->
    <van-nav-bar class="page-nav-bar" fixed>
      <van-button
        class="search-btn"
        slot="title"
        type="info"
        size="small"
        round
        icon="search"
        >搜索</van-button
      >
    </van-nav-bar>
    <!-- /导航栏 -->
    <!--
      通过v-model绑定当前激活标签对应的索引值，默认情况下启用第一个标签
      通过animated属性可以开启切换标签内容时的转场动画
      通过swipeable属性可以开启滑动切换标签页
    -->
    <van-tabs class="channel-tabs" v-model="active" animated swipeable>
      <van-tab v-for="item in userChannels" :key="item.id" :title="item.name">
        <article-list :channel="item"></article-list>
      </van-tab>
      <template #nav-right>
        <div class="placeholder"></div>
        <div class="hamburger-btn" @click="show = true">
          <toutiao-icon icon="gengduo" />
        </div>
      </template>
    </van-tabs>
    <van-popup
      close-icon-position="top-left"
      closeable
      v-model="show"
      position="bottom"
      :style="{ height: '90%' }"
    >
      <!-- 传递channels -->
      <channel-edit
        @changeActive="changeActive"
        :active="active"
        :userChannels="userChannels"
      />
    </van-popup>
  </div>
</template>

<script>
import { getUserChannels } from "@/api/home";
import ArticleList from "./components/article-list.vue";
import ChannelEdit from "./components/channel-edit.vue";

export default {
  name: "HomeIndex",
  components: {
    ArticleList,
    ChannelEdit,
  },
  props: {},
  data() {
    return {
      show: false,
      active: 0,
      // 定义数据接收频道列表
      userChannels: [],
    };
  },
  computed: {},
  watch: {},
  created() {
    // 调用获取频道列表
    this.getUserChannels();
  },
  mounted() {},
  methods: {
    changeActive(index, q) {
      // console.log(index);
      this.active = index;
      console.log(this.active);
      //弹层关闭
      this.show = q;
    },
    // 定义加载频道列表数据的方法
    async getUserChannels() {
      const res = await getUserChannels();
      this.userChannels = res.data.data.channels;
    },
  },
};
</script>

<style scoped lang="less">
.home-container {
  padding-top: 174px;
  padding-bottom: 100px;
  /deep/.van-nav-bar__title {
    max-width: unset;
  }
  .search-btn {
    width: 555px;
    height: 64px;
    background-color: #5babfb;
    border: none;
    font-size: 28px;
    .van-icon {
      font-size: 32px;
    }
  }
  /deep/ .channel-tabs {
    .van-tabs__wrap {
      position: fixed;
      top: 92px;
      z-index: 1;
      left: 0;
      right: 0;
      height: 82px;
    }
    .van-tab {
      border-right: 1px solid #edeff3;
      min-width: 200px;
      height: 80px;
      .van-tab__text {
        font-size: 27px;
        color: #777777;
      }
    }
    .van-tab--active .van-tab__text {
      color: #333 !important;
    }
    .van-tabs__line {
      width: 31px !important;
      height: 6px;
      background: rgba(50, 150, 250, 1);
      border-radius: 3px;
      bottom: 8px;
    }
    .van-tabs__nav {
      padding: 0;
    }

    .placeholder {
      flex-shrink: 0;
      width: 66px;
      height: 82px;
    }

    .hamburger-btn {
      position: fixed;
      right: 0;
      display: flex;
      justify-content: center;
      align-items: center;
      width: 66px;
      height: 82px;
      background-color: #fff;
      opacity: 0.902;
      i.toutiao {
        font-size: 33px;
      }
    }
  }
}
</style>
