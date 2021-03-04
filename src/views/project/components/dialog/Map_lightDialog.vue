<template>
  <div class="dialog_content">
    <!--添加路灯 -->
    <div id="dialog_light">
      <el-dialog
        :visible.sync="$store.state.project.isLightFlag"
        width="300px"
        top="0"
        :modal='false'
        :close-on-click-modal="false"
        :modal-append-to-body='false'
        :append-to-body='false'
      >
        <el-tabs
          v-model="activeName"
          type="border-card"
          class="tab-box"
        >
          <el-tab-pane
            :label="$t('lightList.terminal')"
            name="first"
          >
            <el-form
              ref="form_light"
              label-width="80px"
              :rules="rules"
              :model="$store.state.project.addLightData"
            >
              <el-form-item
                prop="name"
                :label="$t('lightList.name')"
              >
                <el-input v-model="$store.state.project.addLightData.name"></el-input>
              </el-form-item>
              <el-form-item
                :label="$t('lightList.longitude')"
                prop="longitude"
              >
                <el-input v-model="$store.state.project.addLightData.longitude"></el-input>
              </el-form-item>
              <el-form-item
                :label="$t('lightList.latitude')"
                prop="latitude"
              >
                <el-input v-model="$store.state.project.addLightData.latitude"></el-input>
              </el-form-item>
              <el-form-item
                :label="$t('lightList.UID')"
                prop="uid"
              >
                <el-input v-model="$store.state.project.addLightData.uid"></el-input>
              </el-form-item>
              <el-form-item :label="$t('lightList.Clean_up')">
                <el-checkbox v-model="$store.state.project.addLightData.clear"></el-checkbox>
              </el-form-item>
              <el-form-item>
                <!-- <el-button @click="$store.state.project.isLightFlag = false">取 消</el-button>
                <el-button
                  @click="light_Add"
                  type="primary"
                >保存</el-button> -->
              </el-form-item>
            </el-form>
            <p style="text-align: center;line-height:18px;">{{$t('inputMessage.tip')}}</p>
          </el-tab-pane>
          <el-tab-pane
            label="路灯终端参数"
            name="second"
          >
            <el-form
              class="linghtData"
              ref="$store.state.project.addLightData"
              label-width="80px"
              :rules="rules"
              :model="$store.state.project.addLightData"
            >
              <el-form-item
                :label="$t('lightList.Street_lamp_model')"
                prop="typeId"
              >
                <el-select
                  v-model="$store.state.project.addLightData.typeId"
                  :placeholder="$t('tips.please')"
                >
                  <el-option
                    v-for="item in $store.state.project.ligthType"
                    :key="item._id"
                    :label="item.name"
                    :value="item._id"
                  >
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item
                :label="$t('lightList.Drive_mode')"
                prop="mode"
              >
                <el-select
                  v-model="$store.state.project.addLightData.params.mode"
                  :placeholder="$t('tips.please')"
                >
                  <el-option
                    v-for="item in driveType"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  >
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item :label="$t('lightList.Drive_current')">
                <div style="display:flex">
                  <el-input
                    type="Number"
                    :min="0"
                    oninput="if(value<0)value=0"
                    v-model="$store.state.project.addLightData.params.current"
                  ></el-input>
                  <p style="width:40px">mA</p>
                </div>
              </el-form-item>
              <div v-show="$store.state.project.addLightData.params.mode!==2">
                <el-form-item
                  :label="$t('lightList.First_period')"
                  prop="time1"
                >
                  <div style="display:flex">
                    <el-input v-model="$store.state.project.addLightData.params.time1"></el-input>
                    <p style="width:40px">h</p>
                  </div>
                </el-form-item>
                <el-form-item
                  v-if="$store.state.project.addLightData.params.mode===1||3"
                  :label="$t('lightList.Someone')"
                >
                  <div style="display:flex">
                    <el-input v-model="$store.state.project.addLightData.params.induction1"></el-input>
                    <p style="width:40px">h</p>
                  </div>
                </el-form-item>
                <el-form-item :label="$store.state.project.addLightData.params.mode===1||3?$t('lightList.NoDimming_ratio'):$t('lightList.Dimming_ratio')">
                  <div style="display:flex">
                    <el-input v-model="$store.state.project.addLightData.params.light1"></el-input>
                    <p style="width:40px">%</p>
                  </div>
                </el-form-item>
                <el-form-item :label="$t('lightList.two_period')">
                  <div style="display:flex">
                    <el-input v-model="$store.state.project.addLightData.params.time2"></el-input>
                    <p style="width:40px">h</p>
                  </div>
                </el-form-item>
                <el-form-item
                  v-if="$store.state.project.addLightData.params.mode===1||3"
                  :label="$t('lightList.Someone')"
                >
                  <div style="display:flex">
                    <el-input v-model="$store.state.project.addLightData.params.induction2"></el-input>
                    <p style="width:40px">h</p>
                  </div>
                </el-form-item>
                <el-form-item :label="$store.state.project.addLightData.params.mode===1||3?$t('lightList.NoDimming_ratio'):$t('lightList.Dimming_ratio')">
                  <div style="display:flex">
                    <el-input v-model="$store.state.project.addLightData.params.light2"></el-input>
                    <p style="width:40px">%</p>
                  </div>
                </el-form-item>
                <el-form-item :label="$t('lightList.three_period')">
                  <div style="display:flex">
                    <el-input v-model="$store.state.project.addLightData.params.time3"></el-input>
                    <p style="width:40px">h</p>
                  </div>
                </el-form-item>
                <el-form-item
                  v-if="$store.state.project.addLightData.params.mode===1||3"
                  :label="$t('lightList.Someone')"
                >
                  <div style="display:flex">
                    <el-input v-model="$store.state.project.addLightData.params.induction3"></el-input>
                    <p style="width:40px">h</p>
                  </div>
                </el-form-item>
                <el-form-item :label="$store.state.project.addLightData.params.mode===1||3?$t('lightList.NoDimming_ratio'):$t('lightList.Dimming_ratio')">
                  <div style="display:flex">
                    <el-input v-model="$store.state.project.addLightData.params.light3"></el-input>
                    <p style="width:40px">%</p>
                  </div>
                </el-form-item>
                <el-form-item :label="$t('lightList.four_period')">
                  <div style="display:flex">
                    <el-input v-model="$store.state.project.addLightData.params.time4"></el-input>
                    <p style="width:40px">h</p>
                  </div>
                </el-form-item>
                <el-form-item
                  v-if="$store.state.project.addLightData.params.mode===1||3"
                  :label="$t('lightList.Someone')"
                >
                  <div style="display:flex">
                    <el-input v-model="$store.state.project.addLightData.params.induction4"></el-input>
                    <p style="width:40px">h</p>
                  </div>
                </el-form-item>

                <el-form-item :label="$store.state.project.addLightData.params.mode===1||3?$t('lightList.NoDimming_ratio'):$t('lightList.Dimming_ratio')">
                  <div style="display:flex">
                    <el-input v-model="$store.state.project.addLightData.params.light4"></el-input>
                    <p style="width:40px">%</p>
                  </div>
                </el-form-item>
                <el-form-item :label="$t('lightList.five_period')">
                  <div style="display:flex">
                    <el-input v-model="$store.state.project.addLightData.params.time5"></el-input>
                    <p style="width:40px">h</p>
                  </div>
                </el-form-item>
                <el-form-item
                  v-if="$store.state.project.addLightData.params.mode===1||3"
                  :label="$t('lightList.Someone')"
                >
                  <div style="display:flex">
                    <el-input v-model="$store.state.project.addLightData.params.induction5"></el-input>
                    <p style="width:40px">h</p>
                  </div>
                </el-form-item>
                <el-form-item :label="$store.state.project.addLightData.params.mode===1||3?$t('lightList.NoDimming_ratio'):$t('lightList.Dimming_ratio')">
                  <div style="display:flex">
                    <el-input v-model="$store.state.project.addLightData.params.light5"></el-input>
                    <p style="width:40px">%</p>
                  </div>
                </el-form-item>
              </div>
              <div v-show="$store.state.project.addLightData.params.mode===2">
                <el-form-item :label="$t('lightList.Delay')">
                  <div style="display:flex">
                    <el-input v-model="$store.state.project.addLightData.params.delaytime"></el-input>
                    <p style="width:40px">S</p>
                  </div>
                </el-form-item>
                <el-form-item :label="$t('lightList.Percentage_of_people')">
                  <div style="display:flex">
                    <el-input v-model="$store.state.project.addLightData.params.menlight"></el-input>
                    <p style="width:40px">%</p>
                  </div>
                </el-form-item>
                <el-form-item :label="$t('lightList.Percentage_of_people')">
                  <div style="display:flex">
                    <el-input v-model="$store.state.project.addLightData.params.nomenlight"></el-input>
                    <p style="width:40px">%</p>
                  </div>
                </el-form-item>
              </div>
              <div v-show="$store.state.project.addLightData.params.mode===3">
                <el-form-item :label="$t('lightList.Morning_hours')">
                  <div style="display:flex">
                    <el-input v-model="$store.state.project.addLightData.params.mtime"></el-input>
                    <p style="width:40px">%</p>
                  </div>
                </el-form-item>
                <el-form-item :label="$t('lightList.Morning_light_ratio')">
                  <div style="display:flex">
                    <el-input v-model="$store.state.project.addLightData.params.mlight"></el-input>
                    <p style="width:40px">%</p>
                  </div>
                </el-form-item>

              </div>
              <el-form-item>
                <!-- <el-button @click="$store.state.project.isLightFlag">更新</el-button>
                <el-button @click="$store.state.project.isLightFlag = false">取 消</el-button> -->
                <!-- <el-button
                  type="primary"
                  @click="light_Add"
                >保存</el-button> -->
              </el-form-item>
            </el-form>
          </el-tab-pane>
        </el-tabs>
        <span
          slot="footer"
          class="dialog-footer"
        >
          <el-button @click="$store.state.project.isLightFlag = false">取 消</el-button>
          <el-button
            @click="light_Add"
            type="primary"
          >保存</el-button>

        </span>

      </el-dialog>
    </div>
  </div>
