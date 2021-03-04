<template>
  <div style="height:100%">
    <div class="main-box-task">
      <Tree class="tree"></Tree>
      <div class="box-right">
        <!-- <h4>{{$t('project')}}</h4> -->
        <el-tabs
          v-model="activeName"
          type="border-card"
        >
          <el-tab-pane
            :label="$t('task.Conditional')"
            name="first"
          >
            <Condition />
          </el-tab-pane>
          <el-tab-pane
            :label="$t('task.Configuration')"
            name="second"
          >
            <Configuration />
          </el-tab-pane>
          <el-tab-pane
            :label="$t('task.AI')"
            name="third"
          >
            <AI />
          </el-tab-pane>
        </el-tabs>

      </div>
    </div>
  </div>
</template>
<script>
import Task from '@/components/tag'
import Tree from './components/Task_Left'
import Condition from './components/Condition'
import Configuration from './components/Configuration'
import AI from './components/AI'
// import { ProjectList } from '@/api/project'

export default {
  data () {
    return {
      restaurants: [],
      state1: '',
      loading: false,
      val: [],
      conditiontype: [
        {
          label: this.$t('task_lighton'),
          value: 0
        },
        {
          label: this.$t('task_lightoff'),
          value: 1
        },
        {
          label: this.$t('task_energySaving'),
          value: 2
        },
        {
          label: this.$t('task_cleaning'),
          value: 3
        }
      ],
      cycleList: [
        {
          label: this.$t('byDay'),
          value: 0
        },
        {
          label: this.$t('byWeek'),
          value: 1
        },
        {
          label: this.$t('byFrequency'),
          value: 2
        }
      ],
      activeName: 'first'
    }
  },
  components: {
    Tree,
    Task,
    Condition,
    Configuration,
    AI
  },
  computed: {
  },
  mounted () {
    // this.searchChange()
  },
  methods: {
    // searchChange (val) {
    //   console.log(val)
    //   console.log(this.restaurants)
    //   let str = String(Math.round((Math.random() * 10) + 1))
    //   let data = {
    //     userId: this.$store.state.user.nomouser._id,
    //     r: str
    //   }
    //   ProjectList(data).then(res => {
    //     console.log(res);
    //     res.result.filter(item => {
    //       let data = {
    //         value: item._id,
    //         label: item.name
    //       }
    //       this.restaurants.push(data)
    //     })
    //     console.log(this.restaurants)
    //   }).catch(err => {
    //     console.log(err)
    //   })
    // },
    // remoteMethod (query) {
    //   if (query !== '') {
    //     this.loading = true
    //     setTimeout(() => {
    //       this.loading = false
    //       this.restaurants = this.restaurants.filter(item => {
    //         return item.label.toLowerCase()
    //           .indexOf(query.toLowerCase()) > -1
    //       })
    //     }, 200)
    //   } else {
    //     this.options = []
    //   }
    // },
    handerSearch () {
      console.log(this.state1)
    },
    handleSelectionChange (val) {
      this.val = val
    }

  }
}
</script>

<style lang="scss" scoped>
.inline-input {
  height: 38px;
}
.search-top {
  display: flex;
  color: #eeeeee;
  align-items: center;
  margin-bottom: 30px;
}
.el-input__inner {
  background: none;
}
.btn-box {
  background: none;
}
</style>

