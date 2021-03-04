
import { writeProject, ProjectList } from '@/api/project'
import { addLight, updateTemplate } from '@/api/streetLamp'
import { rtus } from '@/api/rtu'
import { zones } from '@/api/area'
import { system } from '../../../static/js/SystemOperation'
import { translateCharacters } from '@/utils/sanjiliandong/translate'
import _Vue from '../../main'
const project = {
  state: {
    pjtree: {},
    projectId: '', // 报警列表ID
    detail_project: {
      name: '1',
      longitude: '',
      latitude: '',
      description: ''
    }, // 项目信息
    dtuListData: [],
    points: [], // 地图图标数据
    // 路灯型号
    ligthType: [
    ],
    setProject: false,
    addList: {
    },
    is_light: false,
    // progress: null, // 进度条
    updata: {}, // 更新终端数据
    set_light: false,
    // rtu路灯修改的值
    set_parameter: {
      params: {
        current: 600,
        delaytime: 10,
        induction1: 100,
        induction2: 50,
        induction3: 30,
        induction4: 100,
        induction5: 100,
        light1: 100,
        light2: 50,
        light3: 30,
        light4: 100,
        light5: 100,
        menlight: 100,
        mlight: 100,
        mode: 0,
        mtime: 3,
        nomenlight: 100,
        sensortime: 3,
        time1: 3,
        time2: 3,
        time3: 3,
        time4: 3,
        time5: 3
      },
      typeId: ''

    },
    // 添加集中器
    add_DTU: {
      params: {
        current: 600,
        delaytime: 10,
        induction1: 100,
        induction2: 50,
        induction3: 30,
        induction4: 100,
        induction5: 100,
        light1: 100,
        light2: 50,
        light3: 30,
        light4: 100,
        light5: 100,
        menlight: 100,
        mlight: 100,
        mode: 0,
        mtime: 3,
        nomenlight: 100,
        sensortime: 3,
        time1: 3,
        time2: 3,
        time3: 3,
        time4: 3,
        time5: 3
      },
      longitude: '',
      latitude: ''
    },
    // DTU集中器修改的值
    setDTUData: {
      params: {
        current: 600,
        delaytime: 10,
        induction1: 100,
        induction2: 50,
        induction3: 30,
        induction4: 100,
        induction5: 100,
        light1: 100,
        light2: 50,
        light3: 30,
        light4: 100,
        light5: 100,
        menlight: 100,
        mlight: 100,
        mode: 0,
        mtime: 3,
        nomenlight: 100,
        sensortime: 3,
        time1: 3,
        time2: 3,
        time3: 3,
        time4: 3,
        time5: 3
      }

    },
    // DTU新增地区数据
    setAreaData: {
      name: '',
      params: {
        current: 600,
        delaytime: 10,
        induction1: 100,
        induction2: 50,
        induction3: 30,
        induction4: 100,
        induction5: 100,
        light1: 100,
        light2: 50,
        light3: 30,
        light4: 100,
        light5: 100,
        menlight: 100,
        mlight: 100,
        mode: 0,
        mtime: 3,
        nomenlight: 100,
        sensortime: 3,
        time1: 3,
        time2: 3,
        time3: 3,
        time4: 3,
        time5: 3
      },
      projectId: '',
      no: '',
      description: '',
      rootId: '',
      rtus: [],
      typeId: []
    },
    // 添加路灯设备
    addLightData: {
      clear: false,
      latitude: '',
      longitude: '',
      name: '',
      uid: '',
      typeId: '',
      projectId: '',
      rootId: '',
      params: {
        current: 600,
        delaytime: 10,
        induction1: 100,
        induction2: 50,
        induction3: 30,
        induction4: 100,
        induction5: 100,
        light1: 100,
        light2: 50,
        light3: 30,
        light4: 100,
        light5: 100,
        menlight: 100,
        mlight: 100,
        mode: 0,
        mtime: 3,
        nomenlight: 100,
        sensortime: 3,
        time1: 3,
        time2: 3,
        time3: 3,
        time4: 3,
        time5: 3
      }
    },
    isAreaFlag: false,
    isLightFlag: false,
    isUpdate: false,
    projectList: '',
    lightTypes: [],
    tag: [],
    tableList: [],
    filterData: [],
    allData: [],
    // 项目列表
    isProject_list: true,
    // 路灯管理
    addsetFrom: {},
    isLight: false,
    map_center: {
      lng: 114.0643,
      lat: 22.551878
    },
    // 图标id
    icon_id: '',
    rtuData: [{
      name: ''
    }],
    dtuTel: ''
  },
  mutations: {
    map_center: (state, data) => {
      state.map_center.lng = data.longitude
      state.map_center.lat = data.latitude
    },
    // 默认项目
    PROJECT_ID: (state, data) => {
      state.addLightData.projectId = data
    },
    // 项目树下的数据
    DTU_list: (state, data) => {
      // 地图图标
      state.points = []
      let num = data
      // state.map_center = {
      //   lng: num.dtuList[0].longitude,
      //   lat: num.dtuList[0].latitude
      // }

      if (num.length !== 0) {
        for (let i = 0; i < num.dtuList.length; i++) {
          if (num.dtuList[i].rtuList !== null) {
            num.dtuList[i].rtuList.forEach(item => {
              let data = {
                site: { lng: item.longitude, lat: item.latitude },
                url: '../../../static/images/mapImg/mapRtu.png',
                id: item._id,
                type: 'rtu',
                name: item.name
              }
              state.points.push(data)
            })
          }
          // if (num.dtuList[i].zoneList !== null) {
          //   num.dtuList[i].zoneList.forEach(zone => {
          //     if (zone.rtuList !== null && zone.rtuList !== []) {
          //       zone.rtuList.map(zoneRtu => {
          //         zoneRtu.zoneno = zone.no
          //       })
          //     }
          //   })
          // }
        }
        if (num.monitorList !== null) {
          for (let i = 0; i < num.monitorList.length; i++) {
            let data = {
              site: { lng: num.monitorList[i].longitude, lat: num.monitorList[i].latitude },
              url: '../../../static/images/mapImg/mapMonitor.png',
              id: num.monitorList[i]._id,
              type: '',
              name: num.monitorList[i].name
            }
            state.points.push(data)
          }
        }
        if (num.wifiList !== null) {
          for (let i = 0; i < num.wifiList.length; i++) {
            let data = {
              site: { lng: num.wifiList[i].longitude, lat: num.wifiList[i].latitude },
              url: '../../../static/images/mapImg/mapWiFi.png',
              id: num.wifiList[i]._id,
              type: '',
              name: num.wifiList[i].name
            }
            state.points.push(data)
          }
        }
        if (num.chargeList !== null) {
          for (let i = 0; i < num.chargeList.length; i++) {
            let data = {
              site: { lng: num.chargeList[i].longitude, lat: num.chargeList[i].latitude },
              url: '../../../static/images/mapImg/mapCharge.png',
              id: num.chargeList[i]._id,
              type: '',
              name: num.chargeList[i].name
            }
            state.points.push(data)
          }
        }
        if (num.billboardList !== null) {
          for (let i = 0; i < num.billboardList.length; i++) {
            let data = {
              site: { lng: num.billboardList[i].longitude, lat: num.billboardList[i].latitude },
              url: '../../../static/images/mapImg/mapBillboardList.png',
              id: num.billboardList[i]._id,
              type: ''
            }
            state.points.push(data)
          }
        }
      }
      state.dtuListData = num
    },
    SET_DATA: (state, val) => {
      state.setProject = true
      if (val.lightType !== undefined) {
        if (val.lightType === '') {
          val.lightType = []
        } else if (val.lightType == null) {
          val.lightType = []
        }
      } else {
        val.lightType = []
      }
      state.addList = val
    },
    SET_FALSE: (state) => {
      state.setProject = false
    },
    SET_PARAMETER: (state, val) => {
      state.set_parameter = val
      state.map_center.lat = val.latitude
      state.map_center.lng = val.longitude
    },
    SET_POINT: (state, val) => {
      // 项目坐标
      state.detail_project.longitude = val.lng
      state.detail_project.latitude = val.lat
      //
      state.set_parameter.longitude = val.lng
      state.set_parameter.latitude = val.lat
      state.setDTUData.longitude = val.lng
      state.setDTUData.latitude = val.lat
      // 添加路灯坐标
      state.addLightData.latitude = val.lat
      state.addLightData.longitude = val.lng
      state.add_DTU.latitude = val.lat
      state.add_DTU.longitude = val.lng
      // state.set_parameter.uid = val.uid
    },
    // LIST_DATA: (state, val) => {
    //   state.projectList = val
    //   console.log(state.projectList)
    // },
    SET_TAG: (state, data) => {
      state.tag = data
    },
    SET_TAB: (state, data) => {
      state.tableList = [data]
      state.isProject_list = false
    },
    SETTABLELIST: (state, data) => {
      // console.log(state.tableList)
      state.allData = data
      state.tableList = state.allData.slice(0, 10)
      state.isProject_list = false
    },
    // 过滤  暂时一次只能一个条件
    DATAFILTER: (state, filter) => {
      let key, value
      for (let k in filter) {
        key = k
        value = filter[k]
      }
      if (!value && key) {
        state.tableList = state.allData.slice(0, 10)
        return
      } else if (!value) {
        state.filterData = state.allData
        state.tableList = state.allData.slice(0, 10)
        return
      }
      state.filterData = state.allData.filter(item => {
        return item[key].toLowerCase()
          .indexOf(value.toLowerCase()) > -1
      })
      state.tableList = state.filterData.slice(0, 10)
    },
    // 换页
    SIZECHANGE: (state, data) => {
      if (state.filterData.length) {
        let temp = state.filterData.slice((data - 1) * 10, 10 * data)
        if (temp.length) {
          state.tableList = temp
          return
        }
      } else {
        let temp = state.allData.slice((data - 1) * 10, 10 * data)
        if (temp.length) {
          state.tableList = temp
          return
        }
      }
      state.tableList = []// 或者不执行,然后页码不变
      // 执行方法  展现一个小提示  没有其他数据了
    },
    // 添加路灯
    SETADDLIGHT: (state, data) => {
      state.isLight = false
    },
    SETADDLIGHTBOX: (state, data) => {
      state.isLight = true
      state.addsetFrom = {}
    },
    // 路灯编辑
    SET_COMPILE: (state, data) => {
      state.addsetFrom = data

      state.isLight = true
    },
    // 搜索
    SEARCH: (state, data) => {
      if (state.tableList.length > 0) {
        if (data !== '') {
          state.tableList = state.tableList.filter(item => item._id === data)
        } else {
          state.tableList = state.tableList
        }
      }
    },
    SET_LIGHTTYPE_ARR: (state, data) => {
      state.ligthType = data
    },
    // map DTU弹框数据传入
    SET_DTU_DATA: (state, data) => {
      state.isLightFlag = false
      state.set_light = false

      state.setDTUData = data
      state.map_center.lat = data.latitude
      state.map_center.lng = data.longitude
    },
    // 添加DTU下地区
    SET_AREA_DTUID: (state, data) => {
      state.setAreaData.rootId = data
      state.setAreaData.typeId = state.ligthType[0]._id
    },
    // 修改地区弹框
    SET_AREA_CLICK: (state, data) => {
      if (data.params !== undefined) {
        state.setAreaData = data
        state.setAreaData.zoneId = data._id
      } else {
        state.setAreaData.name = data.name
        state.setAreaData.projectId = data.projectId
        state.setAreaData.no = data.no
        state.setAreaData.description = data.description
        state.setAreaData.rtus = data.rtus
        state.setAreaData.rootId = data.rootId
        state.setAreaData.typeId = data.typeId
        state.setAreaData.zoneId = data._id
      }
      // state.setAreaData = data
    },
    SET_AREA_FLAG: (state) => {
      state.isAreaFlag = !state.isAreaFlag
    },
    // 添加路灯设备弹框
    SET_LIGHT_FLAG: (state, id) => {
      state.isLightFlag = false
      state.set_light = false
      let data = state.addLightData
      for (let i in data) {
        if (i !== 'params' && i !== 'projectId') {
          state.addLightData[i] = ''
        }
      }
      state.isLightFlag = true
      state.addLightData.rootId = id
      state.addLightData.typeId = state.ligthType[0]._id
    },
    // 更新终端
    SET_UPDATE_TERMINAL: (state, data) => {
      state.isUpdate = !state.isUpdate
      state.updata = data[0]
    },
    RTUDATA: (state, data) => {
      state.rtuData = data
    },
    DTUTEL: (state, data) => {
      state.dtuTel = data.tel
    },
    // 图标动画
    SET_ICON_ID: (state, data) => {
      state.icon_id = data
    },
    // 添加集中器
    add_DTU: (state) => {
      state.add_DTU = {
        params: {
          current: 600,
          delaytime: 10,
          induction1: 100,
          induction2: 50,
          induction3: 30,
          induction4: 100,
          induction5: 100,
          light1: 100,
          light2: 50,
          light3: 30,
          light4: 100,
          light5: 100,
          menlight: 100,
          mlight: 100,
          mode: 0,
          mtime: 3,
          nomenlight: 100,
          sensortime: 3,
          time1: 3,
          time2: 3,
          time3: 3,
          time4: 3,
          time5: 3
        },
        longitude: '',
        latitude: ''
      }
      state.isLightFlag = false
      state.set_light = false
      // state.
      if (state.ligthType.length !== 0) {
        state.add_DTU.typeId = state.ligthType[0]._id
        state.add_DTU.rootId = state.addLightData.projectId
      }
    },
    SET_RTU: (state, data) => {
      state.isLightFlag = false
      state.set_light = data
    },
    SETLIGHTTYPE: (state, data) => {
      // state.lightTypes = data
    },
    // 更新全部路灯
    setIsLight (state) {
      state.is_light = !state.is_light
    },
    // 公共项目id
    SET_PROJECT_ID: (state, data) => {
      state.projectId = data
    },
    // 项目信息
    SET_DETAIL_PROJEXT: (state, data) => {
      state.isLightFlag = false
      state.set_light = false

      state.detail_project = data
    },
    PJTREE: (state, data) => {
      state.pjtree = data
      JSON.parse(state.pjtree.rtuoffline)
    },
    // 项目跳转
    projectClick: (state, data) => {
      state.addLightData.projectId = data
    }

  },
  actions: {
    // 项目修改
    SETPROJECT: (context, data) => {
      let user = data.userId
      if (data.userId === 'admin') {
        user = JSON.parse(sessionStorage.getItem('nomouser'))._id
      }

      let dataLog = {
        userId: user,
        obj: 1,
        dtuname: '',
        operatename: 12,
        operattype: 0,
        time: Date.parse(new Date()),
        description: '项目修改',
        description_en: 'Project modificatione',
        description_spain: 'Modificación de proyecto',
        projectId: data._id,
        tel: '',
        ip: ''
      }
      // context.state.addList.lightType = []
      data.projectId = data._id
      writeProject(data).then(res => {
        context.commit('SET_FALSE')
        system(dataLog)
      }).catch(err => {
        console.log(err)
      })
    },
    ADD_ZONE: (context) => {
      context.state.setAreaData.projectId = context.state.addLightData.projectId
      context.state.setAreaData.zooeId = ''
      console.log(context.state.setAreaData.projectId)
      // let data = {
      //   description: context.state.setAreaData.description,
      //   name: context.state.setAreaData.name,
      //   no: context.state.setAreaData.no,
      //   projectId: context.state.setAreaData.projectId,
      //   rootId: context.state.setAreaData.rootId,
      //   rtus: context.state.setAreaData.rtus,
      //   typeId: context.state.setAreaData.typeId,
      // }
      console.log(12 + '---------------------')
      zones(context.state.setAreaData).then(res => {
        let user = JSON.parse(sessionStorage.getItem('nomouser'))._id
        let dataLog = {
          userId: user,
          obj: 6,
          dtuname: '',
          operatename: 35,
          operattype: 0,
          time: Date.parse(new Date()),
          description: '添加区域',
          description_en: 'Add area',
          description_spain: 'Agregar área',
          projectId: context.state.addLightData.projectId,
          tel: '',
          ip: ''
        }
        system(dataLog)
        _Vue.$message({
          message: _Vue.$t('stateMessage.addSuccess'),
          type: 'success'
        })

        context.commit('SET_AREA_FLAG')
      }).catch(err => {
        console.log(err)
      })
    },
    // SEARCH: (context, data) => {
    //
    //   ProjectDetail(data).then(res => {
    //     context.commit('SET_TAB', res)
    //   }).catch(err => {
    //     console.log(err)
    //   })
    // },
    TABLELIST: (context) => {
      let nomouse = sessionStorage.getItem('nomouser')
      let data = JSON.parse(nomouse)

      let userId = data._id
      let datas = {
        r: '1',
        userId: userId
      }
      ProjectList(datas).then(async res => {
        if (res.httpCode === 200) {
          res.result.forEach(item => {
            item.visible = false
          })
          await translateCharacters(res.result)
          context.commit('SETTABLELIST', res.result)
        }
      }).catch(err => {
        console.log(err)
      })
    },
    // 路灯模板添加
    ADD_LIGHT: (context) => {
      addLight(context.state.addsetFrom).then(res => {
        let user = JSON.parse(sessionStorage.getItem('nomouser'))._id
        let dataLog = {
          userId: user,
          obj: 11,
          dtuname: '',
          operatename: 27,
          operattype: 0,
          time: Date.parse(new Date()),
          description: '添加路灯类型',
          description_en: 'Add street light type',
          description_spain: 'Agregar tipo de alumbrado público',
          projectId: '',
          tel: '',
          ip: ''
        }
        system(dataLog)
        context.commit('SETADDLIGHT')
      }).catch(() => {
      })
    },
    // 路灯修改
    COMPILECLICK: (context) => {
      context.state.addsetFrom.typeId = context.state.addsetFrom._id
      updateTemplate(context.state.addsetFrom).then(res => {
        context.commit('SETADDLIGHT')
        let user = JSON.parse(sessionStorage.getItem('nomouser'))._id
        let dataLog = {
          userId: user,
          obj: 11,
          dtuname: '',
          operatename: 28,
          operattype: 0,
          time: Date.parse(new Date()),
          description: '编辑路灯类型',
          description_en: 'Edit street light type',
          description_spain: 'Editar el tipo de alumbrado público',
          projectId: '',
          tel: '',
          ip: ''
        }
        system(dataLog)
      }).catch(err => {
        console.log(err)
      })
    },
    // 添加路灯设备
    ADD_LIGHT_DEVICE: (context) => {
      if (context.state.addLightData.clear === false) {
        context.state.addLightData.clear = 0
      } else {
        context.state.addLightData.clear = 1
      }
      let rtu = context.state.addLightData
      let data = {}
      for (let i in rtu) {
        if (i !== 'params') {
          data[i] = rtu[i]
        }
      }

      rtus(data).then(res => {
        let user = JSON.parse(sessionStorage.getItem('nomouser'))._id
        let dataLog = {
          userId: user,
          obj: 4,
          dtuname: '',
          operatename: 16,
          operattype: 0,
          time: Date.parse(new Date()),
          description: '添加终端',
          description_en: 'Add terminal',
          description_spain: 'Agregar terminal',
          projectId: context.state.addLightData.projectId,
          tel: '',
          ip: ''
        }
        system(dataLog)

        context.state.isLightFlag = false
        _Vue.$message({
          message: _Vue.$t('stateMessage.addSuccess'),
          type: 'success'
        })
      }).catch(err => {
        console.log(err)
      })
    }

  }

}

export default project
