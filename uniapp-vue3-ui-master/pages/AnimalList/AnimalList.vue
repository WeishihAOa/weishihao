<template>
	<button @click="login">点击授权登入</button>
	<view>
		<image :src="img"></image>
	</view>
</template>
 
 <style>
	 
 </style>
 
 <script>
	 export default {
	 	data() {
	 		return {
	 			img:''
	 		}
	 	},
	 	methods: {
	 		login(){
				uni.login({
				  provider: 'weixin',
				  success: function (loginRes) {
				    console.log('登入成功');
				    
					//获取用户信息
					uni.getUserProfile({
						provider:'weixin',
						success:function(res){
							console.log(res);
							this.img = res.userInfo.avatarUrl;
						}
					});
				  }
				});
			}
	 	}
	 }
 </script>
