<template>
  <div class="nav_tree">
    <div class="nav-top">
      <span>{{$t('tips.Current_project')}}:</span>
      <el-select
        v-model="$store.state.project.addLightData.projectId"
        :placeholder="$t('tips.please')"
        size="mini"
        @change="searchChange"
      >
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        >
        </el-option>
      </el-select>
    </div>
    <p style="padding:10px 0 0 45px;line-height:26px;font-size:20px;">
      <el-popover
        placement="right"
        width="100"
        trigger="click"
      >
        <ul class="DTU_Box">
          <li @click="set_project">
            {{$t('mapBox.modification')}}
          </li>
          <li @click="concentrator">
            {{$t('mapBox.Add_concentrator')}}
          </li>
        </ul>
        <p slot="reference">{{projectName}}</p>
      </el-popover>
    </p>
    <el-menu
      class="el-menu-vertical-demo boxTree"
      ref="treeScroll"
    >
      <el-submenu
        v-for="(item,index) in num.dtuList"
        :key="index"
        :index="String(index)"
      >
        <template>
          <span
            slot="title"
            @click="map_icon(item)"
          >
            <el-popover
              placement="right"
              width="100"
              trigger="click"
              ref="popover"
            >
              <ul class="DTU_Box">
                <li @click="DTU_date_Set(item)">
                  {{$t('mapBox.modification')}}
                </li>
                <li @click="DTU_areaAdd(item)">
                  {{$t('mapBox.Add_area')}}
                </li>
                <!-- 更新集中器终端 -->
                <li @click="update_terminal(item,index)">
                  {{$t('mapBox.Update_concentrator')}}
                </li>
                <li @click="DTU_delete(item)">
                  {{$t('delete')}}
                </li>
              </ul>
              <p slot="reference">{{item.name}}
                <span v-if="$store.state.project.pjtree.dtuList[index]">
                  <span :class="$store.state.project.pjtree.dtuList[index].net===1?'imgBg':'online'"></span>
                </span>
              </p>
            </el-popover>
          </span>
        </template>
        <el-submenu :index='item._id'>
          <template slot="title">
            <el-popover
              placement="right"
              width="100"
              trigger="click"
            >
              <ul class="DTU_Box">
                <li @click="add_light(item)">
                  {{$t('mapBox.Add_street_light')}}
                </li>
                <li @click="updateRtu(item,index,item)">
                  {{$t('mapBox.Update_light')}}
                </li>
                <li @click="getVersion(item,index,index,item)">
                  {{$t('mapBox.Get_controller')}}
                </li>
              </ul>
              <p slot="reference">{{$t('mapBox.Street_lightings')}}</p>
            </el-popover>
          </template>
          <el-submenu
            v-for="(item2,index2) in item.rtuList"
            :key="index2"
            :index="item2._id"
          >
            <!-- <el-submenu :index="item2._id"> -->
            <template slot="title"><span>{{item2.name}}-V{{item2.version}}
                <span v-if="$store.state.project.pjtree &&$store.state.project.pjtree.rtuList && $store.state.project.pjtree.rtuList[index2]">
                  <span :class="$store.state.project.pjtree.rtuList[index2].net===1?'imgBg':'online'"></span>
                </span>
              </span>
            </template>
            <el-menu-item :index="item2._id+'141'">
              <template>
                <span
                  @click="setData(item2)"
                  slot="title"
                >
                  {{$t('mapBox.modification')}}
                </span>
              </template>
            </el-menu-item>
            <el-menu-item :index="item2._id+'142'">
              <template slot="title">
                <span @click="readClick(item2,index2,item)">
                  {{$t('mapBox.Read_configuration')}}
                </span>
              </template>
            </el-menu-item>
            <el-menu-item :index="item2._id+'143'">
              <template slot="title"><span @click="updateRtu(item2,index2,item)">{{$t('mapBox.Update_light')}}</span></template>
            </el-menu-item>
            <el-menu-item :index="item2._id+'144'">
              <template slot="title"><span @click="getVersion(item2,index2,index,item)">{{$t('mapBox.Get_controller')}}</span></template>
            </el-menu-item>
            <el-menu-item :index="item2._id+'145'">
              <template slot="title"><span @click="deleteClick(item2)">{{$t('delete')}}</span></template>
            </el-menu-item>
          </el-submenu>
        </el-submenu>
        <el-submenu
          :index="item3._id"
          v-for="(item3,index3) in item.zoneList"
          :key="index3"
        >
          <template slot="title">
            <el-popover
              placement="right"
              width="100"
              trigger="click"
            >
              <ul class="DTU_Box">
                <li @click="area_date_Set(item3,item)">
                  {{$t('mapBox.modification')}}
                </li>
                <li @click="updateRtu(item3,index,item,index3)">
                  {{$t('mapBox.Update_concentrator')}}
                </li>
                <li @click="area_delete(item3)">
                  {{$t('project_list.delete')}}
                </li>
              </ul>
              <p slot="reference">{{item3.name}}</p>
            </el-popover>

          </template>
          <el-submenu
            :index="item4._id"
            v-for="(item4,index4) in item3.rtuList"
            :key="index4"
          >
            <template slot="title"><span>{{item4.name}}-V{{item4.version}}
                <!-- <span v-if="$store.state.project.pjtree.zoneList[index3] && $store.state.project.pjtree.zoneList[index3].rtuList && $store.state.project.pjtree.zoneList[index3].rtuList[index4].net">
                  <span :class="$store.state.project.pjtree.zoneList[index3].rtuList[index4].net===1?'imgBg':'online'">
                  </span>
                </span> -->
              </span></template>
            <el-menu-item :index="item4._id+'141'">
              <template>
                <span
                  @click="setData(item4,index4)"
                  slot="title"
                >
                  {{$t('mapBox.modification')}}
                </span>
              </template>
            </el-menu-item>
            <el-menu-item :index="item4._id+'142'">
              <template slot="title">
                <span @click="readClick(item4,index4,item)">
                  {{$t('mapBox.Read_configuration')}}
                </span>
              </template>
            </el-menu-item>
            <el-menu-item :index="item4._id+'143'">
              <template
                slot="title"
                @click="updateRtu(item4,index4,item)"
              ><span>{{$t('mapBox.Update_light')}}</span></template>
            </el-menu-item>
            <el-menu-item :index="item4._id+'144'">
              <template slot="title"><span>{{$t('mapBox.Get_controller')}}</span></template>
            </el-menu-item>
            <el-menu-item :index="item4._id+'145'">
              <template slot="title"><span @click="deleteClick(item4)">{{$t('project_list.delete')}}</span></template>
            </el-menu-item>
          </el-submenu>
        </el-submenu>
      </el-submenu>
    </el-menu>
    <div class="nav-bottom">
      <div>
        <p>{{$t('dtu')}}</p>
        <span class="status">
          【
          <img
            src="../../../../static/images/well.png"
            alt="在线"
            title="在线"
          >
          <span>在线:{{$store.state.project.pjtree.dtuonline}}</span>
          <img
            src="../../../../static/images/malfunction.png"
            alt="掉线"
            title="掉线"
          >
          <span>掉线:{{$store.state.project.pjtree.dtuoffline}}</span>
          】
        </span>
      </div>
      <div>
        <p>{{$t('rtu')}}</p>
        <span class="status"> 【
          <img
            src="../../../../static/images/well.png"
            alt="在线"
            title="在线"
          >
          <span>在线:{{$store.state.project.pjtree.rtuonline}}</span>
          <div>

          </div>
          <img
            src="../../../../static/images/malfunction.png"
            alt="掉线"
            title="掉线"
          >
          <span>掉线:{{$store.state.project.pjtree.rtuoffline}}</span>
          】
        </span>
      </div>
    </div>
    <div class="dialog_content">
      <!-- 添加集中器 -->
      <div class="dialog-boxs">
        <el-dialog
          :visible.sync="add_DTU"
          width="100%"
          top="0"
          :modal='false'
          :close-on-click-modal="false"
          :modal-append-to-body='false'
          :append-to-body='false'
        >
          <el-tabs
            v-model="activeName"
            type="border-card"
          >
            <el-tab-pane
              label="集中器"
              name="first"
            >
              <el-form
                ref="form"
                label-width="100px"
                :rules="rules"
                :model="$store.state.project.add_DTU"
              >
                <el-form-item
                  prop="name"
                  :label="$t('lightList.name')"
                >
                  <el-input v-model="$store.state.project.add_DTU.name"></el-input>
                </el-form-item>
                <el-form-item
                  :label="$t('lightList.longitude')"
                  prop="longitude"
                >
                  <el-input v-model="$store.state.project.add_DTU.longitude"></el-input>
                </el-form-item>
                <el-form-item
                  :label="$t('lightList.latitude')"
                  prop="latitude"
                >
                  <el-input v-model="$store.state.project.add_DTU.latitude"></el-input>
                </el-form-item>
                <el-form-item
                  :label="$t('lightList.UID')"
                  prop="tel"
                >
                  <el-input v-model="$store.state.project.add_DTU.tel"></el-input>
                </el-form-item>
                <el-form-item
                  prop="phoneNo"
                  label="Phone No"
                >
                  <el-input v-model="$store.state.project.add_DTU.phoneNo"></el-input>
                </el-form-item>
                <el-form-item
                  class="iptWidth"
                  :label="$t('DTU_list.Heartbeat')"
                  prop="poll"
                >
                  <el-input v-model="$store.state.project.add_DTU.poll"></el-input> &nbsp&nbsp&nbspsec
                </el-form-item>
                <el-form-item
                  class="iptWidth"
                  :label="$t('DTU_list.The_sampling_period')"
                  prop="sendtime"
                >
                  <el-input v-model="$store.state.project.add_DTU.sendtime"></el-input>&nbsp&nbsp&nbspmin
                </el-form-item>
                <!-- <el-form-item>
                  <el-button @click="add_DTU = false">{{$t('search.cancel')}}</el-button>
                  <el-button
                    type="primary"
                    @click="addDTUClick"
                  >{{$t('search.add')}}</el-button>
                </el-form-item> -->
              </el-form>
            </el-tab-pane>
            <el-tab-pane
              :label="$t('lightList.parameter')"
              name="second"
            >
              <el-form
                class="linghtData"
                ref="$store.state.project.add_DTU"
                label-width="80px"
                :rules="rules"
                :model="$store.state.project.add_DTU"
              >
                <el-form-item
                  :label="$t('lightList.Street_lamp_model')"
                  prop="typeId"
                >
                  <el-select
                    v-model="$store.state.project.add_DTU.typeId"
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
                    v-model="$store.state.project.add_DTU.params.mode"
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
                      v-model="$store.state.project.add_DTU.params.current"
                    ></el-input>
                    <p style="width:40px">mA</p>
                  </div>
                </el-form-item>
                <div v-show="$store.state.project.add_DTU.params.mode!==2">
                  <el-form-item
                    :label="$t('lightList.First_period')"
                    prop="time1"
                  >
                    <div style="display:flex">
                      <el-input v-model="$store.state.project.add_DTU.params.time1"></el-input>
                      <p style="width:40px">h</p>
                    </div>
                  </el-form-item>
                  <el-form-item
                    v-if="$store.state.project.add_DTU.params.mode===1||3"
                    :label="$t('lightList.Someone')"
                  >
                    <div style="display:flex">
                      <el-input v-model="$store.state.project.add_DTU.params.induction1"></el-input>
                      <p style="width:40px">h</p>
                    </div>
                  </el-form-item>
                  <el-form-item :label="$store.state.project.add_DTU.params.mode===1||3?$t('lightList.NoDimming_ratio'):$t('lightList.Dimming_ratio')">
                    <div style="display:flex">
                      <el-input v-model="$store.state.project.add_DTU.params.light1"></el-input>
                      <p style="width:40px">%</p>
                    </div>
                  </el-form-item>
                  <el-form-item :label="$t('lightList.two_period')">
                    <div style="display:flex">
                      <el-input v-model="$store.state.project.add_DTU.params.time2"></el-input>
                      <p style="width:40px">h</p>
                    </div>
                  </el-form-item>
                  <el-form-item
                    v-if="$store.state.project.add_DTU.params.mode===1||3"
                    :label="$t('lightList.Someone')"
                  >
                    <div style="display:flex">
                      <el-input v-model="$store.state.project.add_DTU.params.induction2"></el-input>
                      <p style="width:40px">h</p>
                    </div>
                  </el-form-item>
                  <el-form-item :label="$store.state.project.add_DTU.params.mode===1||3?$t('lightList.NoDimming_ratio'):$t('lightList.Dimming_ratio')">
                    <div style="display:flex">
                      <el-input v-model="$store.state.project.add_DTU.params.light2"></el-input>
                      <p style="width:40px">%</p>
                    </div>
                  </el-form-item>
                  <el-form-item :label="$t('lightList.three_period')">
                    <div style="display:flex">
                      <el-input v-model="$store.state.project.add_DTU.params.time3"></el-input>
                      <p style="width:40px">h</p>
                    </div>
                  </el-form-item>
                  <el-form-item
                    v-if="$store.state.project.add_DTU.params.mode===1||3"
                    :label="$t('lightList.Someone')"
                  >
                    <div style="display:flex">
                      <el-input v-model="$store.state.project.add_DTU.params.induction3"></el-input>
                      <p style="width:40px">h</p>
                    </div>
                  </el-form-item>
                  <el-form-item :label="$store.state.project.add_DTU.params.mode===1||3?$t('lightList.NoDimming_ratio'):$t('lightList.Dimming_ratio')">
                    <div style="display:flex">
                      <el-input v-model="$store.state.project.add_DTU.params.light3"></el-input>
                      <p style="width:40px">%</p>
                    </div>
                  </el-form-item>
                  <el-form-item :label="$t('lightList.four_period')">
                    <div style="display:flex">
                      <el-input v-model="$store.state.project.add_DTU.params.time4"></el-input>
                      <p style="width:40px">h</p>
                    </div>
                  </el-form-item>
                  <el-form-item
                    v-if="$store.state.project.add_DTU.params.mode===1||3"
                    :label="$t('lightList.Someone')"
                  >
                    <div style="display:flex">
                      <el-input v-model="$store.state.project.add_DTU.params.induction4"></el-input>
                      <p style="width:40px">h</p>
                    </div>
                  </el-form-item>

                  <el-form-item :label="$store.state.project.add_DTU.params.mode===1||3?$t('lightList.NoDimming_ratio'):$t('lightList.Dimming_ratio')">
                    <div style="display:flex">
                      <el-input v-model="$store.state.project.add_DTU.params.light4"></el-input>
                      <p style="width:40px">%</p>
                    </div>
                  </el-form-item>
                  <el-form-item :label="$t('lightList.five_period')">
                    <div style="display:flex">
                      <el-input v-model="$store.state.project.add_DTU.params.time5"></el-input>
                      <p style="width:40px">h</p>
                    </div>
                  </el-form-item>
                  <el-form-item
                    v-if="$store.state.project.add_DTU.params.mode===1||3"
                    :label="$t('lightList.Someone')"
                  >
                    <div style="display:flex">
                      <el-input v-model="$store.state.project.add_DTU.params.induction5"></el-input>
                      <p style="width:40px">h</p>
                    </div>
                  </el-form-item>
                  <el-form-item :label="$store.state.project.add_DTU.params.mode===1||3?$t('lightList.NoDimming_ratio'):$t('lightList.Dimming_ratio')">
                    <div style="display:flex">
                      <el-input v-model="$store.state.project.add_DTU.params.light5"></el-input>
                      <p style="width:40px">%</p>
                    </div>
                  </el-form-item>
                </div>
                <div v-show="$store.state.project.add_DTU.params.mode===2">
                  <el-form-item :label="$t('lightList.Delay')">
                    <div style="display:flex">
                      <el-input v-model="$store.state.project.add_DTU.params.delaytime"></el-input>
                      <p style="width:40px">S</p>
                    </div>
                  </el-form-item>
                  <el-form-item :label="$t('lightList.Percentage_of_people')">
                    <div style="display:flex">
                      <el-input v-model="$store.state.project.add_DTU.params.menlight"></el-input>
                      <p style="width:40px">%</p>
                    </div>
                  </el-form-item>
                  <el-form-item :label="$t('lightList.Percentage_of_people')">
                    <div style="display:flex">
                      <el-input v-model="$store.state.project.add_DTU.params.nomenlight"></el-input>
                      <p style="width:40px">%</p>
                    </div>
                  </el-form-item>
                </div>
                <div v-show="$store.state.project.add_DTU.params.mode===3">
                  <el-form-item :label="$t('lightList.Morning_hours')">
                    <div style="display:flex">
                      <el-input v-model="$store.state.project.add_DTU.params.mtime"></el-input>
                      <p style="width:40px">%</p>
                    </div>
                  </el-form-item>
                  <el-form-item :label="$t('lightList.Morning_light_ratio')">
                    <div style="display:flex">
                      <el-input v-model="$store.state.project.add_DTU.params.mlight"></el-input>
                      <p style="width:40px">%</p>
                    </div>
                  </el-form-item>
                </div>
                <!-- <el-form-item>
                  <el-button type="primary">更新</el-button>
                </el-form-item> -->
              </el-form>
            </el-tab-pane>
          </el-tabs>
          <span
            slot="footer"
            class="dialog-footer"
          >
            <el-button @click="add_DTU = false">{{$t('search.cancel')}}</el-button>
            <el-button
              type="primary"
              @click="addDTUClick"
            >{{$t('search.add')}}</el-button>
            <p style="text-align: center;line-height:18px;">{{$t('inputMessage.tip')}}</p>

          </span>
        </el-dialog>
      </div>

      <!-- dtu参数添加修改 -->
      <div class="dialog-boxs">
        <el-dialog
          :visible.sync="isSetDTUData"
          width="100%"
          top="0"
          :modal='false'
          :close-on-click-modal="false"
          :modal-append-to-body='false'
          :append-to-body='false'
        >
          <el-tabs
            v-model="activeName"
            type="border-card"
          >
            <el-tab-pane
              :label="$t('lightList.terminal')"
              name="first"
            >
              <el-form
                ref="dtuData"
                label-width="80px"
                :rules="rules"
                :model="$store.state.project.setDTUData"
              >
                <el-form-item
                  prop="name"
                  :label="$t('lightList.name')"
                >
                  <el-input v-model="$store.state.project.setDTUData.name"></el-input>
                </el-form-item>
                <el-form-item
                  :label="$t('lightList.longitude')"
                  prop="longitude"
                >
                  <el-input v-model="$store.state.project.setDTUData.longitude"></el-input>
                </el-form-item>
                <el-form-item
                  :label="$t('lightList.latitude')"
                  prop="latitude"
                >
                  <el-input v-model="$store.state.project.setDTUData.latitude"></el-input>
                </el-form-item>
                <el-form-item
                  :label="$t('lightList.UID')"
                  prop="tel"
                >
                  <el-input v-model="$store.state.project.setDTUData.tel"></el-input>
                </el-form-item>
                <el-form-item
                  prop="phoneNo"
                  label="Phone No"
                >
                  <el-input v-model="$store.state.project.setDTUData.phoneNo"></el-input>
                </el-form-item>
                <el-form-item
                  class="iptWidth"
                  :label="$t('DTU_list.Heartbeat')"
                  prop="poll"
                >
                  <el-input v-model="$store.state.project.setDTUData.poll"></el-input> &nbsp&nbsp&nbspsec
                </el-form-item>
                <el-form-item
                  class="iptWidth"
                  :label="$t('DTU_list.The_sampling_period')"
                  prop="sendtime"
                >
                  <el-input v-model="$store.state.project.setDTUData.sendtime"></el-input>&nbsp&nbsp&nbspmin
                </el-form-item>
                <!-- <el-form-item>
                  <el-button @click="isSetDTUData = false">{{$t('search.cancel')}}</el-button>
                  <el-button
                    type="primary"
                    @click="setDTUClick"
                  >{{$t('peopel_list.save')}}</el-button>
                </el-form-item> -->
              </el-form>
              <p style="text-align: center;line-height:18px;">{{$t('inputMessage.tip')}}</p>
            </el-tab-pane>
            <el-tab-pane
              :label="$t('lightList.parameter')"
              name="second"
            >
              <el-form
                class="linghtData"
                ref="$store.state.project.setDTUData"
                label-width="80px"
                :rules="rules"
                :model="$store.state.project.setDTUData"
              >
                <el-form-item
                  :label="$t('lightList.Street_lamp_model')"
                  prop="typeId"
                >
                  <el-select
                    v-model="$store.state.project.setDTUData.typeId"
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
                    v-model="$store.state.project.setDTUData.params.mode"
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
                      v-model="$store.state.project.setDTUData.params.current"
                    ></el-input>
                    <p style="width:40px">mA</p>
                  </div>
                </el-form-item>
                <div v-show="$store.state.project.setDTUData.params.mode!==2">
                  <el-form-item
                    :label="$t('lightList.First_period')"
                    prop="time1"
                  >
                    <div style="display:flex">
                      <el-input v-model="$store.state.project.setDTUData.params.time1"></el-input>
                      <p style="width:40px">h</p>
                    </div>
                  </el-form-item>
                  <el-form-item
                    v-if="$store.state.project.setDTUData.params.mode===1||3"
                    :label="$t('lightList.Someone')"
                  >
                    <div style="display:flex">
                      <el-input v-model="$store.state.project.setDTUData.params.induction1"></el-input>
                      <p style="width:40px">h</p>
                    </div>
                  </el-form-item>
                  <el-form-item :label="$store.state.project.setDTUData.params.mode===1||3?$t('lightList.NoDimming_ratio'):$t('lightList.Dimming_ratio')">
                    <div style="display:flex">
                      <el-input v-model="$store.state.project.setDTUData.params.light1"></el-input>
                      <p style="width:40px">%</p>
                    </div>
                  </el-form-item>
                  <el-form-item :label="$t('lightList.two_period')">
                    <div style="display:flex">
                      <el-input v-model="$store.state.project.setDTUData.params.time2"></el-input>
                      <p style="width:40px">h</p>
                    </div>
                  </el-form-item>
                  <el-form-item
                    v-if="$store.state.project.setDTUData.params.mode===1||3"
                    :label="$t('lightList.Someone')"
                  >
                    <div style="display:flex">
                      <el-input v-model="$store.state.project.setDTUData.params.induction2"></el-input>
                      <p style="width:40px">h</p>
                    </div>
                  </el-form-item>
                  <el-form-item :label="$store.state.project.setDTUData.params.mode===1||3?$t('lightList.NoDimming_ratio'):$t('lightList.Dimming_ratio')">
                    <div style="display:flex">
                      <el-input v-model="$store.state.project.setDTUData.params.light2"></el-input>
                      <p style="width:40px">%</p>
                    </div>
                  </el-form-item>
                  <el-form-item :label="$t('lightList.three_period')">
                    <div style="display:flex">
                      <el-input v-model="$store.state.project.setDTUData.params.time3"></el-input>
                      <p style="width:40px">h</p>
                    </div>
                  </el-form-item>
                  <el-form-item
                    v-if="$store.state.project.setDTUData.params.mode===1||3"
                    :label="$t('lightList.Someone')"
                  >
                    <div style="display:flex">
                      <el-input v-model="$store.state.project.setDTUData.params.induction3"></el-input>
                      <p style="width:40px">h</p>
                    </div>
                  </el-form-item>
                  <el-form-item :label="$store.state.project.setDTUData.params.mode===1||3?$t('lightList.NoDimming_ratio'):$t('lightList.Dimming_ratio')">
                    <div style="display:flex">
                      <el-input v-model="$store.state.project.setDTUData.params.light3"></el-input>
                      <p style="width:40px">%</p>
                    </div>
                  </el-form-item>
                  <el-form-item :label="$t('lightList.four_period')">
                    <div style="display:flex">
                      <el-input v-model="$store.state.project.setDTUData.params.time4"></el-input>
                      <p style="width:40px">h</p>
                    </div>
                  </el-form-item>
                  <el-form-item
                    v-if="$store.state.project.setDTUData.params.mode===1||3"
                    :label="$t('lightList.Someone')"
                  >
                    <div style="display:flex">
                      <el-input v-model="$store.state.project.setDTUData.params.induction4"></el-input>
                      <p style="width:40px">h</p>
                    </div>
                  </el-form-item>

                  <el-form-item :label="$store.state.project.setDTUData.params.mode===1||3?$t('lightList.NoDimming_ratio'):$t('lightList.Dimming_ratio')">
                    <div style="display:flex">
                      <el-input v-model="$store.state.project.setDTUData.params.light4"></el-input>
                      <p style="width:40px">%</p>
                    </div>
                  </el-form-item>
                  <el-form-item :label="$t('lightList.five_period')">
                    <div style="display:flex">
                      <el-input v-model="$store.state.project.setDTUData.params.time5"></el-input>
                      <p style="width:40px">h</p>
                    </div>
                  </el-form-item>
                  <el-form-item
                    v-if="$store.state.project.setDTUData.params.mode===1||3"
                    :label="$t('lightList.Someone')"
                  >
                    <div style="display:flex">
                      <el-input v-model="$store.state.project.setDTUData.params.induction5"></el-input>
                      <p style="width:40px">h</p>
                    </div>
                  </el-form-item>
                  <el-form-item :label="$store.state.project.setDTUData.params.mode===1||3?$t('lightList.NoDimming_ratio'):$t('lightList.Dimming_ratio')">
                    <div style="display:flex">
                      <el-input v-model="$store.state.project.setDTUData.params.light5"></el-input>
                      <p style="width:40px">%</p>
                    </div>
                  </el-form-item>
                </div>
                <div v-show="$store.state.project.setDTUData.params.mode===2">
                  <el-form-item :label="$t('lightList.Delay')">
                    <div style="display:flex">
                      <el-input v-model="$store.state.project.setDTUData.params.delaytime"></el-input>
                      <p style="width:40px">S</p>
                    </div>
                  </el-form-item>
                  <el-form-item :label="$t('lightList.Percentage_of_people')">
                    <div style="display:flex">
                      <el-input v-model="$store.state.project.setDTUData.params.menlight"></el-input>
                      <p style="width:40px">%</p>
                    </div>
                  </el-form-item>
                  <el-form-item :label="$t('lightList.Percentage_of_people')">
                    <div style="display:flex">
                      <el-input v-model="$store.state.project.setDTUData.params.nomenlight"></el-input>
                      <p style="width:40px">%</p>
                    </div>
                  </el-form-item>
                </div>
                <div v-show="$store.state.project.setDTUData.params.mode===3">
                  <el-form-item :label="$t('lightList.Morning_hours')">
                    <div style="display:flex">
                      <el-input v-model="$store.state.project.setDTUData.params.mtime"></el-input>
                      <p style="width:40px">%</p>
                    </div>
                  </el-form-item>
                  <el-form-item :label="$t('lightList.Morning_light_ratio')">
                    <div style="display:flex">
                      <el-input v-model="$store.state.project.setDTUData.params.mlight"></el-input>
                      <p style="width:40px">%</p>
                    </div>
                  </el-form-item>
                </div>
                <!-- <el-form-item>
                  <el-button type="primary">{{$t('peopel_list.save')}}</el-button>
                </el-form-item> -->
              </el-form>
            </el-tab-pane>
          </el-tabs>
          <span
            slot="footer"
            class="dialog-footer"
          >
            <el-button @click="isSetDTUData = false">{{$t('search.cancel')}}</el-button>
            <el-button
              type="primary"
              @click="setDTUClick"
            >{{$t('peopel_list.save')}}</el-button>
          </span>
        </el-dialog>
      </div>
      <!-- 路灯修改 -->
      <div class="dialog-boxs">
        <el-dialog
          :visible.sync="$store.state.project.set_light"
          width="100%"
          top="0"
          :modal='false'
          :close-on-click-modal="false"
          :modal-append-to-body='false'
          :append-to-body='false'
        >
          <el-tabs
            v-model="activeName"
            type="border-card"
          >
            <el-tab-pane
              :label="$t('lightList.terminal')"
              name="first"
            >
              <el-form
                ref="light_form"
                label-width="80px"
                :rules="rules"
                :model="$store.state.project.set_parameter"
              >
                <el-form-item
                  prop="name"
                  :label="$t('lightList.name')"
                >
                  <el-input v-model="$store.state.project.set_parameter.name"></el-input>
                </el-form-item>
                <el-form-item
                  :label="$t('lightList.longitude')"
                  prop="longitude"
                >
                  <el-input v-model="$store.state.project.set_parameter.longitude"></el-input>
                </el-form-item>
                <el-form-item
                  :label="$t('lightList.latitude')"
                  prop="latitude"
                >
                  <el-input v-model="$store.state.project.set_parameter.latitude"></el-input>
                </el-form-item>
                <el-form-item
                  :label="$t('lightList.UID')"
                  prop="uid"
                >
                  <el-input v-model="$store.state.project.set_parameter.uid"></el-input>
                </el-form-item>
                <!-- <el-form-item>
                  <el-button
                    type="primary"
                    @click="cancelClick"
                  >{{$t('tips.cancel')}}</el-button>
                  <el-button
                    type="primary"
                    @click="handerClickSet"
                  >{{$t('peopel_list.save')}}</el-button>
                </el-form-item> -->
              </el-form>
            </el-tab-pane>
            <el-tab-pane
              :label="$t('lightList.parameter')"
              name="second"
            >
              <el-form
                ref="light_form."
                label-width="80px"
                :rules="rules"
                :model="$store.state.project.set_parameter"
              >
                <el-form-item
                  :label="$t('lightList.Street_lamp_model')"
                  prop="typeId"
                >
                  <el-select
                    v-model="$store.state.project.set_parameter.typeId"
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
                    v-model="$store.state.project.set_parameter.params.mode"
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
                      v-model="$store.state.project.set_parameter.params.current"
                    ></el-input>
                    <p style="width:40px">mA</p>
                  </div>
                </el-form-item>
                <div v-show="$store.state.project.set_parameter.params.mode!==2">
                  <el-form-item
                    :label="$t('lightList.First_period')"
                    prop="time1"
                  >
                    <div style="display:flex">
                      <el-input v-model="$store.state.project.set_parameter.params.time1"></el-input>
                      <p style="width:40px">h</p>
                    </div>
                  </el-form-item>
                  <el-form-item
                    v-if="$store.state.project.set_parameter.params.mode===1||3"
                    :label="$t('lightList.Someone')"
                  >
                    <div style="display:flex">
                      <el-input v-model="$store.state.project.set_parameter.params.induction1"></el-input>
                      <p style="width:40px">h</p>
                    </div>
                  </el-form-item>
                  <el-form-item :label="$store.state.project.set_parameter.params.mode===1||3?$t('lightList.NoDimming_ratio'):$t('lightList.Dimming_ratio')">
                    <div style="display:flex">
                      <el-input v-model="$store.state.project.set_parameter.params.light1"></el-input>
                      <p style="width:40px">%</p>
                    </div>
                  </el-form-item>
                  <el-form-item :label="$t('lightList.two_period')">
                    <div style="display:flex">
                      <el-input v-model="$store.state.project.set_parameter.params.time2"></el-input>
                      <p style="width:40px">h</p>
                    </div>
                  </el-form-item>
                  <el-form-item
                    v-if="$store.state.project.set_parameter.params.mode===1||3"
                    :label="$t('lightList.Someone')"
                  >
                    <div style="display:flex">
                      <el-input v-model="$store.state.project.set_parameter.params.induction2"></el-input>
                      <p style="width:40px">h</p>
                    </div>
                  </el-form-item>
                  <el-form-item :label="$store.state.project.set_parameter.params.mode===1||3?$t('lightList.NoDimming_ratio'):$t('lightList.Dimming_ratio')">
                    <div style="display:flex">
                      <el-input v-model="$store.state.project.set_parameter.params.light2"></el-input>
                      <p style="width:40px">%</p>
                    </div>
                  </el-form-item>
                  <el-form-item :label="$t('lightList.three_period')">
                    <div style="display:flex">
                      <el-input v-model="$store.state.project.set_parameter.params.time3"></el-input>
                      <p style="width:40px">h</p>
                    </div>
                  </el-form-item>
                  <el-form-item
                    v-if="$store.state.project.set_parameter.params.mode===1||3"
                    :label="$t('lightList.Someone')"
                  >
                    <div style="display:flex">
                      <el-input v-model="$store.state.project.set_parameter.params.induction3"></el-input>
                      <p style="width:40px">h</p>
                    </div>
                  </el-form-item>
                  <el-form-item :label="$store.state.project.set_parameter.params.mode===1||3?$t('lightList.NoDimming_ratio'):$t('lightList.Dimming_ratio')">
                    <div style="display:flex">
                      <el-input v-model="$store.state.project.set_parameter.params.light3"></el-input>
                      <p style="width:40px">%</p>
                    </div>
                  </el-form-item>
                  <el-form-item :label="$t('lightList.four_period')">
                    <div style="display:flex">
                      <el-input v-model="$store.state.project.set_parameter.params.time4"></el-input>
                      <p style="width:40px">h</p>
                    </div>
                  </el-form-item>
                  <el-form-item
                    v-if="$store.state.project.set_parameter.params.mode===1||3"
                    :label="$t('lightList.Someone')"
                  >
                    <div style="display:flex">
                      <el-input v-model="$store.state.project.set_parameter.params.induction4"></el-input>
                      <p style="width:40px">h</p>
                    </div>
                  </el-form-item>

                  <el-form-item :label="$store.state.project.set_parameter.params.mode===1||3?$t('lightList.NoDimming_ratio'):$t('lightList.Dimming_ratio')">
                    <div style="display:flex">
                      <el-input v-model="$store.state.project.set_parameter.params.light4"></el-input>
                      <p style="width:40px">%</p>
                    </div>
                  </el-form-item>
                  <el-form-item :label="$t('lightList.five_period')">
                    <div style="display:flex">
                      <el-input v-model="$store.state.project.set_parameter.params.time5"></el-input>
                      <p style="width:40px">h</p>
                    </div>
                  </el-form-item>
                  <el-form-item
                    v-if="$store.state.project.set_parameter.params.mode===1||3"
                    :label="$t('lightList.Someone')"
                  >
                    <div style="display:flex">
                      <el-input v-model="$store.state.project.set_parameter.params.induction5"></el-input>
                      <p style="width:40px">h</p>
                    </div>
                  </el-form-item>
                  <el-form-item :label="$store.state.project.set_parameter.params.mode===1||3?$t('lightList.NoDimming_ratio'):$t('lightList.Dimming_ratio')">
                    <div style="display:flex">
                      <el-input v-model="$store.state.project.set_parameter.params.light5"></el-input>
                      <p style="width:40px">%</p>
                    </div>
                  </el-form-item>
                </div>
                <div v-show="$store.state.project.set_parameter.params.mode===2">
                  <el-form-item :label="$t('lightList.Delay')">
                    <div style="display:flex">
                      <el-input v-model="$store.state.project.set_parameter.params.delaytime"></el-input>
                      <p style="width:40px">S</p>
                    </div>
                  </el-form-item>
                  <el-form-item :label="$t('lightList.Percentage_of_people')">
                    <div style="display:flex">
                      <el-input v-model="$store.state.project.set_parameter.params.menlight"></el-input>
                      <p style="width:40px">%</p>
                    </div>
                  </el-form-item>
                  <el-form-item :label="$t('lightList.Percentage_of_people')">
                    <div style="display:flex">
                      <el-input v-model="$store.state.project.set_parameter.params.nomenlight"></el-input>
                      <p style="width:40px">%</p>
                    </div>
                  </el-form-item>
                </div>
                <div v-show="$store.state.project.set_parameter.params.mode===3">
                  <el-form-item :label="$t('lightList.Morning_hours')">
                    <div style="display:flex">
                      <el-input v-model="$store.state.project.set_parameter.params.mtime"></el-input>
                      <p style="width:40px">%</p>
                    </div>
                  </el-form-item>
                  <el-form-item :label="$t('lightList.Morning_light_ratio')">
                    <div style="display:flex">
                      <el-input v-model="$store.state.project.set_parameter.params.mlight"></el-input>
                      <p style="width:40px">%</p>
                    </div>
                  </el-form-item>
                </div>
                <!-- <el-form-item>
                  <el-button @click="$store.state.project.set_light = false">取 消</el-button>
                  <el-button
                    type="primary"
                    @click="handerClickSet"
                  >{{$t('peopel_list.save')}}</el-button>
                </el-form-item> -->
              </el-form>
            </el-tab-pane>
          </el-tabs>
          <span
            slot="footer"
            class="dialog-footer"
          >
            <el-button
              type="primary"
              @click="cancelClick"
            >{{$t('tips.cancel')}}</el-button>
            <el-button
              type="primary"
              @click="handerClickSet"
            >{{$t('peopel_list.save')}}</el-button>

          </span>

        </el-dialog>
      </div>
    </div>
    <!-- 读取 -->
    <el-dialog
      :title="$t('lightList.LampControl')"
      :visible.sync="read"
      width="400px"
      class="readBox"
      :modal='false'
    >
      <!-- 进度条 -->
      <!-- <div>
        <el-progress
          :text-inside="true"
          :stroke-width="24"
          :percentage="progress"
          status="success"
        ></el-progress>
      </div> -->
      <div style="margin-top:20px;border:1px solid #eee;">
        <!-- 进度条 -->
        <div class="updata_box">

        </div>
        <ul style="background:#fff;">
          <li style="padding:0 10px;display:flex;font-weight:600;border-bottom:1px solid #eee;font-size:16px;line-height:24px">
            <span style="width:130px">No.</span>
            <span style="width:220px;display:inline-block;text-align:center">RTU</span>
            <span style="width:130px;text-align:center">{{$t('warnList.status')}}</span>
          </li>
          <li style="padding:0 10px;display:flex;font-size:16px;line-height:24px">
            <span style="width:130px">1</span>
            <span style="width:220px;text-align:center">{{rtuDetail.name}}</span>
            <span style="width:130px;text-align:center">
              <span v-if="readList.state===0">获取权限中</span>
              <span v-if="readList.state===1">已获得权限</span>
              <span v-if="readList.state===2">获取权限失败</span>
              <span v-if="readList.state===3">释放权限 </span>
            </span>
          </li>
        </ul>
      </div>
      <div>
        <!-- 数据要改 -->
        <ul class="light_title">
          <li>{{$t('mapBox.parameter')}}</li>
          <li style="text-align:center;margin-left:30px">{{$t('mapBox.database')}}</li>
          <li style="margin-right:30px">{{$t('mapBox.equipment')}}</li>
        </ul>
        <ul class="light_dataNum">
          <li>
            <span>{{$t('lightList.Drive_mode')}}(mA)</span>
            <span v-if="rtuDetail.params.mode!==''">{{$t(`task_mode.mode[${rtuDetail.params.mode}]`)}}</span>
            <span><span v-if="rtuconfig.mode>=0">{{$t(`task_mode.mode[${rtuconfig.mode}]`)}}</span></span>

          </li>
          <li>
            <span>{{$t('lightList.Drive_current')}}(h)</span>
            <span>{{rtuDetail.params.current}}</span>
            <span>{{rtuconfig.current}}</span>
          </li>
          <li>
            <span>{{$t('lightList.First_period')}}(h)</span>
            <span>{{rtuDetail.params.time1}}</span>
            <span>{{rtuconfig.time1}}</span>
          </li>
          <li>
            <span>{{$t('lightList.Dimming_ratio')}}(%)</span>
            <span>{{rtuDetail.params.light1}}</span>
            <span>{{rtuconfig.light1}}</span>
          </li>
          <li>
            <span>{{$t('lightList.two_period')}}(h)</span>
            <span>{{rtuDetail.params.time2}}</span>
            <span>{{rtuconfig.time2}}</span>
          </li>
          <li>
            <span>{{$t('lightList.Dimming_ratio')}}(%)</span>
            <span>{{rtuDetail.params.light2}}</span>
            <span>{{rtuconfig.light2}}</span>
          </li>
          <li>
            <span>{{$t('lightList.three_period')}}(h)</span>
            <span>{{rtuDetail.params.time3}}</span>
            <span>{{rtuconfig.time3}}</span>
          </li>
          <li>
            <span>{{$t('lightList.Dimming_ratio')}}(%)</span>
            <span>{{rtuDetail.params.light3}}</span>
            <span>{{rtuconfig.light3}}</span>
          </li>
          <li>
            <span>{{$t('lightList.four_period')}}(h)</span>
            <span>{{rtuDetail.params.time4}}</span>
            <span>{{rtuconfig.time4}}</span>
          </li>
          <li>
            <span>{{$t('lightList.Dimming_ratio')}}(%)</span>
            <span>{{rtuDetail.params.light4}}</span>
            <span>{{rtuconfig.light4}}</span>
          </li>
          <li>
            <span>{{$t('lightList.five_period')}}(h)</span>
            <span>{{rtuDetail.params.time5}}</span>
            <span>{{rtuconfig.time5}}</span>
          </li>
          <li>
            <span>{{$t('lightList.Dimming_ratio')}}(%)</span>
            <span>{{rtuDetail.params.light5}}</span>
            <span>{{rtuconfig.light5}}</span>
          </li>
        </ul>
        <ul class="
                light_title">
          <li>{{$t('mapBox.Battery_parameters')}}</li>
          <li>{{$t('mapBox.database')}}</li>
          <li style="margin-right:20px">{{$t('mapBox.equipment')}}</li>

        </ul>
        <ul class="light_dataNum">
          <li>
            <span>{{$t('Street_lamp_management.Lighting_PV_voltage')}}(V)</span>
            <span>{{light[0].pvon}}</span>
            <span>{{batteryconfig.pvon}}</span>
          </li>
          <li>
            <span>{{$t('Street_lamp_management.type_of_battery')}}</span>
            <span v-if="light[0].batterytype===0">{{$t('lightList.Lead_batteries')}}</span>
            <span v-if="light[0].batterytype===1">{{$t('lightList.lithium')}}</span>
            <span>{{batterys[batteryconfig.batterytype]}}</span>
          </li>
          <li>
            <span>{{$t('Street_lamp_management.Charge_voltage')}}(V)</span>
            <span>{{light[0].avchargev}}</span>
            <span>{{batteryconfig.avchargev}}</span>
          </li>
          <li v-if="light[0].batterytype!==1">
            <span>{{$t('Street_lamp_management.Float_voltage')}}(V)</span>
            <span>{{light[0].fchargev}}</span>
            <span>{{batteryconfig.fchargev}}</span>
          </li>
          <li>
            <span>{{$t('Street_lamp_management.Undervoltage_protection')}}(V)</span>
            <span>{{light[0].protectv}}</span>
            <span>{{batteryconfig.protectv}}</span>
          </li>
          <li>
            <span>{{$t('Street_lamp_management.Voltaje_de_recuperación')}}(V)</span>
            <span>{{light[0].recoverv}}</span>
            <span>{{batteryconfig.recoverv}}</span>
          </li>
          <li>
            <span>{{$t('Street_lamp_management.Energy_management')}}</span>
            <span v-if="light[0].engerymanage===0">{{$t('lightList.Disable')}}</span>
            <span v-if="light[0].engerymanage===1">{{$t('lightList.Mode_one')}}</span>
            <span v-if="light[0].engerymanage===2">{{$t('lightList.Mode_two')}}</span>
            <span>{{engerys[batteryconfig.engerymanage]}}</span>
          </li>
          <!-- 温度补偿 -->
          <!-- <li>
            <span>{{$t('Street_lamp_management.Temperature_compensation')}}(mV/°C)</span>
            <span>{{light[0].temperaturecompensation}}</span>
            <span>{{batteryconfig.temperaturecompensation}}</span>
          </li> -->
          <li>
            <span>{{$t('Street_lamp_management.Derating_start_voltage')}}</span>
            <span>{{light[0].vderatestart}}</span>
            <span>{{batteryconfig.vderatestart}}</span>
          </li>
          <li>
            <span>{{$t('Street_lamp_management.Derating_end_voltage')}}</span>
            <span>{{light[0].vderateend}}</span>
            <span>{{batteryconfig.vderateend}}</span>
          </li>
        </ul>
      </div>
      <span
        slot="footer"
        class="dialog-footer"
      >
        <el-button @click="read = false">{{$t('search.cancel')}}</el-button>
        <el-button
          type="primary"
          @click="read = false"
        >{{$t('search.confirm')}}</el-button>
      </span>
    </el-dialog>
    <!-- 项目修改 -->
    <div class="dialog_content">
      <div class="detail_boxs">
        <el-dialog
          :title="$t('mapBox.Project_positioning')"
          :visible.sync="project_dialog"
          width="100%"
          :modal='false'
          :close-on-click-modal="false"
          :modal-append-to-body='false'
          :append-to-body='false'
        >
          <el-form
            :model="$store.state.project.detail_project"
            label-width="70px"
          >
            <el-form-item
              :label="$t('system.project')"
              prop="pass"
            >
              <el-input
                v-model="$store.state.project.detail_project.name"
                :disabled="true"
              ></el-input>
            </el-form-item>
            <el-form-item :label="$t('lightList.longitude')">
              <el-input
                v-model="$store.state.project.detail_project.longitude"
                :disabled="true"
              ></el-input>
            </el-form-item>
            <el-form-item
              :label="$t('lightList.latitude')"
              prop="pass"
            >
              <el-input
                v-model="$store.state.project.detail_project.latitude"
                :disabled="true"
              ></el-input>
            </el-form-item>
            <el-form-item
              :label="$t('system.description')"
              prop="pass"
            >
              <el-input v-model="$store.state.project.detail_project.description"></el-input>
            </el-form-item>
          </el-form>

          <span
            slot="footer"
            class="dialog-footer"
          >
            <el-button @click="project_dialog = false">{{$t('search.cancel')}}</el-button>
            <el-button
              type="primary"
              @click="project_dialogClick"
            >{{$t('peopel_list.save')}}</el-button>
            <p style="text-align:center">{{$t('inputMessage.tip')}}</p>

          </span>
        </el-dialog>
      </div>
    </div>
    <!-- 添加地区 -->
    <MapArea
      :rtus='rtus'
      :dtuareaBtn='dtuareaBtn'
      :areaBtn='areaBtn'
    />
    <!-- 添加路灯终端 -->
    <MapLight ref="light_box" />
    <!--更新终端 -->
    <MapUpdate ref="updata" />
    <Lights ref="lights" />
    <!-- 释放权限 -->
    <div
      class="readDom"
      v-if="readList"
    >
      <el-dialog
        title="提示"
        :visible.sync="rtuUpdata"
        width="30%"
      >
        <span>{{$t('mqttStatus.release')}}</span>
        <div class="updata_box"></div>

        <div
          style="margin-top:20px"
          v-if="readList.state!==undefined"
        >
          <span style="width:130px;text-align:center">
            <span>{{$t(`mqttStatus.privilegeStatus[${readList.state}]`)}}</span>
            <!-- <span v-if="readList.state===0">获取权限中</span>
            <span v-if="readList.state===1">已获得权限</span>
            <span v-if="readList.state===2">获取权限失败</span>
            <span v-if="readList.state===3">释放权限 </span> -->
          </span>
        </div>
        <span
          slot="footer"
          class="dialog-footer"
        >
          <el-button @click="rtuUpdata = false">取 消</el-button>
          <el-button
            type="primary"
            @click="rtuUpdataClick"
          >确 定</el-button>
        </span>
      </el-dialog>
    </div>

  </div>
