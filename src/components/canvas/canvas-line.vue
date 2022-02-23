<template>
  <div class="canvan">
    <canvas id="canvas"></canvas>
  </div>
</template>

<script>
  export default {
    name: "canvas-line",
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
			if(srcs.indexOf("canvas.js") != -1){
				scripts[i].remove()
			}
		}
        const s = document.createElement('script');
        	s.type = 'text/JavaScript';
        	s.src = 'js/canvas.js';
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
