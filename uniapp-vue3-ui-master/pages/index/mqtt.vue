<template>
	<view class="container">
		<uni-forms-item label="Host" required>
			<uni-easyinput v-model="connection.host" placeholder="请输入host" />
		</uni-forms-item>

		<uni-forms-item label="Port" required>
			<uni-easyinput v-model="connection.port" placeholder="请输入port" />
		</uni-forms-item>

		<uni-forms-item label="Path" required>
			<uni-easyinput v-model="connection.path" placeholder="请输入path" />
		</uni-forms-item>

		<uni-forms-item label="ClientId" required>
			<uni-easyinput v-model="connection.clientId" placeholder="请输入clientId" />
		</uni-forms-item>

		<uni-forms-item label="Username" required>
			<uni-easyinput v-model="connection.username" placeholder="请输入username" />
		</uni-forms-item>

		<uni-forms-item label="Password" required>
			<uni-easyinput v-model="connection.password" placeholder="请输入password" />
		</uni-forms-item>

	


		<view>
			<checkbox-group :values="selected" @change="handleCheckboxChange">
				<checkbox value="CleanSession" checked>Clean Session&nbsp;</checkbox>
				<checkbox value="SSL">SSL</checkbox>
			</checkbox-group><text
				class="url">{{connection.protocol}}://{{connection.host}}:{{connection.port}}{{connection.path}}</text>
		</view>

		<view class="btn">
			<button class="btn1" @click="connectToMQTT" :disabled="btn1Disabled">Connect</button>
			<button class="btn2" @click="disconnect" :disabled="btn2Disabled">Disconnect</button>
		</view>
		<text class="state">Current State: <text id="statetext"
				:style="connectionStateStyle">{{connection.state}}</text></text>

	</view>
</template>

<script setup>
	import * as mqtt from 'mqtt/dist/mqtt.js';
	import {
		reactive,
		ref,
		onMounted
	} from "vue";



	// https://github.com/mqttjs/MQTT.js#qos
	const qosList = [0, 1, 2];
	let client = ref({
		connected: false
	});
	const receivedMessages = ref("");
	const subscribedSuccess = ref(false);
	const btnLoadingType = ref("");
	const retryTimes = ref(0);

	let protocal = "";
	//如你的链接是wss:则修改为wxs:,如果你的链接是ws:则修改为wx:
	// #ifdef H5
	protocal = "ws"
	// #endif
	// #ifdef MP-WEIXIN
	protocal = "wxs"
	// #endif
	const connection = reactive({
		// ws or wss
		protocol: protocal,
		host: "jqrjq.cn",
		path: '/mqtt',
		state: 'disconnected',
		// ws -> 8083; wss -> 8084
		port: 8084, //
		clientId: "emqx_vue3_" + Math.random().toString(16).substring(2, 8),
		/**
		 * By default, EMQX allows clients to connect without authentication.
		 * https://docs.emqx.com/en/enterprise/v4.4/advanced/auth.html#anonymous-login
		 */
		username: "admin",
		password: "public",
		clean: true,
		connectTimeout: 30 * 1000, // ms
		reconnectPeriod: 4000, // ms
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

			/**
			 * if protocol is "ws", connectUrl = "ws://broker.emqx.io:8083/mqtt"
			 * if protocol is "wss", connectUrl = "wss://broker.emqx.io:8084/mqtt"
			 * 
			 * /mqtt: MQTT-WebSocket uniformly uses /path as the connection path,
			 * which should be specified when connecting, and the path used on EMQX is /mqtt.
			 * 
			 * for more details about "mqtt.connect" method & options,
			 * please refer to https://github.com/mqttjs/MQTT.js#mqttconnecturl-options
			 */
			client.value = mqtt.connect(connectUrl, options);

			if (client.value.on) {
				// https://github.com/mqttjs/MQTT.js#event-connect
				client.value.on("connect", () => {
					btnLoadingType.value = "";
					connection.state = 'connected';
					client.connected = true;
					console.log("connection successful");
				});

				// https://github.com/mqttjs/MQTT.js#event-reconnect
				client.value.on("reconnect", handleOnReConnect);

				// https://github.com/mqttjs/MQTT.js#event-error
				client.value.on("error", (error) => {
					console.log("connection error:", error);
				});

				// https://github.com/mqttjs/MQTT.js#event-message
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
				// 在断开连接时更新状态
				connection.state = "disconnected";
				stylered();
				console.log("Disconnected");
				// 启用按钮
				btn1Disabled.value = false;
				btn2Disabled.value = true;
			} catch (error) {
				console.log("Error disconnecting:", error);
			}
		} else {
			console.log("没有活动连接可断开");
		}
	};
</script>

<style>
	.input-field {
		display: inline-block;
		width: 200px;
		margin-right: 10px;
		border: 2px solid skyblue;
		/* 增加边框宽度 */
		background-color: #f0f0f0;
		/* 设置背景色 */
		color: #333;
		/* 设置文字颜色 */
		padding: 10px;
		/* 调整内边距 */
		border-radius: 5px;
		/* 添加圆角 */
	}

	.view {
		line-height: 10px;
	}

	.btn {
		display: flex;
		width: 100%;
		white-space: break-spaces;
	}

	.btn button {}
</style>