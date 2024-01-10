"use strict";
Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
const common_vendor = require("./common/vendor.js");
const router_index = require("./router/index.js");
const utils_pinia = require("./utils/pinia.js");
const http_request = require("./http/request.js");
require("./store/user.js");
require("./http/config.js");
if (!Math) {
  "./pages/index/index.js";
  "./pages/my/my.js";
  "./pages/index/login.js";
  "./pages/index/crop.js";
  "./pages/index/register.js";
  "./pages/index/wiki.js";
  "./pages/index/list.js";
  "./pages/index/news.js";
  "./pages/AnimalList/AnimalList.js";
  "./pages/AnimalEncyclopedia/AnimalEncyclopedia.js";
  "./pages/AnimalRegulations/AnimalRegulations.js";
  "./pages/Animaldetails/Animaldetails.js";
  "./pages/index/mqtt.js";
}
const _sfc_main = {
  onLaunch: function() {
    router_index.routingIntercept();
  },
  onShow: function() {
  },
  onHide: function() {
  }
};
const App = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "C:/Users/WEIFEN/Desktop/h5/uniapp-vue3-ui-master/App.vue"]]);
function createApp() {
  const app = common_vendor.createSSRApp(App);
  app.use(utils_pinia.pinia);
  app.config.globalProperties.$request = http_request.request;
  return {
    app,
    pinia: utils_pinia.pinia
  };
}
createApp().app.mount("#app");
exports.createApp = createApp;
