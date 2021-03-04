  <template>
  <div>
    摄像头
    <button @click="addCamera">add</button>
    <button @click="cameraDetail">detail</button>
    <button @click="setCamera">set</button>
    <button @click="getTokens">set</button>
    <div id="myPlayer"></div>
  </div>
</template>

<script>
import { camerasvrbyrootId, camerasvr, setCameras, camerasDetail, getToken } from '@/api/camera'
export default {
  mounted () {
    this.cameraList()
  },
  methods: {
    // 获取项目下所有摄像头
    cameraList () {
      let data = {
        r: 2,
        rootId: '5badc4b125bf6ae229195954'
      }
      camerasvrbyrootId(data).then(res => {
        console.log(res)
      }).catch(err => {
        console.log(err)
      })
    },
    // 创建摄像头设备
    addCamera () {
      let data = {
        Verification: '212122',
        deviceId: 'u00071',
        latitude: '39.95825',
        longitude: '116.44961',
        marker: null,
        name: 'lelee',
        password: '',
        platform: 1,
        rootId: '5f62d7ed5d0a038d3d44e464'
      }
      camerasvr(data).then(res => {
        console.log(res)
      }).catch(err => {
        console.log(err)
      })
    },
    // 修改摄像头参数
    setCamera () {
      let data = {
        Verification: '2',
        deviceId: 'u00021',
        item: '1',
        latitude: '39.958925',
        longitude: '116.449619',
        marker: null,
        name: '234',
        platform: 1,
        rootId: '5f62d7ed5d0a038d3d44e464',
        type: 'camerasvr',
        _id: '5f65665938ea9ef72ecae97b'
      }
      setCameras(data).then(res => {
        console.log(res)
      }).catch(err => {
        console.log(err)
      })
    },
    cameraDetail () {
      camerasDetail({ _id: '5f6566b438ea9ef72ecae97d' }).then(res => {
        console.log(res)
      }).catch(err => {
        console.log(err)
      })
    },
    getTokens () {
      let data = {
        projectId: '5badc4b125bf6ae229195954',
        force: 1
      }
      getToken(data).then(res => {
        console.log(res)
      }).catch(err => {
        console.log(err)
      })
    }
    // a () {
    //   this.decoder = new EZUIKit.EZUIPlayer({
    //     id: 'playWind',
    //     autoplay: true,
    //     url: this.ezopenUrl,
    //     accessToken: 'at.appzuqzp2vj36qct3z6x0uqr77qdsg3g-7p1yl6ou42-1pnc4io-iggh5y1jq',
    //     decoderPath: '/static/js',
    //     width: 600,
    //     height: 400,
    //     handleError: handleError,
    //     handleSuccess: handleSuccess
    //   })
    // }
  }
}
</script>

<style lang="scss" scoped>
</style>