</template>

<script>
import { getProjectTreeBypId } from '@/api/project'

export default {
  data () {
    return {
      activeName: 'first',
      driveType: [
        {
          value: 0,
          label: '普通模式'
        },
        {
          value: 1,
          label: '延时感应模式'
        },
        {
          value: 2,
          label: '整晚感应模式'
        },
        {
          value: 3,
          label: '晨亮模式'
        }
      ],
      rules: {
        name: [
          { required: true, message: '请输入名称', trigger: 'blur' }
        ],
        longitude: [
          { required: true, message: '请输入经度', trigger: 'blur' }
        ],
        latitude: [
          { required: true, message: '请输入纬度', trigger: 'blur' }
        ],
        uid: [
          { required: true, message: '请输入UID', trigger: 'blur' }
        ],
        typeId: [
          { required: true, message: '请输入路灯型号', trigger: 'blur' }
        ],
        mode: [
          { required: true, message: '请输入驱动模式', trigger: 'blur' }
        ],
        time1: [
          { required: true, message: '请输入第一时段', trigger: 'blur' }
        ]
      }
    }
  },
  computed: {
  },
  watch: {
    '$store.state.project.isLightFlag': function (newVal, endVal) {
      console.log(newVal)
    }
  },
  mounted () {
  },
  methods: {
    light_Add () {
      this.$refs.form_light.validate((valid) => {
        if (valid) {
          this.$store.dispatch('ADD_LIGHT_DEVICE')
          this.DTUList()
          // rtus(this.$store.state.project.addLightData).then(res => {
          //   console.log(res)
          // }).catch(err => {
          //   console.log(err)
          // })
        } else {
          setTimeout(() => {
            var isError = document.getElementsByClassName('is-error')
            isError[0].querySelector('input').focus()
          }, 100)
          return false
        }
      })
    },
    clean_rules () {
      if (this.$refs.form_light) {
        this.$refs.form_light.resetFields()
      }
    },
    DTUList () {
      let data = {
        projectId: this.$store.state.project.addLightData.projectId,
        r: Math.ceil(Math.random() * 10)
      }
      getProjectTreeBypId(data).then(res => {
        console.log(res)
        this.$store.commit('DTU_list', res.result)
        // if(res.http)
      }).catch(err => {
        console.log(err)
      })
    }

  }
}
</script>

