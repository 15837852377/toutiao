import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "./styles/index.less";
import "amfe-flexible";
// 测试请求
import request from "./utils/request";
request.get("/v1_0/channels").then((res) => {
  console.log(res.data);
});
// 引入vant组件
import Vant from "vant";
import "vant/lib/index.less";
Vue.use(Vant);
// 引入组件
import ToutiaoIcon from "@/components/ToutiaoIcon";
// 注册全局组件
Vue.component("ToutiaoIcon", ToutiaoIcon);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
