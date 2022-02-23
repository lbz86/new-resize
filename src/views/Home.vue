<template>
	<div class="home" id="list" style="height: calc(100% - 20px);">
		<div id="page1" ref="pag1">
			<!-- <VueDragResize v-for="(rect, index) in rects" :key="index" :w="rect.width" :h="rect.height" :x="rect.left"
				:y="rect.top" :parentW="listWidth" :parentH="listHeight" :axis="rect.axis" :isActive="rect.active"
				:minw="rect.minw" :minh="rect.minh" :isDraggable="rect.draggable" :isResizable="rect.resizable"
				:parentLimitation="rect.parentLim" :snapToGrid="rect.snapToGrid" :aspectRatio="rect.aspectRatio"
				:z="rect.zIndex" :contentClass="rect.class" v-on:activated="activateEv(rects1,rect,index)">
				<div class="filler" :style="{backgroundColor:rect.color}"></div>
			</VueDragResize> -->
			<div class="get_bg">
				<label class="toolbar-check-inp" v-for="(bgit,index) in backList" :key="bgit.id">
					<input type="radio" :value="bgit.value" @change="getBacks" v-model="values" :checked="bgit.resizable" />{{bgit.name}}</label>
			</div>
			<component :is="comname"></component>
		</div>
		<!-- v-on:clicked="clicked($event,rects1,rect,index)" -->
		<div id="page2" ref="pag2" @click.self="praets(rects1)">
			<div class="can-bg" id="can-bg">
				<component ref="backgun" :is="backurl"></component>
			</div>
			<div class="right_t">
				<VueDragResize v-for="(rect, index) in rects1" :key="index" :w="rect.width" :h="rect.height" :x="rect.left"
					:y="rect.top" :axis="rect.axis" :isActive="rect.active" :parentW="listWidth" :parentH="listHeight"
					:minw="rect.minw" :minh="rect.minh" :isDraggable="rect.draggable" :isResizable="rect.resizable"
					:parentLimitation="true" :snapToGrid="rect.snapToGrid" :aspectRatio="rect.aspectRatio"
					:z="rect.zIndex" :contentClass="rect.class" v-on:activated="activateEv(rects1,rect,index)" 
					v-on:dragging="dragging($event,rect,rects1,index)" v-on:dragstop="dragstop($event,rect,rects1,index)"
					v-on:deactivated="deactivateds($event,rects1,rect,index)"
					v-on:resizing="resizing($event,rect,rect,index)"> 
					<div class="filler" :style="{backgroundColor:rect.color}"></div>
				</VueDragResize>
			</div>
		</div>
		<toolbar :msg="msg" :activeRect="activeRect" v-if="activeRect == 1" @newData="newData"></toolbar>
	</div>
</template>

