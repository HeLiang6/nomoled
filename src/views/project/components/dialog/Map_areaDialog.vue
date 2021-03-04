<template>
  <div>
    <!--添加地区 -->
    <div
      class="area_dialog"
      id="dialog"
    >
      <el-dialog
        :visible.sync="$store.state.project.isAreaFlag"
        width="400px"
        top="0"
        @close="resetForm('form')"
        :modal='false'
      >
        <el-tabs
          v-model="activeName"
          type="border-card"
        >
          <el-tab-pane
            :label="$t('areaFrom.area')"
            name="first"
          >
            <el-form
              label-width="80px"
              ref="form"
              :rules="rules"
              :model="$store.state.project.setAreaData"
            >
              <el-form-item
                prop="name"
                :label="$t('areaFrom.area_name')"
              >
                <el-input v-model="$store.state.project.setAreaData.name"></el-input>
              </el-form-item>
              <el-form-item
                prop="no"
                :label="$t('areaFrom.area_number')"
              >
                <el-input
                  type="Number"
                  :min='0'
                  oninput="if(value<0)value=0"
                  v-model.number="$store.state.project.setAreaData.no"
                ></el-input>
              </el-form-item>
              <el-form-item
                :label="$t('areaFrom.description')"
                prop="description"
              >
                <el-input v-model="$store.state.project.setAreaData.description"></el-input>
              </el-form-item>
              <el-form-item
                prop="rtus"
                :label="$t('areaFrom.Street_light')"
              >
                <el-checkbox-group
                  v-for="(item,index) in rtus"
                  :key="index"
                  v-model="$store.state.project.setAreaData.rtus"
                >
                  <el-checkbox
                    style="width:100%"
                    :label="item.id"
                    :name="item.id"
                  >{{item.name}}</el-checkbox>
                </el-checkbox-group>
              </el-form-item>
              <!-- <el-form-item>
                <el-button @click="$store.state.project.isAreaFlag = false">取 消</el-button>
                <el-button
                  type="primary"
                  v-if="dtuareaBtn"
                  @click="handerClickSet"
                >{{$t('areaFrom.create')}}</el-button>
                <el-button
                  v-if="areaBtn"
                  type="primary"
                  @click="areaClick"
                >{{$t('areaFrom.save')}}</el-button>
              </el-form-item> -->

            </el-form>
          </el-tab-pane>
          <el-tab-pane
            :label="$t('lightList.parameter')"
            name="second"
          >
            <el-form
              class="linghtData"
              label-width="80px"
              ref="$store.state.project.setAreaData"
              :rules="rules"
              :model="$store.state.project.setAreaData"
            >
              <el-form-item
                prop="typeId"
                :label="$t('lightList.Street_lamp_model')"
              >
                <el-select
                  v-model="$store.state.project.setAreaData.typeId"
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
                prop="mode"
                :label="$t('lightList.Drive_mode')"
              >
                <el-select
                  v-model="$store.state.project.setAreaData.params.mode"
                  :placeholder="$t('tips.please')"
                >
                  <el-option
                    v-for="(item,index) in $t('task_mode.mode')"
                    :key="index"
                    :label="item"
                    :value="index"
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
                    v-model="$store.state.project.setAreaData.params.current"
                  ></el-input>
                  <p style="width:40px">mA</p>
                </div>
              </el-form-item>
              <div v-show="$store.state.project.setAreaData.params.mode!==2">
                <el-form-item
                  prop="First_period"
                  :label="$t('lightList.First_period')"
                >
                  <div style="display:flex">
                    <el-input v-model="$store.state.project.setAreaData.params.time1"></el-input>
                    <p style="width:40px">h</p>
                  </div>
                </el-form-item>
                <el-form-item
                  v-if="$store.state.project.setAreaData.params.mode===1||3"
                  :label="$t('lightList.Someone')"
                >
                  <div style="display:flex">
                    <el-input v-model="$store.state.project.setAreaData.params.induction1"></el-input>
                    <p style="width:40px">h</p>
                  </div>
                </el-form-item>
                <el-form-item :label="$store.state.project.setAreaData.params.mode===1||3?$t('lightList.NoDimming_ratio'):$t('lightList.Dimming_ratio')">
                  <div style="display:flex">
                    <el-input v-model="$store.state.project.setAreaData.params.light1"></el-input>
                    <p style="width:40px">%</p>
                  </div>
                </el-form-item>
                <el-form-item :label="$t('lightList.two_period')">
                  <div style="display:flex">
                    <el-input v-model="$store.state.project.setAreaData.params.time2"></el-input>
                    <p style="width:40px">h</p>
                  </div>
                </el-form-item>
                <el-form-item
                  v-if="$store.state.project.setAreaData.params.mode===1||3"
                  :label="$t('lightList.Someone')"
                >
                  <div style="display:flex">
                    <el-input v-model="$store.state.project.setAreaData.params.induction2"></el-input>
                    <p style="width:40px">h</p>
                  </div>
                </el-form-item>
                <el-form-item :label="$store.state.project.setAreaData.params.mode===1||3?$t('lightList.NoDimming_ratio'):$t('lightList.Dimming_ratio')">
                  <div style="display:flex">
                    <el-input v-model="$store.state.project.setAreaData.params.light2"></el-input>
                    <p style="width:40px">%</p>
                  </div>
                </el-form-item>
                <el-form-item :label="$t('lightList.three_period')">
                  <div style="display:flex">
                    <el-input v-model="$store.state.project.setAreaData.params.time3"></el-input>
                    <p style="width:40px">h</p>
                  </div>
                </el-form-item>
                <el-form-item
                  v-if="$store.state.project.setAreaData.params.mode===1||3"
                  :label="$t('lightList.Someone')"
                >
                  <div style="display:flex">
                    <el-input v-model="$store.state.project.setAreaData.params.induction3"></el-input>
                    <p style="width:40px">h</p>
                  </div>
                </el-form-item>
                <el-form-item :label="$store.state.project.setAreaData.params.mode===1||3?$t('lightList.NoDimming_ratio'):$t('lightList.Dimming_ratio')">
                  <div style="display:flex">
                    <el-input v-model="$store.state.project.setAreaData.params.light3"></el-input>
                    <p style="width:40px">%</p>
                  </div>
                </el-form-item>
                <el-form-item :label="$t('lightList.four_period')">
                  <div style="display:flex">
                    <el-input v-model="$store.state.project.setAreaData.params.time4"></el-input>
                    <p style="width:40px">h</p>
                  </div>
                </el-form-item>
                <el-form-item
                  v-if="$store.state.project.setAreaData.params.mode===1||3"
                  :label="$t('lightList.Someone')"
                >
                  <div style="display:flex">
                    <el-input v-model="$store.state.project.setAreaData.params.induction4"></el-input>
                    <p style="width:40px">h</p>
                  </div>
                </el-form-item>

                <el-form-item :label="$store.state.project.setAreaData.params.mode===1||3?$t('lightList.NoDimming_ratio'):$t('lightList.Dimming_ratio')">
                  <div style="display:flex">
                    <el-input v-model="$store.state.project.setAreaData.params.light4"></el-input>
                    <p style="width:40px">%</p>
                  </div>
                </el-form-item>
                <el-form-item :label="$t('lightList.five_period')">
                  <div style="display:flex">
                    <el-input v-model="$store.state.project.setAreaData.params.time5"></el-input>
                    <p style="width:40px">h</p>
                  </div>
                </el-form-item>
                <el-form-item
                  v-if="$store.state.project.setAreaData.params.mode===1||3"
                  :label="$t('lightList.Someone')"
                >
                  <div style="display:flex">
                    <el-input v-model="$store.state.project.setAreaData.params.induction5"></el-input>
                    <p style="width:40px">h</p>
                  </div>
                </el-form-item>
                <el-form-item :label="$store.state.project.setAreaData.params.mode===1||3?$t('lightList.NoDimming_ratio'):$t('lightList.Dimming_ratio')">
                  <div style="display:flex">
                    <el-input v-model="$store.state.project.setAreaData.params.light5"></el-input>
                    <p style="width:40px">%</p>
                  </div>
                </el-form-item>
              </div>
              <div v-show="$store.state.project.setAreaData.params.mode===2">
                <el-form-item :label="$t('lightList.Delay')">
                  <div style="display:flex">
                    <el-input v-model="$store.state.project.setAreaData.params.delaytime"></el-input>
                    <p style="width:40px">S</p>
                  </div>
                </el-form-item>
                <el-form-item :label="$t('lightList.Percentage_of_people')">
                  <div style="display:flex">
                    <el-input v-model="$store.state.project.setAreaData.params.menlight"></el-input>
                    <p style="width:40px">%</p>
                  </div>
                </el-form-item>
                <el-form-item :label="$t('lightList.Percentage_of_people')">
                  <div style="display:flex">
                    <el-input v-model="$store.state.project.setAreaData.params.nomenlight"></el-input>
                    <p style="width:40px">%</p>
                  </div>
                </el-form-item>
              </div>
              <div v-show="$store.state.project.setAreaData.params.mode===3">
                <el-form-item :label="$t('lightList.Morning_hours')">
                  <div style="display:flex">
                    <el-input v-model="$store.state.project.setAreaData.params.mtime"></el-input>
                    <p style="width:40px">%</p>
                  </div>
                </el-form-item>
                <el-form-item :label="$t('lightList.Morning_light_ratio')">
                  <div style="display:flex">
                    <el-input v-model="$store.state.project.setAreaData.params.mlight"></el-input>
                    <p style="width:40px">%</p>
                  </div>
                </el-form-item>

              </div>
              <!-- <el-form-item>
                <el-button @click="$store.state.project.isAreaFlag = false">取 消</el-button>
                <el-button
                  type="primary"
                  v-if="dtuareaBtn"
                  @click="handerClickSet"
                >创建</el-button>
                <el-button
                  v-if="areaBtn"
                  type="primary"
                  @click="areaClick"
                >保存</el-button>
              </el-form-item> -->
            </el-form>
          </el-tab-pane>
        </el-tabs>
        <span
          slot="footer"
          class="dialog-footer"
        >
          <el-button @click="$store.state.project.isAreaFlag = false">取 消</el-button>
          <el-button
            type="primary"
            v-if="dtuareaBtn"
            @click="handerClickSet"
          >{{$t('areaFrom.create')}}</el-button>
          <el-button
            v-if="areaBtn"
            type="primary"
            @click="areaClick"
          >{{$t('areaFrom.save')}}</el-button>

        </span>

      </el-dialog>
    </div>
  </div>
