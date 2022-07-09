import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "./styles/index.less";
import "amfe-flexible";

// 引入vant组件
import Vant from "vant";
import "vant/lib/index.less";
Vue.use(Vant);
// 引入dayjs配置文件
import "./utils/dayjs";
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
