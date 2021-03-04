<template>
  <div class="media-container">
    <div id="playWind"></div>
  </div>
</template>

<script>
import { log } from 'three'
import '../../../static/ezuikit.js'

export default {
  data () {
    return {
      playerInstance: null
    }
  },

  mounted () {
    this.initPlayer()
  },

  methods: {
    /**
             * 初始化播放器实例
             */
    initPlayer () {
      this.playerInstance = new EZUIKit.EZUIPlayer({
        id: 'playWind',
        autoplay: true,
        url: 'ezopen://open.ys7.com/序列号/1.hd.live',
        accessToken: 'xxx',
        decoderPath: '',
        width: '400',
        height: '300'
      })
      console.log(this.playerInstance)
    }
  }

}
</script>
<style scoped lang="scss">
.media-container {
  padding-top: 50px;
  height: 100vh;
  width: 100%;

  div {
    height: 200px;
    width: 100%;
    background-color: red;
  }
}
</style>
