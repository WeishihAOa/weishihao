"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      img: ""
    };
  },
  methods: {
    login() {
      common_vendor.index.login({
        provider: "weixin",
        success: function(loginRes) {
          console.log("登入成功");
          common_vendor.index.getUserProfile({
            provider: "weixin",
            success: function(res) {
              console.log(res);
              this.img = res.userInfo.avatarUrl;
            }
          });
        }
      });
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.o((...args) => $options.login && $options.login(...args)),
    b: $data.img
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "C:/Users/WEIFEN/Desktop/h5/uniapp-vue3-ui-master/pages/AnimalList/AnimalList.vue"]]);
wx.createPage(MiniProgramPage);