</template>

<script>
import { alterZone } from '@/api/area'
import { getProjectTreeBypId } from '@/api/project'
import { system } from '../../../../../static/js/SystemOperation'

export default {
  data () {
    return {
      activeName: 'first',
      // driveType: [
      //   {
      //     value: 0,
      //     label: '普通模式'
      //   },
      //   {
      //     value: 1,
      //     label: '延时感应模式'
      //   },
      //   {
      //     value: 2,
      //     label: '整晚感应模式'
      //   },
      //   {
      //     value: 3,
      //     label: '晨亮模式'
      //   }
      // ],
      rules: {
        name: [
          { required: true, message: this.$t('areaFrom.ipt_name'), trigger: 'blur' }
        ],
        no: [
          { required: true, message: this.$t('areaFrom.ipt_number'), trigger: 'blur' }
        ],
        rtus: [
          { required: true, message: this.$t('areaFrom.ipt_light'), trigger: 'blur' }
        ],
        typeId: [
          { required: true, message: this.$t('areaFrom.ipt_type'), trigger: 'blur' }
        ],
        mode: [
          { required: true, message: this.$t('areaFrom.ipt_node'), trigger: 'blur' }
        ],
        time1: [
          { required: true, message: this.$t('areaFrom.ipt_time'), trigger: 'blur' }
        ],
        description: [
          { required: true }
        ]
      }

    }
  },
  props: {
    rtus: {
      type: Array
    },
    areaBtn: {
      type: Boolean
    },
    dtuareaBtn: {
      type: Boolean
    }
  },
  computed: {
  },
  watch: {
  },
  methods: {
    handerClickSet () {
      this.$refs.form.validate((valid) => {
        if (valid) {
          this.$store.dispatch('ADD_ZONE')
          this.DTUList()
          if (this.$refs.form) {
            // console.log(123)
            this.$refs.form.resetFields()
          }
        } else {
          setTimeout(() => {
            var isError = document.getElementsByClassName('is-error')
            isError[0].querySelector('input').focus()
          }, 100)
          return false
        }
      })
    },
    areaClick () {
      // dtuload(this.$store.state.project.setAreaData).then(res => {
      //   console.log(res)
      // }).catch(err => {
      //   console.log(err)
      // })
      this.$refs.form.validate((valid) => {
        if (valid) {
          alterZone(this.$store.state.project.setAreaData).then(res => {
            if (res.ok === 1) {
              let user = JSON.parse(sessionStorage.getItem('nomouser'))._id
              let dataLog = {
                userId: user,
                obj: 6,
                dtuname: '',
                operatename: 34,
                operattype: 0,
                time: Date.parse(new Date()),
                description: '修改区域',
                description_en: 'Add area',
                description_spain: 'Agregar área',
                projectId: this.$store.state.project.addLightData.projectId,
                tel: '',
                ip: ''
              }
              system(dataLog)
              this.$message({
                message: this.$t('stateMessage.alterSuccess'),
                type: 'success'
              })

              this.$store.commit('SET_AREA_FLAG')
              this.DTUList()
            }
            console.log(res)
          }).catch(err => {
            console.log(err)
          })
        } else {
          setTimeout(() => {
            var isError = document.getElementsByClassName('is-error')
            isError[0].querySelector('input').focus()
          }, 100)
          return false
        }
      })
    },
    resetForm (val) {
      console.log(val)
      if (this.$refs.form) {
        this.$refs.form.resetFields()
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
.area_dialog {
  // max-height: 500px;
  .el-dialog__wrapper {
    position: fixed;
    top: 50% ;
    left: 50%;
    right: auto !important;
    bottom: auto !important;
    border-radius: 5px;
    margin-left: -15%;
    margin-top: -250px;
    overflow: hidden;
  }
  .el-dialog__header {
    display: none;
  }
  .el-dialog__body {
    padding: 0;
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
// .el-dialog__wrapper {
//   position: fixed;
// }
#dialog .el-dialog {
  top: 25%;
}
// .el-dialog__footer {
//   position: fixed;
//   bottom: 0;
// }

.el-tabs__nav-scroll {
  position: fixed;
  z-index: 10;
}
.el-tabs__content {
  margin-top: 40px;
}
.el-tabs--border-card > .el-tabs__header .el-tabs__item.is-active {
  border: 1px solid #eee;
}
.area_dialog .el-tabs__item {
  background: #fff;
}
</style>
