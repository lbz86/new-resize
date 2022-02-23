<template>
  <div class="canvan">
    <canvas id="canvas"></canvas>
  </div>
</template>

<script>
  export default {
    name: "canvas-bg1",
    data() {
      return {
        canvas: null,
        numss:1200
      }
    },
    methods: {
      getsrc(){
        // const t = document.createElement('script');
        // 	t.type = 'text/JavaScript';
        // 	t.src = '../static/jquery-1.8.3.min.js';
        // 	document.body.appendChild(t);
		var scripts = document.getElementsByTagName('script')
		for(let i = 0; i < scripts.length; i++){
			let srcs = scripts[i].getAttribute('src')
			if(srcs.indexOf("canvas-bg1.js") != -1){
				scripts[i].remove()
			}
		}
        const s = document.createElement('script');
        	s.type = 'text/JavaScript';
        	s.src = 'js/canvas-bg1.js';
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
  .canvan{background: #000;}
</style>
