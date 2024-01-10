<template>
	<uni-search-bar :style="{backgroundColor:bgcolor}" @confirm="search" cancel-button="none" :focus="true"
		v-model="searchValue">
	</uni-search-bar>
	<view class="catogory">
		<scroll-view class="scroll-view_H" scroll-x="true" @scroll="scroll" :show-scrollbar="true">
			<view v-for="(item,index) in list2" class="scroll-view-item_H"
			 :class="cur == index ? 'cur-item' : ''"
			 @click="moveIndex(index)">{{ item.catName }}</view>
		</scroll-view>
		<uni-icons :type="type" class="more"></uni-icons>
	</view>

</template>

<script>
	
	export default {
		data() {
			return {
				cur:0,
				list2:[],
				searchValue: '',
				bgcolor: '#1296db',
				frontColor: '#ffffff',
				type: 'bottom',
				token:'eyJhbGciOiJIUzUxMiJ9.eyJleHAiOjE3MDU3MzM1NTAsInN1YiI6IjI0MTE0MDQ1NzkiLCJpYXQiOjE3MDMxNDE1NTA0Mzd9.3YfGKtywotOQ7O6UZ8JePPSXSo--vpUNsA7zgOUgB7OTmWSfr9oVDRYPxWCceTJYxZpLu9w9s3NGZ_XK9Y2Z-w'
			}
		},
		onLoad() {
			uni.setNavigationBarColor({
				backgroundColor: this.bgcolor,
				frontColor: this.fontColor
			});
			uni.request({
			  url: 'http://api.jqrjq.cn/api/articleCat/all',
			  method: 'GET',
			  header: {
			    'Accept': '*/*',
			    'token': this.$data.token,
			    'Content-Type': 'application/x-www-form-urlencoded'
			  },
			  success: (res) => {
			    this.list2 = res.data.data.articleCats;
			    console.log(this.list2);
			  },
			  fail: (err) => {
			    console.log(err);
			  }
			});
			
			
		},
		methods: {
			search(e) {
				console.log(e)
			},
			scroll(e) {
				// console.log(e)
			},
			moveIndex(i){
				this.cur = i;
				const cateId = this.list2[i].id;
				getRequest(`api/article/${cateId}`)
			},
		}
	}
</script>

<style scoped>
	.catogory {
		position: relative;
	
	}
	
	.scroll-view_H {
		white-space: nowrap;
		width: 100%;
		height: 60rpx;
		border-bottom: 1upx solid #ccc;
	}
	/deep/::-webkit-scrollbar{
		display: none;
		width: 0;
		height: 0;
	}
	
	.cur-item{
		font-size: 28rpx;
		font-weight: bold;
		color: white;
		background-color: #1296db;
	}
	
	.scroll-view-item_H {
		display: inline-block;
		width: 100upx;
		line-height: 60rpx;
		text-align: center;
		font-size: 20rpx;
		overflow: hidden;
	}
	
	.more {
		position: absolute;
		top: 10upx;
		right: 0;
		background-color: #f5f5f5;
	}
</style>