<script>
	// @ is an alias to /src
	// import About from '@/views/About.vue'
	import toolbar from '@/components/toolbar.vue'
	import VueDragResize from 'vue-drag-resize'
	import draggable from 'vuedraggable'
	import data from '@/assets/state.js'
	export default {
		name: 'Home',
		components: {
			toolbar,
			VueDragResize,
			draggable
			// About
		},
		data() {
			return {
				values:'canvas/canvas-bg',
				backList:[
					{"resizable":true,"value":'canvas/canvas-bg',"name":'星空背景',"id":1},
					{"resizable":false,"value":'canvas/canvas-bg1',"name":'闪烁背景',"id":2},
					{"resizable":false,"value":'canvas/canvas-line',"name":'五彩背景',"id":3}
				],
				backurl:{},
				comname:{},
				msg:{},
				indexs:'',
				activeRect:null,
				paret:false,
				listWidth: 0,
				listHeight: 0,
				width: 0,
				height: 0,
				top: 0,
				left: 0,
				rects:[],
				rects1:[],
			}
		},
		created() {//创建dom 前添加组件
			this.createComponent()
		},
		mounted() {
			let listEl = document.getElementById('list');
			this.listWidth = listEl.clientWidth - 260;
			this.listHeight = listEl.clientHeight;
			this.rects = data.rects
			this.rects1 = data.rects1
			window.addEventListener('resize', () => {
				this.listWidth = listEl.clientWidth;
				this.listHeight = listEl.clientHeight;
				setTimeout(()=>{
					this.$refs.backgun.getsrc()
				},100)
				// console.log('777')
			})
		},
		methods: {
			getBacks(){
				let val = event.target.value
				setTimeout(()=>{
					this.backurl = () => import('@/components/'+val+'.vue');
				},100)
			},
			createComponent(){//动态创建组件
				let zj = 'About'
				this.comname = () => import('@/components/' + zj + '.vue')
				this.backurl = () => import('@/components/canvas/canvas-bg.vue');
			},
			activateEv(data,item,indext){//单击组件时调用，以显示句柄
				data.forEach((it,index)=>{
					it.active = false;
				})
				item.active = true;
				// this.$set(data, indext, item)
				this.indexs = indext
				this.activeRect = '1';
				this.msg = item;
				
			},
			praets(data){
				console.log('8888')
				data.forEach(it=>{
					it.active = false;
				})
				this.indexs = '';
				this.activeRect = null;
				this.msg = {};
			},
			deactivateds(even,data,item){//单击组件外部调用
				
			},
			dragging(even,item,data,indext){//开始拖动
				let listEl = document.getElementById('page1');
				let top1 = Number((this.$refs.pag1.getBoundingClientRect().top).toFixed(2))
				let top2 = Number((this.$refs.pag2.getBoundingClientRect().top).toFixed(2))
				let left1 = Number((this.$refs.pag1.getBoundingClientRect().left).toFixed(2))
				let left2 = Number((this.$refs.pag2.getBoundingClientRect().left).toFixed(2))
				let right1 = Number((this.$refs.pag1.getBoundingClientRect().right).toFixed(2))
				let right2 = Number((this.$refs.pag2.getBoundingClientRect().right).toFixed(2))
				let wid = listEl.clientWidth;
				
				item.left = even.left;
				item.top = even.top;
				item.width = even.width;
				item.height = even.height;
				this.msg = item;
				let hei = listEl.clientHeight;
				// console.log(even,'99999999999',top1,top2)
			},
			dragstop(even,item,data,indext){//结束拖动
				// console.log(item,'888')
				// data.forEach((it,index)=>{
				// 	it.active = false;
				// })
				// item.active = true;
				// // this.$set(data, indext, item)
				// // item.active = true;
				// // console.log('111')
				// this.indexs = indext
				// this.activeRect = '1';
			},
			activatEd(even){
				console.log(even,item,'000')
			},
			resizing(even,item) {
				item.left = even.left;
				item.top = even.top;
				item.width = even.width;
				item.height = even.height;
				this.msg = item;
			},
			newData(num,name){
				this.rects1[this.indexs][name] = num
				// console.log(data,name,'444')
			}
		}
	}
</script>
<style>
	#page1{
		position: relative; height: 100%; background: #ffd3c4; width: 250px;
		margin-right: 10px;
	}
	#page2{
		position: relative; height: 100%; background: #e6e6e6; flex: 1;
	}
	.right_t{
		width: 100%;
		height: 100%;
	}
	.can-bg {
	  position: absolute;
	  width: 100%;
	  height: 100%;
	  z-index: 0;
	}
	.canvan{
		-webkit-animation: fade-in 1.5s ease;
		animation:fade-in 1.5s ease;
	}
	.home{
		position: relative;
		display: flex;
	}
	.filler {
		width: 100%;
		height: 100%;
		display: inline-block;
		position: absolute;
		left: 0;
		top: 0;
	}
	@keyframes fade-in {  
	    0% {opacity: 0;}/*初始状态 透明度为0*/  
	    40% {opacity: 0;}/*过渡状态 透明度为0*/  
	    100% {opacity: 1;}/*结束状态 透明度为1*/  
	}  
	@-webkit-keyframes fade-in {/*针对webkit内核*/  
	    0% {opacity: 0;}  
	    40% {opacity: 0;}  
	    100% {opacity: 1;}  
	} 
</style>