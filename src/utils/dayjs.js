// 引入dayjs
import dayjs from "dayjs";
// 加载中文语言包
import "dayjs/locale/zh-cn";
// 修改语言为中文
dayjs.locale("zh-cn");
// 引入相对时间的包
import relativeTime from "dayjs/plugin/relativeTime";
import Vue from "vue";
// 配置使用处理相对时间的插件
dayjs.extend(relativeTime);

console.log(dayjs().to(dayjs("2021-01-01")));

Vue.filter("relativeTime", (value) => {
  return dayjs().to(dayjs(new Date(value)));
});