<style lang="scss" scoped>
.tree {
  position: absolute;
  top: 0;
  // height: 740px;
  // overflow-y: auto;
}
.search-tag {
  display: flex;
  justify-content: space-between;
}
.main-box-task {
  width: 100%;
  height: 100%;
  position: relative;
  display: flex;
  overflow: hidden;
}
.box-right {
  width: 100%;
  background: rgba($color: #fff, $alpha: 0.1);
  margin-left: 20px;
  h4 {
    padding: 10px;
    font-size: 24px;
  }
}
</style>
<style lang='scss'>
.el-table td,
.el-table th.is-leaf {
  border: 1px solid rgba(255, 255, 255, 0.1);
}
.el-table__header tr,
.el-table__header th {
  padding: 0;
  height: 50px;
}
// .el-table {
//   border: 1px solid rgba(255, 255, 255, 0.1);
//   margin-top: 30px;
//   .el-table__body-wrapper {
//     max-height: 550px;
//     min-height: 550px;
//     overflow-x: auto;
//     overflow-y: auto;
//   }
//   color: #fff;
//   border: 1px solid rgba(255, 255, 255, 0.1);
//   min-height: 600px;
//   // overflow-y: auto;
//   // overflow-x: auto;
//   //滚动条的宽度
//   .your-table .el-table__body-wrapper::-webkit-scrollbar {
//     width: 10px;
//     height: 10px;
//   }
//   //滚动条的滑块
//   .your-table .el-table__body-wrapper::-webkit-scrollbar-thumb {
//     background-color: #a1a3a9;
//     border-radius: 3px;
//   }
//   //滚动条的宽度
//   ::-webkit-scrollbar {
//     width: 10px;
//     height: 10px;
//   }
//   //滚动条的滑块
//   ::-webkit-scrollbar-thumb {
//     background-color: #a1a3a9;
//     border-radius: 3px;
//   }
// }
.box-right .el-tabs--border-card > .el-tabs__content {
  background: none;
  // overflow: auto;
  // min-height: 400px;
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
.el-table {
  color: #fff;
  border: 1px solid rgba(255, 255, 255, 0.1);
}
.el-input__inner {
  background-color: transparent;
}

.el-table__body tr:hover > td {
  background-color: #134087 !important;
}
.el-table .warning-row {
  background: skyblue;
}
.el-table th,
.el-table tr {
  background-color: transparent;
}
.el-table,
.el-table__expanded-cell {
  background-color: rgba($color: #fff, $alpha: 0.1);
}
.el-table thead {
  color: #00eaff;
}
.el-table {
  /* 表格字体颜色 */
  font-size: 10px;
}
.el-table td,
.el-table th.is-leaf {
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}
.el-table__header tr,
.el-table__header th {
  padding: 0;
  height: 50px;
}
.el-table__body tr,
.el-table__body td {
  padding: 0;
  height: 50px;
}
.el-table--border th {
  border-right: 1px solid rgba(255, 255, 255, 0.1);
}
.el-table--border td {
  border-right: 1px solid rgba(255, 255, 255, 0.1);
}
.el-pagination.is-background .btn-next,
.el-pagination.is-background .btn-prev,
.el-pagination.is-background .el-pager li {
  background-color: transparent;
  border: 1px solid #eee;
}
</style>
<style lang="scss">
.ChineseDom {
  .main-box-task {
    .el-table {
      // min-height: 100px;
      .el-table__body-wrapper {
        // max-height: 550px;
        // min-height: 550px;
        overflow-x: auto;
        overflow-y: auto;
      }
      overflow-y: auto;
      overflow-x: auto;
      //滚动条的宽度
      .your-table .el-table__body-wrapper::-webkit-scrollbar {
        width: 5px;
        height: 10px;
      }
      //滚动条的滑块
      .your-table .el-table__body-wrapper::-webkit-scrollbar-thumb {
        background-color: #a1a3a9;
        border-radius: 3px;
      }
      //滚动条的宽度
      ::-webkit-scrollbar {
        width: 5px;
        height: 10px;
      }
      //滚动条的滑块
      ::-webkit-scrollbar-thumb {
        background-color: #a1a3a9;
        border-radius: 3px;
      }
    }
    @media screen and (max-height: 600px) {
      .box-right .el-tabs--border-card > .el-tabs__content {
        height: 200px;
      }
      .el-table {
        width: 450px;
        min-height: 100px;
        .el-table__body-wrapper {
          // max-height: 550px;
          // min-height: 550px;
          min-height: 100px;
          max-height: 100px;
          overflow-x: auto;
          overflow-y: auto;
        }
        color: #fff;
        border: 1px solid rgba(255, 255, 255, 0.1);
        // min-height: 600px;
        overflow-y: auto;
        overflow-x: auto;
        //滚动条的宽度
        .your-table .el-table__body-wrapper::-webkit-scrollbar {
          width: 10px;
          height: 10px;
        }
        //滚动条的滑块
        .your-table .el-table__body-wrapper::-webkit-scrollbar-thumb {
          background-color: #a1a3a9;
          border-radius: 3px;
        }
        //滚动条的宽度
        ::-webkit-scrollbar {
          width: 10px;
          height: 10px;
        }
        //滚动条的滑块
        ::-webkit-scrollbar-thumb {
          background-color: #a1a3a9;
          border-radius: 3px;
        }
      }
    }
    @media screen and (max-width: 800px) {
      .el-table {
        width: 450px;
        // min-height: 200px;
      }
      .task_btn {
        .el-button {
          margin: 0;
          padding: 12px 10px;
        }
      }
    }
    @media screen and (max-height: 768px) and (min-height: 600px) {
      .box-right .el-tabs--border-card > .el-tabs__content {
        height: 340px;
      }
      .el-table {
        .el-table__body-wrapper {
          min-height: 200px;
          max-height: 200px;
          overflow-x: auto;
          overflow-y: auto;
        }
      }
    }
    @media screen and (max-height: 900px) and (min-height: 768px) {
      .box-right .el-tabs--border-card > .el-tabs__content {
        height: 450px;
        border: 0;
      }
      .el-table {
        min-height: 349px;
        .el-table__body-wrapper {
          min-height: 349px;
          max-height: 350px;
          overflow-x: auto;
          overflow-y: auto;
        }
      }
    }
    @media screen and (max-height: 960px) and (min-height: 900px) {
      .box-right .el-tabs--border-card > .el-tabs__content {
        height: 500px;
        border: 0;
      }
      .el-table {
        min-height: 400px;

        .el-table__body-wrapper {
          min-height: 400px;
          max-height: 400px;
          overflow-x: auto;
          overflow-y: auto;
        }
      }
    }
    @media screen and (max-height: 1024px) and (min-height: 960px) {
      .box-right .el-tabs--border-card > .el-tabs__content {
        height: 500px;
        border: 0;
      }
      .el-table {
        min-height: 400px;

        .el-table__body-wrapper {
          min-height: 400px;
          max-height: 400px;
          overflow-x: auto;
          overflow-y: auto;
        }
      }
    }
    @media screen and (max-height: 1200px) and (min-height: 1024px) {
      .box-right .el-tabs--border-card > .el-tabs__content {
        height: 500px;
        border: 0;
      }
      .el-table {
        min-height: 400px;

        .el-table__body-wrapper {
          min-height: 400px;
          max-height: 400px;
          overflow-x: auto;
          overflow-y: auto;
        }
      }
    }
    @media screen and (max-width: 1024px) and (min-width: 800px) {
      .el-table {
        width: 660px;
      }
    }
    @media screen and (max-width: 1280px) and (min-width: 1024px) {
      .el-table {
        width: 920px;
      }
    }
    @media screen and (max-width: 1366px) and (min-width: 1280px) {
      .el-table {
        width: 1000px;
      }
    }
    @media screen and (max-width: 1440px) and (min-width: 1366px) {
      .el-table {
        width: 1050px;
      }
    }
    @media screen and (max-width: 1600px) and (min-width: 1440px) {
      .el-table {
        width: 1250px;
      }
    }
  }
}
.English {
  .main-box-task {
    .el-table {
      // min-height: 100px;
      .el-table__body-wrapper {
        // max-height: 550px;
        // min-height: 550px;
        overflow-x: auto;
        overflow-y: auto;
      }
      overflow-y: auto;
      overflow-x: auto;
      //滚动条的宽度
      .your-table .el-table__body-wrapper::-webkit-scrollbar {
        width: 5px;
        height: 10px;
      }
      //滚动条的滑块
      .your-table .el-table__body-wrapper::-webkit-scrollbar-thumb {
        background-color: #a1a3a9;
        border-radius: 3px;
      }
      //滚动条的宽度
      ::-webkit-scrollbar {
        width: 5px;
        height: 10px;
      }
      //滚动条的滑块
      ::-webkit-scrollbar-thumb {
        background-color: #a1a3a9;
        border-radius: 3px;
      }
    }
    @media screen and (max-height: 600px) {
      .box-right .el-tabs--border-card > .el-tabs__content {
        height: 220px;
      }
      .el-table {
        width: 450px;
        min-height: 60px;
        .el-table th {
          padding: 2px 5px;
        }
        .el-table__body-wrapper {
          // max-height: 550px;
          // min-height: 550px;
          min-height: 60px;
          max-height: 60px;
          overflow-x: auto;
          overflow-y: auto;
        }
        color: #fff;
        border: 1px solid rgba(255, 255, 255, 0.1);
        // min-height: 600px;
        overflow-y: auto;
        overflow-x: auto;
        //滚动条的宽度
        .your-table .el-table__body-wrapper::-webkit-scrollbar {
          width: 10px;
          height: 10px;
        }
        //滚动条的滑块
        .your-table .el-table__body-wrapper::-webkit-scrollbar-thumb {
          background-color: #a1a3a9;
          border-radius: 3px;
        }
        //滚动条的宽度
        ::-webkit-scrollbar {
          width: 10px;
          height: 10px;
        }
        //滚动条的滑块
        ::-webkit-scrollbar-thumb {
          background-color: #a1a3a9;
          border-radius: 3px;
        }
      }
    }
    @media screen and (max-width: 800px) {
      .el-table {
        width: 450px;
        // min-height: 200px;
      }
      .task_btn {
        .el-button {
          margin: 0;
          padding: 12px 10px;
        }
      }
    }
    @media screen and (max-height: 768px) and (min-height: 600px) {
      .box-right .el-tabs--border-card > .el-tabs__content {
        height: 340px;
      }
      .el-table {
        .el-table__body-wrapper {
          min-height: 200px;
          max-height: 200px;
          overflow-x: auto;
          overflow-y: auto;
        }
      }
    }
    @media screen and (max-height: 900px) and (min-height: 768px) {
      .box-right .el-tabs--border-card > .el-tabs__content {
        height: 450px;
        border: 0;
      }
      .el-table {
        min-height: 300px;
        .el-table__body-wrapper {
          min-height: 300px;
          max-height: 300px;
          overflow-x: auto;
          overflow-y: auto;
        }
      }
    }
    @media screen and (max-height: 960px) and (min-height: 900px) {
      .box-right .el-tabs--border-card > .el-tabs__content {
        height: 500px;
        border: 0;
      }
      .el-table {
        min-height: 350px;
        .el-table__body-wrapper {
          min-height: 350px;
          max-height: 350px;
          overflow-x: auto;
          overflow-y: auto;
        }
      }
    }
    @media screen and (max-height: 1024px) and (min-height: 960px) {
      .box-right .el-tabs--border-card > .el-tabs__content {
        height: 500px;
        border: 0;
      }
      .el-table {
        min-height: 350px;
        .el-table__body-wrapper {
          min-height: 350px;
          max-height: 350px;
          overflow-x: auto;
          overflow-y: auto;
        }
      }
    }
    @media screen and (max-height: 1200px) and (min-height: 1024px) {
      .box-right .el-tabs--border-card > .el-tabs__content {
        height: 500px;
        border: 0;
      }
      .el-table {
        min-height: 400px;

        .el-table__body-wrapper {
          min-height: 400px;
          max-height: 400px;
          overflow-x: auto;
          overflow-y: auto;
        }
      }
    }
    @media screen and (max-width: 1024px) and (min-width: 800px) {
      .el-table {
        width: 660px;
      }
    }
    @media screen and (max-width: 1280px) and (min-width: 1024px) {
      .el-table {
        width: 920px;
      }
    }
    @media screen and (max-width: 1366px) and (min-width: 1280px) {
      .el-table {
        width: 1000px;
      }
    }
    @media screen and (max-width: 1440px) and (min-width: 1366px) {
      .el-table {
        width: 1050px;
      }
    }
    @media screen and (max-width: 1600px) and (min-width: 1440px) {
      .el-table {
        width: 1250px;
      }
    }
  }
}
</style>
