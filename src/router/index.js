import Vue from "vue";
import VueRouter from "vue-router";
import store from "@/store";
Vue.use(VueRouter);

import routes from "./routes";

//先把VueRouter原型对象的push，先保存一份
let originPush = VueRouter.prototype.push;

//重写push replace方法
//第一个参数：告诉原来push方法，你往哪里跳转（传递哪些参数）
// 第二个参数：成功的回调
// 第三个参数：失败的回调
VueRouter.prototype.push = function (location, resolve, reject) {
  // 如果原来的push方法中已经写了resolve,reject回调函数
  if (resolve && reject) {
    //call和apply区别
    // 相同点：都可以调用函数一次并修改函数上下文一次
    // 不同点：call传递参数用逗号隔开，apply传递参数用数组
    originPush.call(this, location, resolve, reject);
  } else {
    originPush.call(
      this,
      location,
      () => {},
      () => {}
    );
  }
};

let router = new VueRouter({
  routes,
  //滚动行为
  scrollBehavior(to, from, savedPosition) {
    // return 期望滚动到哪个的位置
    return { y: 0 }; // 代表滚动条在最上方
  },
});

//全局守卫：前置守卫（在路由跳转之前进行判断）
router.beforeEach(async (to, from, next) => {
  //to：可以获取到你要跳转到哪个路由的信息
  //from: 可以获取到从哪个路由来
  //next: 放行函数 next()直接放行 next(path)放行到指定路由 next(false)
  let token = store.state.user.token;
  let name = store.state.user.userInfo.name;
  if (token) {
    //用户以及登录不能去login
    if (to.path == "/login") {
      next("/");
    } else {
      if (name) {
        next();
      } else {
        try {
          //登录了但没有用户信息
          //获取用户信息成功
          await store.dispatch("getUserInfo");
          next();
        } catch (error) {
          //token失效了获取不到用户信息
          //清除token
          await store.dispatch("LogOut");
          next("/login");
        }
      }
    }
  } else {
    //游客身份登录
    //未登录不能去交易相关的页面、不能去支付页面【pay paysuccess】，不能去个人中心
    let toPath = to.path;
    if (
      toPath.indexOf("/trade") !== -1 ||
      toPath.indexOf("/pay") !== -1 ||
      toPath.indexOf("/paysuccess") !== -1 ||
      toPath.indexOf("/center") !== -1
    ) {
      //把未登录的时候
      next("/login?redirect=" + toPath);
    } else {
      // 去的不是以上路由
      next();
    }
  }
});
export default router;
