<template>
	<div class="toolbar" @mousedown.stop>
		<div class="toolbar-wh-row">
			<p class="toolbar-row-title">Position</p>
			<span class="toolbar-position-inp">top
				<input :value="top" @keyup="changeTop" />
				<i class="el-icon-unlock loan" :style="{'color':msg.axis=='x' ? '#42b983' : '#AAA'}" @click="toggleYLock"></i>
			</span>
			<span class="toolbar-position-inp">left
				<input :value="left" @keyup="changeLeft" />
				<i class="el-icon-unlock loan" :style="{'color':msg.axis=='y' ? '#42b983' : '#AAA'}" @click="toggleXLock"></i>
			</span>
		</div>
		<div class="toolbar-wh-row">
			<p class="toolbar-row-title">Size</p>
			<span class="toolbar-size-inp">width
				<input :value="width" @keyup="changeWidth" />
				<i class="el-icon-unlock loan" :style="{'color':msg.aspectRatio ? '#42b983' : '#AAA'}" @click="toggleAspect"></i>
			</span>
			<span class="toolbar-size-inp">height
				<input :value="height" @keyup="changeHeight" />
			</span>
		</div>

		<div class="toolbar-wh-row">
			<p class="toolbar-row-title">Minimal size</p>
			<span class="toolbar-size-inp">width
				<input :value="minw" :disabled="activeRect === null" @keyup="changeMinWidth" />
			</span>
			<span class="toolbar-size-inp">height
				<input :value="minh" :disabled="activeRect === null" @keyup="changeMinHeight" />
			</span>
		</div>

		<div class="toolbar-wh-row">
			<p class="toolbar-row-title">Restrictions</p>
			<label class="toolbar-check-inp"><input type="checkbox" @change="toggleResizable" :checked="resizable"
					:disabled="activeRect === null" /> 显示选中</label>
			<label class="toolbar-check-inp"><input type="checkbox" @change="toggleDraggable" :checked="draggable"
					:disabled="activeRect === null" /> 是否可拖拽</label>
			<label class="toolbar-check-inp"><input type="checkbox" @change="toggleSnapToGrid" :checked="snapToGrid"
					:disabled="activeRect === null" /> 对齐拖动</label>
			<!-- <label class="toolbar-check-inp"><input type="checkbox" @change="toggleParentLimitation"
					:checked="parentLim" :disabled="activeRect === null" /> parentLimitation</label> -->
			<p class="toolbar-row-title">
				<span  @click="toTop">上移{{msg.zIndex}}</span>
				<span :style="{'background':msg.zIndex == 1 ? '#AAA' :'#2f71c1'}" @click="toBottom">下移{{msg.zIndex}}</span>
			</p>
		</div>
	</div>
</template>