</template>

<script>
import { ProjectList, ProjectDetail, getProjectTreeBypId, pjconfig } from '@/api/project'
// import mqtt from 'mqtt'
import { system } from '../../../../static/js/SystemOperation'
import { get_netstatus, mstart_send, connect, pjtree } from '@/utils/command/monitormanage'
import { adminReleaseControl } from '@/utils/command/websocket'

import { setRtu, removeRtu, rtuone, rtulistbyrootId } from '@/api/rtu'
import { zoneone, zonesDelete } from '@/api/area'
import { setDTU, dtuOne, addDTU, removeDTU } from '@/api/dtu'
import { TypebyAdmin } from '@/api/streetLamp'
import MapArea from './dialog/Map_areaDialog'
import MapLight from './dialog/Map_lightDialog'
import MapUpdate from './dialog/update_terminal'
import Lights from './dialog/lights'
import { log } from 'three'
export default {
  data () {
    let validatePhone = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('手机号不能为空'))
      } else if (!(/^1[34578]\d{9}$/.test(value))) {
        callback(new Error('请输入正确的手机号'))
      } else {
        callback()
      }
    }
    return {
      project_dialog: false,
      projectName: '',
      add_DTU: false, // 添加集中器按钮
      lightArray: [], // 路灯模板
      areaBtn: false,
      dtuareaBtn: false,
      rtus: [],
      progress: 0, // 进度条
      timer: '', // 计时器
      read: false,
      isSetDTUData: false, // DTU修改弹框
      isShow: 0,
      options: [],
      value: '',
      activeName: 'first',
      rtuDetail: {
        params: {
          mode: '',
          time1: '',
          time2: '',
          time3: '',
          time4: '',
          time5: '',
          light1: '',
          light2: '',
          light3: '',
          light4: '',
          light5: '',
          current: ''
        },
        lastest: {
          time: 0,
          pvvoltage: 0,
          bvoltage: 0,
          ovoltage: 0,
          ocurrent: 0,
          ccurrent: 0,
          cpower: 0,
          dcpower: 0,
          temperature: 0,
          itemperature: 0,
          state: 0,
          warn: 0,
          pvcurrent: '',
          maxCpower: '',
          maxDpower: '',
          cstate: '',
          daysolar: '',
          dayUseSolar: '0'
        }
      },
      rtuconfig: {},
      batteryconfig: {},
      batterys: [],
      engerys: [],
      light: [
        {
          'pvon': 5,
          'batterytype': 1,
          'avchargev': 12,
          'fchargev': 13.6,
          'protectv': 8.5,
          'recoverv': 10,
          'engerymanage': 2,
          'temperaturecompensation': 4,
          'vderatestart': 9.5,
          'vderateend': 9.5,
          'overvoltage': 0,
          'boostrecoverv': 0,
          '_id': '5f7187143494983110f03885',
          'name': 'HawkTest_11',
          'loadlumen': '120',
          'batterycapacity': '5',
          'solarpower': '5'
        }
      ],
      readList: {},
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
      rtuUpdata: false, // 释放权限
      rules: {
        name: [
          { required: true, message: this.$t('inputMessage.name'), trigger: 'blur' }
        ],
        longitude: [
          { required: true, message: this.$t('rules.longitude'), trigger: 'blur' }
        ],
        latitude: [
          { required: true, message: this.$t('rules.latitude'), trigger: 'blur' }
        ],
        _id: [
          { required: true, message: this.$t('rules._id'), trigger: 'blur' }
        ],
        phoneNo: [
          { required: true, validator: validatePhone, trigger: 'blur' }
        ],
        poll: [
          { required: true, message: this.$t('rules.poll'), trigger: 'blur' }
        ],
        sendtime: [
          { required: true, message: this.$t('rules.sendtime'), trigger: 'blur' }
        ],
        typeId: [
          { required: true, message: this.$t('rules.typeId'), trigger: 'blur' }
        ],
        mode: [
          { required: true, message: this.$t('rules.mode'), trigger: 'blur' }
        ],
        time1: [
          { required: true, message: this.$t('rules.time1'), trigger: 'blur' }
        ]
      }

    }
  },
  components: {
    MapArea,
    MapLight,
    MapUpdate,
    Lights
  },
  computed: {
    num () {
      return this.$store.state.project.dtuListData
    }
  },
  watch: {
    num: function (newVal, endVal) {
      console.log(newVal)
      console.log(endVal)
      if (newVal) {
        return newVal
      }
    },
    updata: function (newVal, endVal) {
      console.log(newVal)
      console.log(endVal)
    },
    batteryconfig: {
      handler (newVal, endVal) {
        return newVal
        //   console.log(newVal)
        //   if (newVal && newVal.length !== 0) {
        //     if (newVal.state === 2 && newVal.state !== endVal.state) {
        //       this.rtuUpdata = true
        //     }
        //   }
      }
      // deep: true,
      // immediate: true

    },
    readList: {
      handler (newVal, endVal) {
        console.log(newVal, endVal)
        if (newVal && newVal.length !== 0) {
          console.log(newVal)
          if (newVal.state === 2) {
            this.rtuUpdata = true
          }
        }
      },
      deep: true
      // immediate: true
    }
  },
  mounted () {
    this.getProject()
    this.setLightData()
    if (sessionStorage.getItem('language') == 'cn') {
      this.batterys = ['铅酸电池', '锂电池']
      this.engerys = ['不使能', '模式一', '模式二']
    } else if (sessionStorage.getItem('language') == 'en') {
      this.batterys = ['Lead Acid Battery', 'Lithium Battery']
      this.engerys = ['Disabled', 'Mode one', 'Mode two']
    } else {
      this.batterys = ['Batería de ácido de sódio', 'Batería de Litio']
      this.engerys = ['Inhabilitado', 'Modo uno', 'Modo dos']
    }
  },
  methods: {
    // 地图图标动画
    map_icon (val) {
      this.$store.commit('SET_ICON_ID', val._id)
    },
    // 添加集中器
    concentrator () {
      this.add_DTU = true
      this.project_dialog = false
      this.isSetDTUData = false
      // this.$refs.form.resetFields()
      this.$store.commit('add_DTU')
      if (this.$refs.form) {
        this.$refs.form.resetFields()
      }
    },
    // 添加DTU
    addDTUClick () {
      this.$refs.form.validate((valid) => {
        if (valid) {
          addDTU(this.$store.state.project.add_DTU).then(res => {
            this.add_DTU = false
            this.DTUList()
            let user = JSON.parse(sessionStorage.getItem('nomouser'))._id
            let dataLog = {
              userId: user,
              obj: 3,
              dtuname: '',
              operatename: 13,
              operattype: 0,
              time: Date.parse(new Date()),
              description: '添加集中器',
              description_en: 'Add a concentrator',
              description_spain: 'Agregar un concentrador',
              projectId: this.$store.state.project.addLightData.projectId,
              tel: '',
              ip: ''
            }
            system(dataLog)
            this.$message({
              message: this.$t('stateMessage.addSuccess'),
              type: 'success'
            })
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
    // 项目选择
    searchChange () {
      let data = this.options.filter(item => {
        if (item.value === this.$store.state.project.addLightData.projectId) {
          return item
        }
      })
      this.projectName = data[0].label
      ProjectDetail(this.$store.state.project.addLightData.projectId).then(res => {
        let datas = this.lightArray.filter(item => {
          let data = res.lightType
          for (let i = 0; i < res.lightType.length; i++) {
            if (item._id === data[i]) {
              return item
            }
          }
        })
        this.$store.commit('SET_LIGHTTYPE_ARR', datas)
        this.$store.commit('map_center', res)
        this.DTUList()
      }).catch(err => {
        console.log(err)
      })
    },
    // 路灯模板
    setLightData () {
      let data = Math.ceil(Math.random() * 10)
      TypebyAdmin(data).then(res => {
        this.lightArray = res
      }).catch(err => {
        console.log(err)
      })
    },
    // DTU集中器参数修改弹框
    DTU_date_Set (val) {
      this.add_DTU = false
      this.isSetDTUData = true
      this.project_dialog = false

      console.log(val)
      let data = {
        dtuId: val._id
      }
      dtuOne(data).then(res => {
        this.$store.commit('SET_DTU_DATA', res.result)
      }).catch(err => {
        console.log(err)
      })
    },
    // DTU修改确认
    setDTUClick () {
      // let data = {
      //   dtuId: this.$store.state.project.setDTUData._id,
      //   updateDataJson: this.$store.state.project.setDTUData
      // }
      this.$refs.dtuData.validate((valid) => {
        if (valid) {
          setDTU(this.$store.state.project.setDTUData).then(res => {
            console.log(this.$store.state.project.setDTUData)
            this.DTUList()
            let user = JSON.parse(sessionStorage.getItem('nomouser'))._id
            let dataLog = {
              userId: user,
              obj: 3,
              dtuname: this.$store.state.project.setDTUData.name,
              operatename: 15,
              operattype: 0,
              time: Date.parse(new Date()),
              description: '修改集中器',
              description_en: 'Modify concentrator',
              description_spain: 'Modificar concentrador',
              projectId: this.$store.state.project.addLightData.projectId,
              tel: this.$store.state.project.setDTUData.tel,
              ip: ''
            }
            system(dataLog)
            this.$message({
              message: this.$t('stateMessage.alterSuccess'),
              type: 'success'
            })
            this.isSetDTUData = false
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
    // DTU添加地区
    DTU_areaAdd (val) {
      this.add_DTU = false
      this.isSetDTUData = false
      this.$store.commit('SET_AREA_FLAG')
      this.dtuareaBtn = true
      this.areaBtn = false
      // this.add_DTU = false
      this.lightData(val)
    },
    // 路灯终端数据
    lightData (val) {
      this.rtus = []
      this.$store.commit('SET_AREA_DTUID', val._id)
      // 添加地区数据
      let data = {
        rand: Math.ceil(Math.random() * 10),
        dtuId: val._id
      }
      rtulistbyrootId(data).then(res => {
        res.result.map(item => {
          let rtus = {
            'name': item.name,
            'id': item.uid
          }
          this.rtus.push(rtus)
        })
        console.log(this.rtus)
      }).catch(err => {
        console.log(err)
      })
    },
    // 删除DTU
    DTU_delete (val) {
      console.log(val)
      this.$confirm(this.$t('hint.hint_message'), this.$t('hint.prompt'), {
        confirmButtonText: this.$t('search.confirm'),
        cancelButtonText: this.$t('search.cancel'),
        type: 'warning'
      }).then(() => {
        let user = JSON.parse(sessionStorage.getItem('nomouser'))._id
        let dataLog = {
          userId: user,
          obj: 3,
          dtuname: '',
          operatename: 14,
          operattype: 0,
          time: Date.parse(new Date()),
          description: '删除集中器',
          description_en: 'Delete concentrator',
          description_spain: 'Eliminar concentrador',
          projectId: this.$store.state.project.addLightData.projectId,
          tel: val.tel,
          ip: ''
        }
        removeDTU(val._id).then(res => {
          this.DTUList()
          system(dataLog)
          this.$message({
            type: 'success',
            message: this.$t('hint.success')
          })
          console.log(res)
        }).catch(err => {
          console.log(err)
        })
      }).catch(() => {
        console.log('err--------------------------')
        this.$message({
          type: 'info',
          message: this.$t('hint.info')
        })
      })

      // removeDTU(val._id).then(res => {
      //   this.DTUList()

      //   console.log(res)
      // }).catch(err => {
      //   console.log(err)
      // })
    },
    // 地区参数修改
    area_date_Set (val, valID) {
      this.lightData(valID)
      let data = {
        rand: Math.ceil(Math.random() * 10),
        zoneId: val._id
      }
      zoneone(data).then(res => {
        this.$store.commit('SET_AREA_FLAG')
        this.dtuareaBtn = false
        this.areaBtn = true
        this.$store.commit('SET_AREA_CLICK', res)
      }).catch(err => {
        console.log(err)
      })
    },
    // 删除地区
    area_delete (val) {
      console.log(val)
      this.$confirm(this.$t('hint.hint_message'), this.$t('hint.prompt'), {
        confirmButtonText: this.$t('search.confirm'),
        cancelButtonText: this.$t('search.cancel'),
        type: 'warning'
      }).then(() => {
        let user = JSON.parse(sessionStorage.getItem('nomouser'))._id
        let dataLog = {
          userId: user,
          obj: 6,
          dtuname: '',
          operatename: 36,
          operattype: 0,
          time: Date.parse(new Date()),
          description: '删除区域',
          description_en: 'Delete area',
          description_spain: 'Eliminar área',
          projectId: this.$store.state.project.addLightData.projectId,
          tel: '',
          ip: ''
        }
        let data = {
          zoneId: val._id,
          rand: Math.ceil(Math.random() * 10)
        }
        zonesDelete(data).then(res => {
          system(dataLog)
          this.DTUList()
          this.$message({
            type: 'success',
            message: this.$t('hint.success')
          })
        }).catch(err => {
          console.log(err)
        })
      }).catch(() => {
        console.log('err--------------------------')
        this.$message({
          type: 'info',
          message: this.$t('hint.info')
        })
      })
    },
    // 添加路灯参数
    add_light (val) {
      this.add_DTU = false
      this.isSetDTUData = false
      // if (this.$refs.form_light) {
      //   this.$refs.form_light.resetFields()
      // }
      this.$refs.light_box.clean_rules()

      this.$store.commit('SET_LIGHT_FLAG', val._id)
    },
    // 更新集中器终端
    update_terminal (val, index) {
      // this.client.send()
      // this.$refs.updata.changeProgress(val)
      this.$store.commit('DTUTEL', val)
      console.log(val)
      let obj = {}
      obj.type = 'dtu'
      obj.dtuIndex = index
      obj.name = val.name
      obj.tel = val.tel
      obj.poll = val.poll
      obj.sendtime = val.sendtime
      let list = mstart_send(obj, { action: 'updateparams' }, (index, state, dtuIndex) => {
        console.log()
      }
      )
      this.$store.commit('SET_UPDATE_TERMINAL', list)
      this.$store.commit('RTUDATA', [val])

      console.log(list)
    },
    // 修改
    setData (val) {
      this.$emit('sendMessage', val._id)
      this.add_DTU = false
      this.isSetDTUData = false
      this.$store.commit('SET_RTU', true)
      let data = {
        rand: Math.ceil(Math.random() * 10),
        rtuId: val._id
      }
      if (this.$refs.light_form) {
        this.$refs.light_form.resetFields()
      }
      rtuone(data).then(res => {
        this.$store.commit('SET_PARAMETER', res)
        // this.DTUList()
      }).catch(err => {
        console.log(err)
      })
    },
    // 修改确认
    handerClickSet () {
      console.log(1)
      this.$refs.light_form.validate((valid) => {
        if (valid) {
          setRtu(this.$store.state.project.set_parameter).then(res => {
            console.log(res)
          }).catch(err => {
            console.log(err)
          })
          this.$store.commit('SET_RTU', false)
        } else {
          setTimeout(() => {
            var isError = document.getElementsByClassName('is-error')
            isError[0].querySelector('input').focus()
          }, 100)
          return false
        }
      })
    },
    // 取消修改
    cancelClick () {
      this.$store.commit('SET_RTU', false)
    },
    // 读取
    readClick (val, index, dtutel) {
      this.add_DTU = false
      this.isSetDTUData = false
      console.log(dtutel)
      this.$store.commit('DTUTEL', dtutel)
      this.batteryconfig = {}
      let data = {
        rand: Math.ceil(Math.random() * 10),
        rtuId: val._id
      }
      val.rtuIndex = index
      rtuone(data).then(res => {
        this.read = true
        console.log(res)
        this.rtuDetail = res
        // ------------------------------------------
        // {action:"readconfig",tel:<tel>,clientId:<clentId>,objs:<objs>}
        this.rtuconfig = {}
        // 可以根据list渲染命令下发进度
        console.log('----------------读取')
        let list = mstart_send(val, { action: 'readconfig' }, (result, typeparams) => {
          // 返回结果   数据渲染
          this.rtuconfig = result
          console.log(result)
          console.log(typeparams)
          console.log(typeparams + '-------------')
          this.batteryconfig = typeparams

          this.light = this.lightArray.filter(item => {
            if (item._id === res.typeId) {
              return item
            }
          })
        })
        console.log(this.light)
        this.readList = list[0]
        console.log(this.batteryconfig)
        // ------------------------------------------
        // {action:"readconfig",tel:<tel>,clientId:<clentId>,objs:<objs>}
        // this.rtuconfig = {}
        // 可以根据list渲染命令下发进度
        // mstart_send(val, { action: 'readconfig' }, result => {
        //   // 返回结果   数据渲染
        //   this.rtuconfig = result
        //   console.log(this.rtuconfig)
        // }).catch(err => {
        //   console.log(err)
        // })
      })
    },
    updateRtu (val, index, dtuTel, zoneIndex) {
      this.$store.commit('DTUTEL', dtuTel)
      let obj = null
      val.rtuIndex = index
      if (val.type === 'rtu') {
        obj = { type: val.type, dtuIndex: val.dtuIndex, uid: val.uid, rtuIndex: val.rtuIndex }
        let data = {
          rand: Math.ceil(Math.random() * 10),
          rtuId: val._id
        }
        rtuone(data).then(res => {
          this.$store.commit('RTUDATA', [res])
          console.log(res)
        })
      } else if (val.type === 'dtu') {
        obj = { type: 'devgroup', dtuIndex: index }
        this.$store.commit('RTUDATA', val.rtuList)
        console.log(val)
      } else if (val.type === 'zone') {
        obj = { type: val.type, dtuIndex: index, no: val.no, index: zoneIndex }
        if (val.rtuList && val.rtuList !== null) {
          this.$store.commit('RTUDATA', val.rtuList)
        } else {
          this.$store.commit('RTUDATA', [])
        }
      }
      let list = mstart_send(obj, { action: 'updatertu' }, (index, state, dtuIndex) => {
        console.log('index: ' + index)
        console.log('state: ' + state)
        console.log('dtuIndex: ' + dtuIndex)
        console.log('-------------------------------------------------')
        let rtuList = this.num.dtuList[dtuIndex].rtuList
        rtuList[index].state = state // 是否在线
      })
      this.$store.commit('SET_UPDATE_TERMINAL', list)
      console.log(list)
    },
    getVersion (val, index, dtuRtuIndex, rtuTel) {
      console.log('获取控制器版本')
      this.$store.commit('DTUTEL', rtuTel)

      let obj = {}
      // val.rtuIndex = index
      if (val.type === 'rtu') {
        obj.type = 'rtu'
        obj.uid = val.uid
        obj.dtuIndex = dtuRtuIndex
        obj.rtuIndex = index
        let list = mstart_send(obj, { action: 'getversion' }, (index, version, dtuIndex) => {
          // 渲染
          console.log('执行回调...')
          console.log(version)
          // http  910  更新数据库
        })
        let data = {
          rand: Math.ceil(Math.random() * 10),
          rtuId: val._id
        }
        console.log(list)
        console.log(this.lightArray)
        // TypebyAdmin(user).then(res => {
        //   console.log(res)
        // })
        console.log(list[0].state)
        rtuone(data).then(res => {
          console.log(res)
          this.$store.commit('RTUDATA', [res])
          console.log(res)
        })
        this.$store.commit('SET_UPDATE_TERMINAL', list)
      } else if (val.type === 'dtu') {
        obj.type = 'devgroup'
        obj.dtuIndex = index
        let list = mstart_send(obj, { action: 'getversion' }, (index, version, dtuIndex) => {
          // 渲染
          console.log('执行回调...')
          console.log(version)
          // http  910  更新数据库
        })
        console.log(list.state)
        this.$store.commit('RTUDATA', val.rtuList)
        this.$store.commit('SET_UPDATE_TERMINAL', list)
      }
      console.log(obj)
    },
    // 获取项目DTU
    DTUList () {
      console.log(111111111111111111111111111111111)
      let data = {
        projectId: this.$store.state.project.addLightData.projectId,
        r: Math.ceil(Math.random() * 10)
      }
      getProjectTreeBypId(data).then(res => {
        if (res.httpCode === 200) {
          let dtuList = res.result.dtuList
          for (let dtuIndex = 0; dtuIndex < dtuList.length; dtuIndex++) {
            let dtu = dtuList[dtuIndex]
            let rtuList = dtu.rtuList ? dtu.rtuList : []
            for (let i = 0; i < rtuList.length; i++) {
              let rtu = rtuList[i]
              rtu.dtuIndex = dtuIndex
            }
          }
          this.$store.commit('DTU_list', res.result)
        } else {
          this.$store.commit('DTU_list', [])
        }
      }).catch(err => {
        console.log(err)
      })
    },
    // 获取项目信息
    getProject () {
      if (this.$route.query.dtu) {
        this.add_DTU = true
      } else {
        this.add_DTU = false
      }
      console.log(this.$route.query.id)
      console.log(this.$store.state.project.addLightData.projectId)
      let str = String(Math.round((Math.random() * 10) + 1))
      let data = {
        userId: this.$store.state.user.nomouser._id,
        r: str
      }
      ProjectList(data).then(res => {
        // console.log(res, '99999999999')
        res.result.filter(item => {
          let data = {
            value: item._id,
            label: item.name
          }
          this.options.push(data)
        })
        if (this.$store.state.project.addLightData.projectId === '') {
          this.$store.commit('PROJECT_ID', this.options[0].value)
        } else {
          this.$store.commit('PROJECT_ID', this.$route.query.id)
        }
        this.searchChange()
        // get_netstatus()
        // console.log(this.options)
      }).catch(err => {
        console.log(err)
      })
    },
    // 删除rtu路灯
    deleteClick (data) {
      this.$confirm(this.$t('hint.hint_message'), this.$t('hint.prompt'), {
        confirmButtonText: this.$t('search.confirm'),
        cancelButtonText: this.$t('search.cancel'),
        type: 'warning'
      }).then(() => {
        let user = JSON.parse(sessionStorage.getItem('nomouser'))._id
        let dataLog = {
          userId: user,
          obj: 4,
          dtuname: '',
          operatename: 17,
          operattype: 0,
          time: Date.parse(new Date()),
          description: '删除终端',
          description_en: 'Delete terminal',
          description_spain: 'Eliminar terminal',
          projectId: this.$store.state.project.addLightData.projectId,
          tel: '',
          ip: ''
        }
        removeRtu(data._id).then(res => {
          console.log(res)
          system(dataLog)
          this.$message({
            type: 'success',
            message: this.$t('hint.success')
          })
          this.DTUList()
        }).catch(err => {
          console.log(err)
        })
      }).catch(() => {
        console.log('err--------------------------')
        this.$message({
          type: 'info',
          message: this.$t('hint.info')
        })
      })
    },
    // 项目定位
    set_project () {
      this.add_DTU = false
      this.isSetDTUData = false

      ProjectDetail(this.$store.state.project.addLightData.projectId).then(res => {
        // console.log('-------------------------')
        // console.log(res)
        // console.log('-------------------------')
        this.project_dialog = true
        // console.log(res)
        this.$store.commit('SET_DETAIL_PROJEXT', res)
      }).catch(err => {
        console.log(err)
      })
    },
    project_dialogClick () {
      pjconfig(this.$store.state.project.detail_project).then(res => {
        let user = JSON.parse(sessionStorage.getItem('nomouser'))._id
        let dataLog = {
          userId: user,
          obj: 1,
          dtuname: '',
          operatename: 12,
          operattype: 0,
          time: Date.parse(new Date()),
          description: '修改项目',
          description_en: 'Modify item',
          description_spain: 'Modificar artículo',
          projectId: this.$store.state.project.addLightData.projectId,
          tel: '',
          ip: ''
        }
        system(dataLog)
        this.$message({
          message: this.$t('stateMessage.addSuccess'),
          type: 'success'
        })
        this.project_dialog = false
        console.log(res)
      }).catch(err => {
        console.log(err)
      })
    },
    // 设备权限释放
    rtuUpdataClick () {
      console.log(this.$store.state.project.dtuTel)
      adminReleaseControl(this.$store.state.project.dtuTel)
    }
  }
}
</script>

<style lang="scss" scoped>
.nav_tree {
  position: relative;
  min-width: 330px;
  background: #0f1843;
  height: 100%;
  overflow-y: auto;
  font-size: 12px;
  line-height: 12px;
  box-sizing: border-box;
  border-radius: 0 0 5px 5px;
  // overflow-x: hidden;
  color: #b5bcc2;
  ul {
    background: #0f1843;
  }
}
.boxTree {
  padding-right: 20px;
  padding-left: 50px;
  padding-top: 10px;
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

  border: 0;
  height: 75%;
}

.nav-top {
  display: flex;
  align-items: center;
  padding: 0 20px;
  span {
    width: 60px;
  }
  .el-select {
    width: 150px;
  }
  .el-input--mini .el-input__inner {
    background: transparent;
  }
}
// 点击DTU时显示操作
.DTU_Box {
  li {
    cursor: pointer;
  }
}

.nav-bottom {
  position: absolute;
  bottom: 0;
  font-size: 16px;
  line-height: 20px;
  height: 100px;
  padding: 10px;
  width: 282px;
  background: #0f1843;
  box-sizing: border-box;
  div {
    line-height: 40px;
    display: flex;
    p {
      width: 70px;
    }
    .status {
      display: flex;
      align-items: center;
    }
  }
}

.nav_tree .light_title {
  background: #ffffff;
  font-size: 14px;
  display: flex;
  justify-content: space-between;
  border-bottom: 2px solid #eeee;
  line-height: 24px;
  padding: 0 10px;
  // li:nth-child(1) {
  //   width: 1id0px;
  // }
  // li {
  //   width: 130px;
  //   padding: 0 10px;
  // }
}
.nav_tree .light_dataNum {
  background: #ffffff;
  border-bottom: 1px solid #eeeeee;

  li span:nth-child(1) {
    width: 100px;
    display: inline-block;
  }
  li span {
    // width: 125px;
    // line-height: 14px;
    display: inline-block;
    line-height: 26px;
  }
  li {
    display: flex;
    justify-content: space-between;

    padding: 0 0 0 10px;
    height: 26px;
    span:nth-child(2) {
      text-align: center;
    }
  }
  li span:nth-child(3) {
    width: 100px;
    text-align: center;
  }
}
// DTU点击模块
.el-popover {
  margin-left: 40px;
}
.iptWidth {
  .el-input {
    width: 30%;
  }
}
.DTU_Box li:hover {
  color: #409eff;
}
.updata_box {
  margin-top: 10px;
  width: 340px;
  height: 30px;
  margin-top: 5px;
  margin-left: 20px;
  border-radius: 3px;
  background: -webkit-linear-gradient(left, red, blue); /* Safari 5.1 - 6.0 */
  background: -o-linear-gradient(right, red, blue); /* Opera 11.1 - 12.0 */
  background: -moz-linear-gradient(right, red, blue); /* Firefox 3.6 - 15 */
  background: linear-gradient(
    to right,
    rgba(255, 0, 0, 0.4),
    rgba(0, 0, 255, 0.5),
    rgba(255, 0, 0, 0.4)
  ); /* 标准的语法（必须放在最后） */
  -webkit-animation: back-animation 10s infinite linear;
  @-webkit-keyframes back-animation {
    from {
      background-position-x: 0px;
    }
    to {
      background-position-x: 600px;
    }
  }
}
.imgBg {
  width: 10px;
  height: 10px;
  background: rgb(246, 142, 86);
  display: inline-block;
  border-radius: 50%;
  margin: 10px;
}
.online {
  background: rgb(0, 246, 255);
  width: 10px;
  height: 10px;
  border-radius: 50%;
  margin: 10px;
  display: inline-block;
}
</style>
<style lang="scss">
/* //hover事件 */

.nav-box .el-menu-item:focus,
.el-menu-item:hover {
  color: #409eff;
}

.tree .el-submenu__title {
  color: #b5bcc2;
}
// 点击后的颜色
.nav_tree .el-menu-item.is-active {
  color: #409eff;
}
.el-input--mini .el-input__inner {
  background: transparent;
}
.el-menu,
.el-menu--horizontal > .el-menu-item:not(.is-disabled):focus,
.el-menu--horizontal > .el-menu-item:not(.is-disabled):hover,
.el-menu--horizontal > .el-submenu .el-submenu__title:hover {
  background: #0f1843;
}
.dialog_content .dialog-boxs .el-dialog__wrapper {
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
    overflow: auto;
    // &::-webkit-scrollbar {
    //   display: none;
    // }
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
.dialog_content .detail_boxs {
  .el-dialog__wrapper {
    position: fixed;
    top: 50% !important;
    left: 50% !important;
    right: auto !important;
    bottom: auto !important;
    border-radius: 5px;
    margin-left: -15%;
    margin-top: -250px;
    overflow: hidden;
  }
}
// 修改模块
.dialog-boxs .el-dialog__header {
  display: none;
}
.dialog-boxs .el-dialog__body {
  padding: 0;
}
// 读取模块
.readBox .el-dialog__body {
  padding: 0;
  max-height: 500px;
  overflow-y: auto;
}
.boxTree .el-menu-item,
.el-submenu__title {
  line-height: 27px;
  height: 100%;
}
.nav_tree .el-menu-item {
  color: #b5bcc2;
}
.el-submenu__title:hover {
  color: #409eff;
}
.detail_box .el-dialog__wrapper {
  width: 100%;
}
.el-dialog__wrapper {
  overflow: hidden;
}
.el-tabs--border-card {
  border: 0;
  box-shadow: none;
}
</style>
