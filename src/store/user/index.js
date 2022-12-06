import {
  reqGetCode,
  reqUserRegister,
  reqUserLogin,
  reqUserInfo,
  reqLoginOut,
} from "@/api";
import { setToken, getToken, removeToken } from "@/utils/token";

const actions = {
  //获取验证码
  async getCode({ commit }, phone) {
    // 获取验证码的接口：把验证码返回了，正常情况是后台把验证码发到手机用户上
    let result = await reqGetCode(phone);
    if (result.code == 200) {
      commit("GETCODE", result.data);
      return "ok";
    } else {
      return Promise.reject(new Error("faile"));
    }
  },
  //用户注册
  async userRegister({ commit }, user) {
    let result = await reqUserRegister(user);
    if (result.code == 200) {
      return "ok";
    } else {
      return Promise.reject(new Error("faile"));
    }
  },
  //登录[token]
  async userLogin({ commit }, data) {
    let result = await reqUserLogin(data);
    // 服务器下发token，用户唯一标识符
    //将来经常带token找服务器要用户信息进行展示
    if (result.code === 200) {
      commit("USERLOGIN", result.data.token);
      // 持久化存储token
      setToken(result.data.token);
      return "ok";
    } else {
      return Promise.reject(new Error("faile"));
    }
  },
  //获取用户信息
  async getUserInfo({ commit }) {
    let result = await reqUserInfo();
    if (result.code === 200) {
      commit("GETUSERINFO", result.data);
      return "ok";
    } else {
      return Promise.reject(new Error("faile"));
    }
  },
  //退出登录
  async LogOut({ commit }) {
    //需要做的事
    //1.需要发请求，通知服务器退出登录【清除一些数据：token】
    //2.清除项目中的数据【userinfo token】
    let result = await reqLoginOut();
    if (result.code === 200) {
      commit("LOGOUT");
      return "ok";
    } else {
      return Promise.reject(new Error("faile"));
    }
  },
};
const mutations = {
  GETCODE(state, code) {
    state.code = code;
  },
  USERLOGIN(state, token) {
    state.token = token;
  },
  GETUSERINFO(state, userInfo) {
    state.userInfo = userInfo;
  },
  LOGOUT(state) {
    state.token = {};
    state.userInfo = "";
    removeToken();
  },
};
const state = {
  code: "",
  token: getToken(),
  userInfo: "",
};
const getters = {};
export default {
  state,
  mutations,
  actions,
  getters,
};