<script>
	export default {
		name: 'toolbar',
		props: {
			msg: {
				type: Object,
				default:{},
			},
			activeRect:{
				type: String,
				default:null,
			}
		},
		data() {
			return {
				paret:false,
			}
		},
		computed: {
		    width() {
		        return this.activeRect === null ? '' : this.msg.width
		    },
		
		    height() {
		        return this.activeRect === null ? '' : this.msg.height
		    },
		
		    top() {
		        return this.activeRect === null ? '' : this.msg.top
		    },
		
		    left() {
		        return this.activeRect === null ? '' : this.msg.left
		    },
		
		    minw() {
		        return this.activeRect === null ? '' : this.msg.minw
		    },
		
		    minh() {
		        return this.activeRect === null ? '' : this.msg.minh
		    },
		
		    aspectRatio() {
		        return this.activeRect === null ? false : this.msg.aspectRatio;
		    },
		
		    parentLim() {
		        return this.activeRect === null ? false : this.msg.parentLim;
		    },
		
		    draggable() {
		        return this.activeRect === null ? false : this.msg.draggable;
		    },
		
		    resizable() {
		        return this.activeRect === null ? false : this.msg.resizable;
		    },
		
		    snapToGrid() {
		        return this.activeRect === null ? false : this.msg.snapToGrid;
		    },
		},
		mounted() {
			// console.log(this.msg,'6666',this.activeRect)
		},
		methods: {
		    toggleYLock() {
		        if (this.activeRect === null) {
		            return
		        }
				let axis = ''
				if(this.msg.axis == "both"){
					axis = 'x'
				}else{
					axis = 'both'
				}
				setTimeout(()=>{
					this.$emit('newData',axis,'axis')
				},100)
		    },
		    toggleXLock() {
		        if (this.activeRect === null) {
		            return
		        }
				let axis = ''
				if(this.msg.axis == "both"){
					axis = 'y'
				}else{
					axis = 'both'
				}
				setTimeout(()=>{
					this.$emit('newData',axis,'axis')
				},100)
		    },
		
		    toggleAspect() {
		        if (this.activeRect === null) {
		            return
		        }
				let aspectRatio = !this.msg.aspectRatio
				setTimeout(()=>{
					this.$emit('newData',aspectRatio,'aspectRatio')
				},100)
		    },
		
		    toggleParentLimitation() {
				let parentLim = event.target.checked
				setTimeout(()=>{
					this.$emit('newData',parentLim,'parentLim')
				},100)
		    },
		
		    toggleResizable() {
				let resizable = event.target.checked
				setTimeout(()=>{
					this.$emit('newData',resizable,'resizable')
				},100)
		    },
		
		    toggleDraggable() {
		       let draggable = event.target.checked
		       setTimeout(()=>{
		       	this.$emit('newData',draggable,'draggable')
		       },100)
		    },
		
		    toggleSnapToGrid() {
		        let snapToGrid = event.target.checked
		        setTimeout(()=>{
		        	this.$emit('newData',snapToGrid,'snapToGrid')
		        },100)
		    },
		
		    toTop() {//上移
				let zIndex = this.msg.zIndex + 1
				setTimeout(()=>{
					this.$emit('newData',zIndex,'zIndex')
				},100)
		    },
		    toBottom() {//下移
				let zIndex = this.msg.zIndex - 1
				if(zIndex < 1){
					zIndex = 1
				}
				setTimeout(()=>{
					this.$emit('newData',zIndex,'zIndex')
				},100)
		    },
		
		    changeMinWidth(ev) {//最小宽度
		        let minw = parseInt(ev.target.value);
		        if (typeof minw !== 'number' || isNaN(minw)) {
		            minw = 1;
		        }
		        if (minw <= 0) {
		            minw = 1;
		        } else if (minw > this.msg.width) {
		            minw = this.msg.width;
		        }
		        ev.target.value = minw;
				setTimeout(()=>{
					this.$emit('newData',minw,'minw')
				},100)
		    },
		
		    changeMinHeight(ev) {//最小高度
		        let minh = parseInt(ev.target.value);
		        if (typeof minh !== 'number' || isNaN(minh)) {
		            minh = 1;
		        }
		        if (minh <= 0) {
		            minh = 1;
		        } else if (minh > this.msg.height) {
		            minh = this.msg.height;
		        }
		        ev.target.value = minh;
				setTimeout(()=>{
					this.$emit('newData',minh,'minh')
				},100)
		    },
		    changeTop(ev) {//顶部距离
		        let top = parseInt(ev.target.value);
		        if (typeof top !== 'number' || isNaN(top)) {
		            top = this.msg.top;
		            ev.target.value = top;
		            return
		        }
				setTimeout(()=>{
					this.$emit('newData',top,'top')
				},100)
		    },
		    changeLeft(ev) {//左边距离
		        let left = parseInt(ev.target.value);
		        if (typeof left !== 'number' || isNaN(left)) {
		            left = this.msg.left;
		            ev.target.value = left;
		        }
				setTimeout(()=>{
					this.$emit('newData',left,'left')
				},100)
		    },
		    changeWidth(ev){//盒子宽度
		        let width = parseInt(ev.target.value);
		        if (typeof width !== 'number' || isNaN(width)) {
		            width = this.msg.width;
		            ev.target.value = width;
		        }
				setTimeout(()=>{
					this.$emit('newData',width,'width')
				},100)
		    },
		    changeHeight(ev){//盒子高度
		        let height = parseInt(ev.target.value);
		        if (typeof height !== 'number' || isNaN(height)) {
		            height = this.msg.height;
		            ev.target.value = height;
		        }
				setTimeout(()=>{
					this.$emit('newData',height,'height')
				},100)
		    }
		}
	}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
	@import '~@/assets/styles/toolbar.css';
	.toolbar-row-title{margin-top: 10px;}
	.toolbar-row-title span{display: inline-block;
		padding: 6px 12px;
		cursor: pointer;
		background: #2f71c1;
		color: #fff;
		border-radius: 5px;
	}
	.toolbar-row-title span:nth-child(1){
		margin-right: 60px;
	}
	.toolbar-size-inp{position: relative;}
	.loan{position: absolute;
		right:0;
		top: 50%;
		bottom: 50%;
		transform: translate(-50%,-50%);
		z-index: 5;
		cursor: pointer;
		font-size: 20px;
	 }
</style>
