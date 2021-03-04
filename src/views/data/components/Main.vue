
  <template>
  <div class="box-right">
    <el-tabs
      @tab-click="lightDataClick"
      v-model="activeName"
      type="border-card"
    >
      <el-tab-pane
        :label="$t('DataLight.ElectricityStatistics')"
        name="first"
      >
        <Electric ref="first" />
      </el-tab-pane>
      <el-tab-pane
        :label="$t('DataLight.faultStatistics')"
        name="second"
        v-if="$store.state.data.rtus.length==0"
        :lazy='true'
      >
        <Breakdown ref="second" />
      </el-tab-pane>
      <el-tab-pane
        :label="$t('DataLight.dtuList')"
        name="third"
        v-if="$store.state.data.dtu &&$store.state.data.rtus.length ==0"
      >
        <DtuDataList />
      </el-tab-pane>
      <el-tab-pane
        :label="$t('DataLight.lightStatistics')"
        name="four"
        v-if="$store.state.data.rtus.length>0"
      >
        <LightListData ref="four" />
      </el-tab-pane>
      <el-tab-pane
        :label="$t('DataLight.dataList')"
        name="five"
        v-if="$store.state.data.rtus.length>0"
      >
        <LightTab />
      </el-tab-pane>
    </el-tabs>

  </div>
</template>

<script>
import Electric from './Electric'
import Breakdown from './Breakdown'
import LightTab from './LightTab'
import DtuDataList from './DtuDataList'
import LightListData from './LightListData'

export default {
  data () {
    return {
      activeName: 'first'
    }
  },
  components: {
    Electric,
    Breakdown,
    LightTab,
    DtuDataList,
    LightListData
  },
  methods: {
    lightDataClick () {
      // if (this.activeName === 'five') {
      //   for()
      //   let data= {
      //     projectId:this.$store.state.data.projectId,
      //   }
      // }
    }
  }
}
</script>

<style lang="scss" scoped>
.box-right {
  width: 100%;
  background: rgba($color: #fff, $alpha: 0.1);
  margin-left: 20px;
  // overflow-y: auto;
  // max-height: 800px;
  h4 {
    padding: 10px;
    font-size: 24px;
  }
}
</style>
<style lang="scss">
.box-right .el-tabs--border-card > .el-tabs__content {
  background: none;
}
.box-right .el-tabs--border-card {
  background: none;
  border: 0;
}
.el-tabs--border-card > .el-tabs__header {
  background: none;
}
.el-tabs--border-card > .el-tabs__header .el-tabs__item.is-active {
  background: #00eaff;
  border-radius: 5px 5px 0 0;
}
// .el-table__body-wrapper {
//   min-height: 400px;
// }
</style>
