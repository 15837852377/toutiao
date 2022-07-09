<template>
  <div class="channel-edit">
    <van-cell style="text-align: center" title="编辑列表">
      <van-cell title="我的频道"> </van-cell>
      <template>
        <van-button
          @click="isEdit = !isEdit"
          class="edit-btn"
          plain
          round
          size="mini"
          type="danger"
          >{{ isEdit ? "完成" : "编辑" }}</van-button
        >
      </template>
    </van-cell>
    <van-grid :gutter="10">
      <van-grid-item
        class="channel-item"
        v-for="(value, index) in userChannels"
        :key="value.id"
        @click="onMyChannelClick(value, index)"
      >
        <template #icon v-if="isEdit & (index !== 0)">
          <van-icon name="clear" />
        </template>
        <template #text>
          <span :class="{ active: active === index }" class="text">{{
            value.name
          }}</span>
        </template>
      </van-grid-item>
    </van-grid>
    <van-cell title="推荐列表"> </van-cell>
    <van-grid direction="horizontal" :gutter="10">
      <van-grid-item
        v-for="item in recommendChannels"
        :key="item.id"
        icon="plus"
        @click="addChannel(item)"
      >
        <template #text>
          <span class="text">{{ item.name }}</span>
        </template>
      </van-grid-item>
    </van-grid>
  </div>
</template>

<script>
import { Notify } from "vant";
import { getAllChannels } from "@/api/home";
import _ from "lodash";
export default {
  name: "ChannelEdit",
  components: {},
  props: {
    userChannels: {
      type: Array,
      required: true,
    },
    active: {
      type: Number,
      required: true,
    },
  },
  data() {
    return {
      allChannels: [],
      isEdit: false,
    };
  },
  computed: {
    recommendChannels() {
      // return this.allChannels.filter((item) => {
      //   return !this.myChannels.some((userItem) => userItem.id === item.id);
      // });
      return _.differenceBy(this.allChannels, this.userChannels, "id");
    },
  },
  watch: {},
  created() {
    this.getAllChannels();
  },
  mounted() {},
  methods: {
    onMyChannelClick(channel, index) {
      console.log(channel, index);
      if (this.isEdit) {
        if (index === 0) return Notify({ type: "danger", message: "不让删除" });
        if (index <= this.actice) {
          // 如果index小于选中的框(active) 则让选项往前前进(active - 1) 并且保持弹窗开启
          this.$emit("changeActive", this.active - 1, true);
        }
        this.userChannels.splice(index, 1);
      } else {
        this.$emit("changeActive", index, false);
      }
    },
    addChannel(item) {
      this.userChannels.push(item);
    },
    async getAllChannels() {
      const res = await getAllChannels();
      console.log(res);
      this.allChannels = res.data.data.channels;
    },
  },
};
</script>

<style scoped lang="less">
.edit-btn {
  width: 100px;
}
/deep/.van-grid-item__content {
  background-color: #f4f5f6;
}
.text {
  font-size: 0.37333rem;
  color: #222;
  margin-top: 0;
}
.active {
  color: red;
}
/deep/.van-icon-plus {
  font-size: 0.37333rem;
  margin-right: 0.08rem;
}
/deep/.van-icon-clear {
  position: absolute;
  right: -0.13333rem;
  top: -0.13333rem;
  font-size: 0.4rem;
  color: #cacaca;
  z-index: 2;
}
/deep/ .van-grid-item__icon-wrapper {
  position: unset;
}
</style>
