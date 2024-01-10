"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      searchValue: "",
      bgcolor: "#e43d33",
      frontColor: "#ffffff",
      type: "bottom"
    };
  },
  onLoad() {
    common_vendor.index.setNavigationBarColor({
      backgroundColor: this.bgcolor,
      frontColor: this.fontColor
    });
  },
  methods: {
    search(e) {
      console.log(e);
    },
    scroll(e) {
    }
  }
};
if (!Array) {
  const _easycom_uni_search_bar2 = common_vendor.resolveComponent("uni-search-bar");
  const _easycom_uni_icons2 = common_vendor.resolveComponent("uni-icons");
  (_easycom_uni_search_bar2 + _easycom_uni_icons2)();
}
const _easycom_uni_search_bar = () => "../../uni_modules/uni-search-bar/components/uni-search-bar/uni-search-bar.js";
const _easycom_uni_icons = () => "../../uni_modules/uni-icons/components/uni-icons/uni-icons.js";
if (!Math) {
  (_easycom_uni_search_bar + _easycom_uni_icons)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: $data.bgcolor,
    b: common_vendor.o($options.search),
    c: common_vendor.o(($event) => $data.searchValue = $event),
    d: common_vendor.p({
      ["cancel-button"]: "none",
      focus: true,
      modelValue: $data.searchValue
    }),
    e: common_vendor.o((...args) => $options.scroll && $options.scroll(...args)),
    f: common_vendor.p({
      type: $data.type
    })
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "C:/Users/WEIFEN/Desktop/h5/uniapp-vue3-ui-master/pages/index/wiki.vue"]]);
wx.createPage(MiniProgramPage);
