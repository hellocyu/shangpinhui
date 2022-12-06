import Vue from "vue";
import App from "./App.vue";
import router from "@/router";
import store from "@/store";

// 三级联动组件---全局组件
import TypeNav from "@/components/TypeNav";
Vue.component(TypeNav.name, TypeNav);

import Carousel from "@/components/Carousel";
Vue.component(Carousel.name, Carousel);

import Pagination from "@/components/Pagination";
Vue.component(Pagination.name, Pagination);

import { Button, MessageBox } from "element-ui";
//全局注册
Vue.component(Button.name, Button);
//element-ui注册组件的时候还有一种学法，挂在原型上
Vue.prototype.$msgbox = MessageBox;
Vue.prototype.$alert = MessageBox.alert;

// 引入mock数据
import "@/mock/mockServe";
//引入swiper样式
import "swiper/css/swiper.css";
//统一接收api文件里面的全部请求函数
import * as API from "@/api";

//图片懒加载
import VueLazyload from "vue-lazyload";
import load from "@/assets/loading.gif";
Vue.use(VueLazyload, {
  loading: load,
});

//引入表单校验插件
import "@/plugins/validate";

Vue.config.productionTip = false;

new Vue({
  render: (h) => h(App),
  beforeCreate() {
    //全局事件总线
    Vue.prototype.$bus = this;
    Vue.prototype.$API = API;
  },
  router,
  // 注册仓库：组件实例的身上会多一个$store属性
  store,
}).$mount("#app");
