<template>
  <div class="nav_tree task_tree">
    <div class="nav-top">
      <span>{{$t('tips.Current_project')}}</span>
      <el-select
        v-model="$store.state.task.projectId"
        :placeholder="$t('tips.please')"
        size="mini"
        @change="DTUList"
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
    <div class="tree-box">
      <h3
        :class="activeVal===-1?active:''"
        class="title"
        @click="projectClick"
      ><i class="iconfont icon-wenjianjia"></i> {{this.label}}</h3>
      <div class="dtuNameDom">
        <p
          v-for="(item,index) in dtuData"
          :key="index"
          :class="activeVal===index?active:''"
          @click="handerClick(index,item._id)"
        >
          <i class="iconfont icon-jizo"></i>
          {{item.name}}
        </p>

      </div>
    </div>
  </div>
</template>

<script>
import { ProjectList } from '@/api/project'
import { getTemplateListByProjectId } from '@/api/streetLamp'
import { dtuList } from '@/api/dtu'
export default {
  data () {
    return {
      setForm: {
      },
      label: '',
      isSetData: false,
      read: false,
      isShow: 0,
      options: [],
      dtuData: [],
      activeVal: -1,
      active: 'active'
    }
  },
  mounted () {
    this.getProject()
  },
  methods: {
    // 获取路灯模板列表
    light_template () {
      let data = {
        projectId: this.$store.state.task.projectId,
        rand: Math.ceil(Math.random() * 10)
      }
      getTemplateListByProjectId(data).then(res => {
        console.log(res)
        this.$store.commit('LIGHT_TEMPLATE', res)
      })
    },
    // // 获取项目信息
    getProject () {
      let str = String(Math.round((Math.random() * 10) + 1))
      let data = {
        userId: this.$store.state.user.nomouser._id,
        r: str
      }
      ProjectList(data).then(res => {
        res.result.filter(item => {
          let data = {
            value: item._id,
            label: item.name
          }
          this.options.push(data)
        })
        this.$store.commit('LIST_DATA', this.options)
        console.log(this.options)
        this.projectName()
        this.DTUList()
        this.projectClick()
        this.light_template()
      }).catch(err => {
        console.log(err)
      })
    },
    // 项目名
    projectName () {
      let label = this.options.filter(item => {
        if (item.value === this.$store.state.task.projectId) {
          return item
        }
      })
      this.label = label[0].label
      console.log(this.label)
    },
    // 获取项目下所有DTU
    DTUList () {
      let data = {
        r: String(Math.round((Math.random() * 10) + 1)),
        projectId: this.$store.state.task.projectId
      }
      dtuList(data).then(res => {
        this.dtuData = res.result
        this.projectClick()
        this.projectName()
        this.light_template()
        console.log(res)
      }).catch(err => {
        console.log(err)
      })
    },
    handerClick (val, id) {
      this.$store.commit('set_DTUID', id)
      let data = {
        rootId: id,
        projectId: this.$store.state.task.projectId
      }
      console.log(id)
      this.$store.dispatch('GET_SCOPE', data)
      this.activeVal = val
    },
    // 点击项目
    projectClick () {
      console.log(1)
      this.$store.dispatch('PROJECT_TASK')
      this.$store.commit('ProjectId_dtuId')

      this.activeVal = -1
    }
  }

}
</script>

<style lang="scss" scoped>
.nav_tree {
  position: relative;
  padding-top: 20px;
  min-width: 250px;
  background: #0f1843;
  font-size: 12px;
  line-height: 12px;
  box-sizing: border-box;
  border-radius: 0 0 5px 5px;
  overflow: hidden;
  color: #b5bcc2;
}
.title {
  line-height: 30px;
  font-size: 20px;
}
.boxTree {
  margin-top: 10px;
  padding-right: 90px;
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
.tree-box {
  padding: 10px 30px 0 20px;
  p {
    font-size: 18px;
    line-height: 24px;
    margin-bottom: 10px;
    margin-left: 20px;
  }
}
.active {
  background: #fffacd;
  color: #000;
  border-radius: 3px;
  padding-left: 5px;
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
.dtuNameDom {
  height: 450px;
  overflow-y: auto;
}
.task_tree {
  height: 600px;
}
</style>
<style lang="scss">
.btn-next,
.btn-prev,
.el-pager li {
  background-color: transparent;
  border: 1px solid #eee;
  margin: 0 5px;
  border-radius: 4px;
}
</style>
/* 适配*/
<style lang="scss" scoped>
.task_tree {
  @media screen and (max-height: 600px) {
    height: 300px;
    // .tree-box {
    //   height: 200px;
    // }
    .dtuNameDom {
      height: 200px;
    }
  }
  @media screen and (max-height: 768px) and (min-height: 600px) {
    height: 420px;
    .dtuNameDom {
      height: 300px;
    }
  }
  @media screen and (max-height: 800px) and (min-height: 768px) {
    height: 560px;
    .dtuNameDom {
      height: 450px;
    }
  }
  @media screen and (max-height: 900px) and (min-height: 801px) {
    height: 650px;
    .dtuNameDom {
      height: 500px;
    }
  }
}
</style>
