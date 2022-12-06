import { reqGoodsInfo, reqAddOrUpdateShopCar } from "@/api";
//封装游客身份模块-->生成一个随机字符串
import { getUUID } from "@/utils/uuid_token";

const actions = {
  async getGoodInfo({ commit }, skuid) {
    let result = await reqGoodsInfo(skuid);
    if (result.code == 200) {
      commit("GETGOODINFO", result.data);
    }
  },
  //将产品加入到购物车中 || 修改某一个产品的个数
  async addOrUpdateShopCart({ commit }, { skuId, skuNum }) {
    //加入购物车之后，前台将参数带给服务器
    //服务器写入数据成功，并没有返回其他数据，只是返回code=200，代表这次操作成功
    //因为服务器没有返回其余数据，所以不用进行vuex三连环存储数据
    let result = await reqAddOrUpdateShopCar(skuId, skuNum);
    //当前这个函数如果执行返回promise
    if (result.code == 200) {
      //代表加入购物车成功
      return "ok";
    } else {
      //代表加入购物车失败
      return Promise.reject(new Error("faile"));
    }
  },
};
const mutations = {
  GETGOODINFO(state, goodInfo) {
    state.goodInfo = goodInfo;
  },
};
const state = {
  goodInfo: {},
  uuid_token: getUUID(),
};
const getters = {
  categoryView(state) {
    // 比如：state.goodInfo初始状态为空对象，空对象categoryView属性值为undefined
    //加个{}或[]可以防止假报错
    return state.goodInfo.categoryView || {};
  },
  skuInfo(state) {
    return state.goodInfo.skuInfo || {};
  },
  spuSaleAttrList(state) {
    return state.goodInfo.spuSaleAttrList || [];
  },
};
export default {
  state,
  mutations,
  actions,
  getters,
};
