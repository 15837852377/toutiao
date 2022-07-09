<template>
  <div class="article-list">
    <!--
      List 列表组件：瀑布流滚动加载，用于展示长列表。

      List 组件通过 loading 和 finished 两个变量控制加载状态，
      当组件初始化或滚动到到底部时，会触发 load 事件并将 loading 自动设置成 true，此时可以发起异步操作并更新数据，
      数据更新完毕后，将 loading 设置成 false 即可。
      若数据已全部加载完毕，则直接将 finished 设置成 true 即可。

      - load 事件：
        + List 初始化后会触发一次 load 事件，用于加载第一屏的数据。
        + 如果一次请求加载的数据条数较少，导致列表内容无法铺满当前屏幕，List 会继续触发 load 事件，直到内容铺满屏幕或数据全部加载完成。

      - loading 属性：控制加载中的 loading 状态
        + 非加载中，loading 为 false，此时会根据列表滚动位置判断是否触发 load 事件（列表内容不足一屏幕时，会直接触发）
        + 加载中，loading 为 true，表示正在发送异步请求，此时不会触发 load 事件

      - finished 属性：控制加载结束的状态
        + 在每次请求完毕后，需要手动将 loading 设置为 false，表示本次加载结束
        + 所有数据加载结束，finished 为 true，此时不会触发 load 事件
    -->
    <van-pull-refresh
      :success-text="successText"
      v-model="refreshLoading"
      @refresh="onRefresh"
    >
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
        :error.sync="error"
        error-text="出错了，点击重新加载"
      >
        <!-- <van-cell
          v-for="(item, index) in list"
          :key="index"
          :title="item.title"
        /> -->
        <ArticleItem
          :article="item"
          v-for="(item, index) in list"
          :key="index"
        />
      </van-list>
    </van-pull-refresh>
  </div>
</template>

<script>
import { getArticles } from "@/api/article";
import ArticleItem from "@/components/article-item";
export default {
  name: "ArticleList",
  components: {
    ArticleItem,
  },
  props: {
    channel: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      list: [], // 存储列表数据的数组
      loading: false, // 控制加载中 loading 状态
      finished: false, // 控制数据加载结束的状态
      timestamp: null,
      error: false,
      refreshLoading: false,
      successText: "刷新成功",
    };
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {
    async onLoad() {
      // 当触发上拉加载更多的时候调用该函数
      try {
        const res = await getArticles({
          channel_id: this.channel.id,
          // 时间戳，请求新的推荐数据传当前的时间戳，请求历史推荐传指定的时间戳
          timestamp: this.timestamp || Date.now(),
          // 是否包含置顶，进入页面第一次请求时要包含置顶文章，1-包含置顶，0-不包含
          with_top: 1,
        });
        // 把数据添加到 list 数组中
        this.list = [...this.list, ...res.data.data.results];
        // 设置本次加载中 loading 状态结束
        this.loading = false;
        // 判断数据是否加载结束
        if (res.data.data.results.lenght === 0) {
          // 没有数据了，设置加载状态结束，不再触发上拉加载更多了
          this.finished = true;
        } else {
          // 更新获取下一页数据的时间戳
          this.timestamp = res.data.data.pre_timestamp;
        }
      } catch (e) {
        // 开启错误提示
        this.error = true;
        // 关闭 loading 效果
        this.loading = false;
      }
    },
    async onRefresh() {
      try {
        const res = await getArticles({
          channel_id: this.channel.id,
          timestamp: Date.now(),
          with_top: 1,
        });
        this.list = [...res.data.data.results, ...this.list];
        this.refreshLoading = false;
        this.successText = `更新了${res.data.data.results.length}条数据`;
      } catch (e) {
        this.refreshLoading = false; // 关闭下拉刷新的 loading 状态
        this.$toast.fail("刷新失败");
      }
    },
  },
};
</script>

<style scoped lang="less">
.artcile-list {
  height: 79vh;
  overflow: auto;
}
</style>
