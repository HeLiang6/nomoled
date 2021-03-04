import { zoneId } from '@/api/area'
import { getConfigTask, taskList, taskAdd, setConfiguration, alterConfiguration, setTask, ProjectIdCondition } from '@/api/task'
import { system } from '../../../static/js/SystemOperation'

const task = {
  state: {
    projectId: '',
    week: [],
    dtuId: 'all',
    light_template: [],
    scopeData: [
      {
        no: 'all',
        name: '全部'
      }
    ],
    loading: true,
    condition_loading: true,
    addTaskBox: false,
    conditionList: [],
    isDialog: true,
    configurationList: [],
    addform: {
      week: '',
      count: null,
      state: 0,
      description: '描述描述一下嘛！',
      conditiontype: 0,
      cycle: 0,
      enabled: 1,
      endSecond: null,
      endtime: Date.now() + 24 * 60 * 60 * 5000,
      lightcondition: 100,
      lightduration: 60,
      name: '',
      projectId: '',
      dtuId: '',
      startSecond: null,
      starttime: Date.now(),
      vcondition: { v: 12, rate: 10, bright: 50 },
      zoneNo: 'all'
    },
    addConfiguration: {
      description: '',
      name: '',
      projectId: '',
      dtuId: '',
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
      month: 0,
      mtime: 3,
      nomenlight: 100,
      sensortime: 3,
      time1: 3,
      time2: 3,
      time3: 3,
      time4: 3,
      time5: 3,
      typeId: ''
    }
  },
  mutations: {
    LIST_DATA: (state, data) => {
      state.projectId = data[0].value
    },
    SET_SCOPEDATA: (state, data) => {
      state.scopeData = [{
        no: 'all',
        name: '全部'
      }
      ]
      state.scopeData.push(...data)
    },
    SET_ADDTASKBOX: (state, val) => {
      state.addTaskBox = val
    },
    SETCONDITION: (state, data) => {
      state.conditionList = data
      // state.conditionList.
      state.condition_loading = false
    },
    // 是否显示loading
    FLAG_Loading: (state) => {
      state.condition_loading = true
    },
    Loading: (state) => {
      state.loading = true
    },
    SET_ID: (state, data) => {
      state.addform.projectId = data.projectId
      state.addform.dtuId = data.rootId
      state.addConfiguration.projectId = data.projectId
      state.addConfiguration.dtuId = data.rootId
    },
    // 修改弹框赋值
    SETTASK: (state, data) => {
      state.addTaskBox = true
      // data[0].(item=>{
      //   item.endtime
      // })

      // 执行时间转化
      let min = data.startSecond % 60
      let hou = (data.startSecond - min) / 60
      if (hou < 10) {
        hou = '0' + hou
      }
      if (min < 10) {
        min = '0' + min
      }
      let date = hou + ':' + min
      // 星期转化
      if (data.cycle == 1) {
        let week = data.week.toString(2)
        week = week.split('')
        for (let i = 0; i < week.length; i++) {
          for (let n = 0; n <= i; n++) {
            week[i] = week[i] * 10
          }
        }
        state.week = week
      }
      state.addform = {
        ...data,
        startSecond: date,
        conditionTaskId: data._id,
        projectId: state.projectId,
        rootId: state.dtuId
        // endtime: (new Date(data.endtime)).getTime(),
        // starttime: (new Date(data.starttime)).getTime()
      }
    },
    SETCONFIGURATION: (state, data) => {
      state.configurationList = data
      state.loading = false
    },

    // 修改
    CHANGE_CONFIGURATION: (state, data) => {
      state.addConfiguration = data[0]
      state.addConfiguration.configTaskId = data[0]._id
    },
    // 获取任务模板
    LIGHT_TEMPLATE: (state, data) => {
      state.light_template = data
    },
    // 存下dtuid
    set_DTUID: (state, data) => {
      state.dtuId = data
    },
    // 项目添加下的Id
    ProjectId_dtuId: (state) => {
      state.dtuId = 'all'
      state.addform.projectId = state.projectId
      state.addform.dtuId = 'all'
      state.addConfiguration.projectId = state.projectId
      state.addConfiguration.dtuId = 'all'
    },
    // 清空
    set_EMPTY: (state) => {
      state.addConfiguration = {
        description: '',
        name: '',
        projectId: state.projectId,
        dtuId: state.dtuId,
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
        month: 0,
        mtime: 3,
        nomenlight: 100,
        sensortime: 3,
        time1: 3,
        time2: 3,
        time3: 3,
        time4: 3,
        time5: 3,
        typeId: ''
      }
      state.addform = {
        week: '',
        count: null,
        state: 0,
        description: '描述描述一下嘛！',
        conditiontype: 0,
        cycle: 0,
        enabled: 1,
        endSecond: null,
        endtime: null,
        lightcondition: 100,
        lightduration: 60,
        name: '',
        projectId: state.projectId,
        dtuId: state.dtuId,
        startSecond: null,
        starttime: null,
        vcondition: { v: 12, rate: 10, bright: 50 },
        zoneNo: 'all'
      }
    }
  },
  actions: {
    GET_SCOPE: (context, Id) => {
      let str = String(Math.round((Math.random() * 10) + 1))
      let data = {
        dtuId: Id.rootId,
        rand: str
      }
      context.commit('SET_ID', Id)
      zoneId(data).then(res => {
        context.commit('SET_SCOPEDATA', res)
      }).catch(err => {
        console.log(err)
      })
      // 任务列表
      taskList(data).then(res => {
        context.commit('SETCONDITION', res)
      }).catch(err => {
        console.log(err)
      })
      // 获取配置列表
      setConfiguration(data).then(res => {
        context.commit('SETCONFIGURATION', res)
      }).catch(err => {
        console.log(err)
      })
    },
    // 条件任务添加
    CONFIRMADD: (context, data) => {
      context.state.addform.week = data
      let time = context.state.addform.startSecond.split(':')
      let time2 = context.state.addform.startSecond.split(':')
      context.state.addform.startSecond = Number(time[0]) * 60 + Number(time[1])
      context.state.addform.endSecond = Number(time2[0]) * 60 + Number(time2[1])
      taskAdd(context.state.addform).then(res => {
        context.state.addTaskBox = false
        let Ids = {
          projectId: context.state.projectId,
          rootId: context.state.dtuId
        }
        // 日志记录
        let user = JSON.parse(sessionStorage.getItem('nomouser'))._id
        let dataLog = {
          userId: user,
          obj: 5,
          dtuname: '',
          operatename: 19,
          operattype: 0,
          time: Date.parse(new Date()),
          description: '添加条件任务',
          description_en: 'Add conditional tasks',
          description_spain: 'Agregar tareas condicionales',
          projectId: context.state.projectId,
          tel: '',
          ip: ''
        }
        system(dataLog)
        context.commit('FLAG_Loading')

        if (context.state.dtuId !== 'all') {
          context.dispatch('GET_SCOPE', Ids)
        } else {
          context.dispatch('PROJECT_TASK')
        }
        context.commit('set_EMPTY')
        console.log(res)
      }).catch(err => {
        console.log(err)
      })
    },
    // 条件任务修改
    SETCONFIRM: (context) => {
      let time = context.state.addform.startSecond.split(':')
      let time2 = context.state.addform.startSecond.split(':')
      context.state.addform.startSecond = Number(time[0]) * 60 + Number(time[1])
      context.state.addform.endSecond = Number(time2[0]) * 60 + Number(time2[1])
      setTask(context.state.addform).then(res => {
        // 日志记录
        let user = JSON.parse(sessionStorage.getItem('nomouser'))._id
        let dataLog = {
          userId: user,
          obj: 5,
          dtuname: '',
          operatename: 21,
          operattype: 0,
          time: Date.parse(new Date()),
          description: '修改任务',
          description_en: 'Modify task',
          description_spain: 'Modificar tarea',
          projectId: context.state.projectId,
          tel: '',
          ip: ''
        }
        system(dataLog)
        context.commit('FLAG_Loading')
        let Ids = {
          projectId: context.state.projectId,
          rootId: context.state.dtuId
        }
        console.log(Ids)
        if (context.state.dtuId !== 'all') {
          context.dispatch('GET_SCOPE', Ids)
        } else {
          context.dispatch('PROJECT_TASK')
        }

        context.state.addTaskBox = false
        context.commit('set_EMPTY')
      }).catch(err => {
        console.log(err)
      })
    },
    // 确认修改配置任务
    CHANGE_CONFIRM: (context) => {
      alterConfiguration(context.state.addConfiguration).then(res => {
        context.state.isDialog = false
        context.commit('Loading')
        // 日志记录
        let user = JSON.parse(sessionStorage.getItem('nomouser'))._id
        let dataLog = {
          userId: user,
          obj: 5,
          dtuname: '',
          operatename: 21,
          operattype: 0,
          time: Date.parse(new Date()),
          description: '修改配置任务',
          description_en: 'Modify configuration task',
          description_spain: 'Modificar la tarea de configuración',
          projectId: context.state.projectId,
          tel: '',
          ip: ''
        }
        context.dispatch('getUpData')

        system(dataLog)
      }).catch(err => {
        console.log(err)
      })
    },
    // 项目下的所有配置任务
    PROJECT_TASK: (context) => {
      let data = {
        projectId: context.state.projectId,
        rand: Math.ceil(Math.random() * 10)
      }
      ProjectIdCondition(data).then(res => {
        context.commit('SETCONDITION', res)
      }).catch(err => {
        console.log(err)
      })
      getConfigTask(data).then(res => {
        context.commit('SETCONFIGURATION', res)
      })
    },
    // 数据刷新
    getUpData: (context) => {
      let str = String(Math.round((Math.random() * 10) + 1))
      let data = {
        dtuId: context.state.dtuId,
        rand: str
      }
      // 获取配置列表
      if (context.state.dtuId !== 'all') {
        setConfiguration(data).then(res => {
          context.commit('SETCONFIGURATION', res)
          context.commit('set_EMPTY')
        }).catch(err => {
          console.log(err)
        })
      } else {
        context.dispatch('PROJECT_TASK')
      }
    }
  }
}

export default task
