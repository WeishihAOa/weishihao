"use strict";
const common_vendor = require("../../common/vendor.js");
if (!Array) {
  const _easycom_uni_easyinput2 = common_vendor.resolveComponent("uni-easyinput");
  const _easycom_uni_forms_item2 = common_vendor.resolveComponent("uni-forms-item");
  (_easycom_uni_easyinput2 + _easycom_uni_forms_item2)();
}
const _easycom_uni_easyinput = () => "../../uni_modules/uni-easyinput/components/uni-easyinput/uni-easyinput.js";
const _easycom_uni_forms_item = () => "../../uni_modules/uni-forms/components/uni-forms-item/uni-forms-item.js";
if (!Math) {
  (_easycom_uni_easyinput + _easycom_uni_forms_item)();
}
const _sfc_main = {
  __name: "mqtt",
  setup(__props) {
    let client = common_vendor.ref({
      connected: false
    });
    const receivedMessages = common_vendor.ref("");
    common_vendor.ref(false);
    const btnLoadingType = common_vendor.ref("");
    const retryTimes = common_vendor.ref(0);
    let protocal = "";
    protocal = "wxs";
    const connection = common_vendor.reactive({
      // ws or wss
      protocol: protocal,
      host: "jqrjq.cn",
      path: "/mqtt",
      state: "disconnected",
      // ws -> 8083; wss -> 8084
      port: 8084,
      //
      clientId: "emqx_vue3_" + Math.random().toString(16).substring(2, 8),
      /**
       * By default, EMQX allows clients to connect without authentication.
       * https://docs.emqx.com/en/enterprise/v4.4/advanced/auth.html#anonymous-login
       */
      username: "admin",
      password: "public",
      clean: true,
      connectTimeout: 30 * 1e3,
      // ms
      reconnectPeriod: 4e3
      // ms
      // for more options and details, please refer to https://github.com/mqttjs/MQTT.js#mqttclientstreambuilder-options
    });
    const handleOnReConnect = () => {
      retryTimes.value += 1;
      if (retryTimes.value > 5) {
        try {
          client.value.end();
          initData();
          console.log("connection maxReconnectTimes limit, stop retry");
        } catch (error) {
          console.log("handleOnReConnect catch error:", error);
        }
      }
    };
    const createConnection = () => {
      try {
        const {
          protocol,
          host,
          port,
          ...options
        } = connection;
        const connectUrl = `${protocol}://${host}:${port}/mqtt`;
        client.value = common_vendor.mqttExports.connect(connectUrl, options);
        if (client.value.on) {
          client.value.on("connect", () => {
            btnLoadingType.value = "";
            connection.state = "connected";
            client.connected = true;
            console.log("connection successful");
          });
          client.value.on("reconnect", handleOnReConnect);
          client.value.on("error", (error) => {
            console.log("connection error:", error);
          });
          client.value.on("message", (topic, message) => {
            receivedMessages.value = receivedMessages.value.concat(
              message.toString()
            );
            console.log(`received message: ${message} from topic: ${topic}`);
          });
        }
      } catch (error) {
        console.log("mqtt.connect error:", error);
      }
    };
    const connectToMQTT = () => {
      createConnection();
    };
    const disconnect = () => {
      if (client.value.connected) {
        try {
          client.value.end();
          connection.state = "disconnected";
          stylered();
          console.log("Disconnected");
          btn1Disabled.value = false;
          btn2Disabled.value = true;
        } catch (error) {
          console.log("Error disconnecting:", error);
        }
      } else {
        console.log("没有活动连接可断开");
      }
    };
    return (_ctx, _cache) => {
      return {
        a: common_vendor.o(($event) => connection.host = $event),
        b: common_vendor.p({
          placeholder: "请输入host",
          modelValue: connection.host
        }),
        c: common_vendor.p({
          label: "Host",
          required: true
        }),
        d: common_vendor.o(($event) => connection.port = $event),
        e: common_vendor.p({
          placeholder: "请输入port",
          modelValue: connection.port
        }),
        f: common_vendor.p({
          label: "Port",
          required: true
        }),
        g: common_vendor.o(($event) => connection.path = $event),
        h: common_vendor.p({
          placeholder: "请输入path",
          modelValue: connection.path
        }),
        i: common_vendor.p({
          label: "Path",
          required: true
        }),
        j: common_vendor.o(($event) => connection.clientId = $event),
        k: common_vendor.p({
          placeholder: "请输入clientId",
          modelValue: connection.clientId
        }),
        l: common_vendor.p({
          label: "ClientId",
          required: true
        }),
        m: common_vendor.o(($event) => connection.username = $event),
        n: common_vendor.p({
          placeholder: "请输入username",
          modelValue: connection.username
        }),
        o: common_vendor.p({
          label: "Username",
          required: true
        }),
        p: common_vendor.o(($event) => connection.password = $event),
        q: common_vendor.p({
          placeholder: "请输入password",
          modelValue: connection.password
        }),
        r: common_vendor.p({
          label: "Password",
          required: true
        }),
        s: _ctx.selected,
        t: common_vendor.o((...args) => _ctx.handleCheckboxChange && _ctx.handleCheckboxChange(...args)),
        v: common_vendor.t(connection.protocol),
        w: common_vendor.t(connection.host),
        x: common_vendor.t(connection.port),
        y: common_vendor.t(connection.path),
        z: common_vendor.o(connectToMQTT),
        A: _ctx.btn1Disabled,
        B: common_vendor.o(disconnect),
        C: _ctx.btn2Disabled,
        D: common_vendor.t(connection.state),
        E: common_vendor.s(_ctx.connectionStateStyle)
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "C:/Users/WEIFEN/Desktop/h5/uniapp-vue3-ui-master/pages/index/mqtt.vue"]]);
wx.createPage(MiniProgramPage);