<style lang="scss" scoped>
</style>

<style lang='scss'>
.tab-box {
  background: #fff;
}
#dialog_light .el-dialog {
  overflow-y: auto;
  &::-webkit-scrollbar {
    /*滚动条整体样式*/
    width: 10px; /*高宽分别对应横竖滚动条的尺寸*/
    height: 1px;
  }
  &::-webkit-scrollbar-thumb {
    /*滚动条里面小方块*/
    border-radius: 10px;
    box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
    background: #535353;
  }
  &::-webkit-scrollbar-track {
    /*滚动条里面轨道*/
    box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
    border-radius: 10px;
    background: #ededed;
    display: none;
  }
}
#dialog_light .el-dialog {
  top: 25%;
}
#dialog_light .el-dialog {
  .el-dialog__header {
    display: none;
  }
  .el-dialog__body {
    padding: 0;
  }
}
#dialog_light .el-dialog__wrapper {
  min-width: 400px;
  position: fixed;
  top: 50%;
  left: 50%;
  right: auto !important;
  bottom: auto !important;
  border-radius: 5px;
  margin-left: -15%;
  margin-top: -250px;
  overflow: hidden;

  .el-tabs__content {
    max-height: 500px;
    overflow-y: auto;
    &::-webkit-scrollbar {
      /*滚动条整体样式*/
      width: 10px; /*高宽分别对应横竖滚动条的尺寸*/
      height: 1px;
    }
    &::-webkit-scrollbar-thumb {
      /*滚动条里面小方块*/
      border-radius: 10px;
      box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
      background: #535353;
    }
    &::-webkit-scrollbar-track {
      /*滚动条里面轨道*/
      box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
      border-radius: 10px;
      background: #ededed;
      display: none;
    }
  }
}
</style>
