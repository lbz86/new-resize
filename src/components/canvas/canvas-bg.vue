<template>
	<!-- <transition name="el-zoom-in-center"> -->
	  <div class="canvan">
		<canvas id="canvas"></canvas>
	  </div>
	<!-- </transition> -->
</template>

<script>
  export default {
    name: "canvas-bg",
    data() {
      return {
        canvas: null,
        numss:1200
      }
    },
    methods: {
      getsrc(){
		var scripts = document.getElementsByTagName('script')
		for(let i = 0; i < scripts.length; i++){
			let srcs = scripts[i].getAttribute('src')
			if(srcs.indexOf("canvas-bg.js") != -1){
				scripts[i].remove()
			}
		}
		const s = document.createElement('script');
			s.type = 'text/JavaScript';
			s.src = 'js/canvas-bg.js';
			document.body.appendChild(s);
      }
    },
    mounted() {
        this.getsrc()
    },
    beforeDestroy () {
        canh = 2
        cancelAnimationFrame(massr)
    }
  }
</script>

<style>

</style>
