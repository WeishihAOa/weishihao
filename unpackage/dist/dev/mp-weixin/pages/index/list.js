"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {};
if (!Array) {
  const _component_van_button = common_vendor.resolveComponent("van-button");
  _component_van_button();
}
function _sfc_render(_ctx, _cache) {
  return {
    a: common_vendor.p({
      type: "default"
    }),
    b: common_vendor.p({
      type: "primary"
    }),
    c: common_vendor.p({
      type: "info"
    }),
    d: common_vendor.p({
      type: "warning"
    }),
    e: common_vendor.p({
      type: "danger"
    })
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "C:/Users/WEIFEN/Desktop/h5/uniapp-vue3-ui-master/pages/index/list.vue"]]);
wx.createPage(MiniProgramPage);
