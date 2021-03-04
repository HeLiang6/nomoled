<template>
  <div class="warnUserDom">
    <div class="left">
      <p class="left-top">
        <span>
          {{$t('peopel_list.list')}}
        </span>
        <span
          class="add_btn"
          @click="addClick"
        >{{$t('peopel_list.add_people')}}
        </span>
      </p>
      <ul>
        <li
          :class="active==index?'lis':''"
          v-for="(item,index) in userList"
          :key="index"
          @click="handerClick(item,index)"
        >
          {{item.wUserName}} &nbsp&nbsp<span style="font-size:14px">({{item.email}})</span>
        </li>
      </ul>
    </div>
    <div class="right">
      <div class="right_top">
        <p>{{$t('peopel_list.information')}}</p>
      </div>
      <div class="form_box">
        <el-form
          ref="add"
          :model="form"
          label-width="130px"
          class="inputUserMessage"
        >
          <!-- <el-form-item
            label="姓名"
            v-if="!add_user"
          >
            <el-input
              v-model="form.wUserName"
              placeholder=""
            ></el-input>
          </el-form-item> -->
          <el-form-item :label="$t('peopel_list.people')">
            <el-select
              v-model="form.wUserId"
              :placeholder="$t('search.please')"
            >
              <el-option
                v-for="item in options"
                :key="item._id"
                :label="item.username"
                :value="item._id"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item
            prop="email"
            :label="$t('peopel_list.email')"
            :rules="[
      { required: true, message:this.$t('peopel_list.address'), trigger: 'blur' },
      { type: 'email', message:this.$t('peopel_list.address2'), trigger: ['blur', 'change'] }
    ]"
          >
            <el-input v-model="form.email"></el-input>
          </el-form-item>
          <el-form-item :label="$t('peopel_list.SMS')">
            <el-checkbox v-model="form.smsable"></el-checkbox>
          </el-form-item>
          <el-form-item :label="$t('peopel_list.phone')">
            <el-input v-model="form.tel"></el-input>
          </el-form-item>
          <el-form-item :label="$t('peopel_list.project')">
            <el-checkbox
              :indeterminate="isIndeterminate"
              v-model="checkAll"
              @change="handleCheckAllChange"
            >{{$t('selectAll')}}
            </el-checkbox>

            <div class="checkbox_box">

              <el-checkbox-group
                v-model="form.projects"
                @change="selectionFun"
              >
                <el-form-item
                  v-for="(item,index) in lists"
                  :key="index"
                >
                  <el-checkbox
                    :label="item._id"
                    :value="item._id"
                    name="type"
                  >{{item.name}}</el-checkbox>

                </el-form-item>
              </el-checkbox-group>
            </div>
          </el-form-item>
        </el-form>
        <div class="btn_box">
          <el-button
            type="primary"
            @click="setUserClick"
            v-if="add_user"
          >{{$t('search.add')}}</el-button>
          <el-button
            type="primary"
            @click="saveClick"
            v-if="!add_user"
          >{{$t('peopel_list.save')}}</el-button>
          <el-button
            type="primary"
            @click="resetClick"
          >{{$t('peopel_list.Reset')}}</el-button>
          <el-button
            type="primary"
            @click="removeClick"
            v-if="!add_user"
          >{{$t('project_list.delete')}}</el-button>
        </div>
      </div>
    </div>
    <div>

    </div>
  </div>
</template>

<script>
import { getWorkerList, getWorker, getUserList, addWorker, updateWorker, delWorker } from '@/api/worker'
import { ProjectList } from '@/api/project'
export default {
  data () {
    return {
      active: 0,
      value: '',
      allElection: [],
      options: [],
      form: {
        userId: JSON.parse(sessionStorage.getItem('nomouser'))._id,
        wUserId: '',
        smsable: '',
        email: '',
        tel: '',
        projects: []
      },
      add_user: true,
      userList: [],
      lists: [],
      selectionArr: [],
      isIndeterminate: true,
      checkAll: false,
      message: {}
    }
  },
  mounted () {
    this.userLists()
    // this.getUser()
  },
  methods: {
    userLists () {
      this.getUser()
      this.projectList()

      let user = JSON.parse(sessionStorage.getItem('nomouser'))._id
      let data = {
        userId: user,
        rand: Math.ceil(Math.random() * 10)
      }
      getWorkerList(data).then(res => {
        console.log(res)
        this.userList = res.filter(item => {
          if (item.wUserName !== null) {
            console.log()
            return item
          }
        })
        this.handerClick(this.userList[0], 0)
      }).catch(err => {
        console.log(err)
      })
    },
    handerClick (val, index) {
      console.log(val)
      if (this.$refs.form) {
        this.$refs.form.resetFields()
      }
      let data = {
        workerId: val._id,
        rand: Math.ceil(Math.random() * 10)
      }
      getWorker(data).then(res => {
        console.log(res)
        this.form = res
        this.message = JSON.parse(JSON.stringify(val))
      })
      this.active = index
      this.add_user = false
      // this.message = JSON.parse(JSON.stringify(val))

      // this.form = val
      // console.log(this.message)
    },
    projectList () {
      let data = {
        userId: JSON.parse(sessionStorage.getItem('nomouser'))._id,
        rand: Math.ceil(Math.random() * 10)
      }
      ProjectList(data).then(res => {
        this.lists = res.result
      }).catch(err => {
        console.log(err)
      })
    },
    getUser () {
      let data = {
        userId: JSON.parse(sessionStorage.getItem('nomouser'))._id,
        r: Math.ceil(Math.random() * 10),
        fieldJson: {
          belong: '',
          roles: [],
          username: ''
        }
      }
      getUserList(data).then(res => {
        console.log(res)
        this.options = res
      }).catch(err => {
        console.log(err)
      })
    },
    addClick () {
      this.add_user = true
      this.form = {
        userId: JSON.parse(sessionStorage.getItem('nomouser'))._id,
        wUserId: '',
        smsable: '',
        email: '',
        tel: '',
        projects: []
      }
      this.message = JSON.parse(JSON.stringify(this.form))
    },
    setUserClick () {
      this.form.wUserId = this.form._id
      this.$refs.add.validate((valid) => {
        if (valid) {
          addWorker(this.form).then(res => {
            console.log(res)
            this.userLists()
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
    // 全选
    handleCheckAllChange (val) { // 全选
      this.allElectionFun()
      this.form.projects = val ? this.allElection : []
      this.isIndeterminate = false
      console.log(this.form.projectList)
      // this.selectionFun(this.form.projectList)
    },
    allElectionFun () { // 全选数组
      this.allElection = []
      for (var i = 0; i < this.lists.length; i++) {
        this.allElection.push(this.lists[i]._id)
      }
      console.log(this.allElection)
    },
    selectionFun (selectionArr) { // 获取选中的对象
      this.selectionArr = []
      for (var i = 0; i < this.lists.length; i++) {
        for (var j = 0; j < selectionArr.length; j++) {
          if (selectionArr[j] === this.lists[i]._id) {
            this.selectionArr.push(this.lists[i])
          }
        }
      }
    },
    handleCheckedCitiesChange (value) { // 选中
      let checkedCount = value.length
      this.checkAll = checkedCount === this.lists.length
      this.isIndeterminate = checkedCount > 0 && checkedCount < this.lists.length
      this.selectionFun(value)
      console.log(this.selectionArr)
    },
    // 重置
    resetClick () {
      console.log(this.message)
      this.form = JSON.parse(JSON.stringify(this.message))
    },
    // 保存
    saveClick () {
      let data = {
        workerId: this.form._id,
        ...this.form
      }
      updateWorker(data).then(res => {
        console.log(res)
        this.$message({
          message: this.$t('stateMessage.alterSuccess'),
          type: 'success'
        })
      }).catch(err => {
        console.log(err)
      })
    },
    // 删除
    removeClick () {
      this.$confirm(this.$t('hint.hint_message'), this.$t('hint.prompt'), {
        confirmButtonText: this.$t('search.confirm'),
        cancelButtonText: this.$t('search.cancel'),
        type: 'warning'
      }).then(() => {
        let data = {
          workerId: this.form._id,
          rand: Math.ceil(Math.random() * 10)
        }
        delWorker(data).then(res => {
          this.userLists()
          console.log(res)
        }).catch(err => {
          console.log(err)
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: this.$t('hint.info')
        })
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.warnUserDom {
  height: 100%;
  background: rgba(0, 10, 30, 0.2);
}
.left {
  width: 30%;
  // background: rgb(0, 10, 54);
  padding-bottom: 70px;
  float: left;
  p {
    padding: 3px 15px;
    font-size: 18px;
    color: #fff;
    background: #5c6e8a;
    display: flex;
    align-items: center;
    border-right: 1px solid #ccc;
    box-sizing: border-box;
  }
  ul {
    padding: 15px;
    height: 400px;
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
    li {
      line-height: 40px;
      font-size: 20px;
      margin-top: 10px;
      border-radius: 3px;
      padding-left: 30px;
      color: #fff;
    }
    li:hover {
      background: rgb(116, 219, 223);
    }
  }
}
.right {
  float: left;
  width: 70%;
  background: rgba(39, 125, 236, 0.1);
  height: 100%;
  p {
    padding: 9px;
    font-size: 18px;
    color: #fff;
    background: #5c6e8a;
    overflow: hidden;
  }
}
.form_box {
  width: 100%;
  padding: 15px;
  height: auto;
  box-sizing: border-box;
  background: rgba(39, 125, 236, 0.1);
}
.inputUserMessage {
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
.checkbox_box {
  max-height: 300px;
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
.lis {
  background: #5c6e8a;
}
.add_btn {
  border: 1px solid #eee;
  background: #409eff;
  color: #fff;
  padding: 5px;
  margin-left: 40px;
  display: block;
  border-radius: 5px;
  cursor: pointer;
}
.add_btn:hover {
  color: #fff;
}
.btn_box {
  display: flex;
  justify-content: center;
  .el-btn {
    margin-right: 10px;
  }
}
.right {
  .el-input {
    width: 217px;
    background: none;
    .el-input__inner {
    }
  }
}
</style>
<style lang="scss">
.ChineseDom {
  .warnUserDom {
    // 宽度
    @media screen and (max-width: 800px) {
      .left {
        .left-top {
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          .add_btn {
            margin: 0;
          }
        }
        ul {
          height: 200px;
          li {
            padding-left: 10px;
          }
        }
      }
      .right_top {
        p {
          line-height: 48px;
        }
      }
    }
    @media screen and (max-width: 1024px) and (min-width: 800px) {
      .left {
        .left-top {
          display: flex;
          flex-wrap: wrap;
          justify-content: space-between;
          .add_btn {
            margin: 0;
          }
        }
      }
    }
    // 高度
    @media screen and (max-height: 600px) {
      .form_box {
        .inputUserMessage {
          height: 150px;
          overflow-y: auto;
        }
      }
    }
    @media screen and (max-height: 768px) and (min-height: 600px) {
      .form_box {
        .inputUserMessage {
          height: 320px;
          overflow-y: auto;
          .checkbox_box {
            max-height: 500px;
          }
        }
      }
    }
    @media screen and (max-height: 800px) and (min-height: 768px) {
      .form_box {
        .inputUserMessage {
          height: 500px;
          overflow-y: auto;
          .checkbox_box {
            max-height: 500px;
          }
        }
      }
    }
    @media screen and (max-height: 960px) and (min-height: 800px) {
      .form_box {
        .inputUserMessage {
          height: 550px;
          overflow-y: auto;
          .checkbox_box {
            max-height: 500px;
          }
        }
      }
    }
  }
}
.Englist {
  .warnUserDom {
    // 宽度
    @media screen and (max-width: 800px) {
      .left {
        .left-top {
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          .add_btn {
            margin: 0;
          }
        }
        ul {
          height: 200px;
          li {
            padding-left: 10px;
          }
        }
      }
      .right_top {
        p {
          line-height: 48px;
        }
      }
    }
    @media screen and (max-width: 1024px) and (min-width: 800px) {
      .left {
        .left-top {
          display: flex;
          flex-wrap: wrap;
          justify-content: space-between;
          .add_btn {
            margin: 0;
          }
        }
      }
    }
    // 高度
    @media screen and (max-height: 600px) {
      .form_box {
        .inputUserMessage {
          height: 120px;
          overflow-y: auto;
        }
      }
    }
    @media screen and (max-height: 768px) and (min-height: 600px) {
      .form_box {
        .inputUserMessage {
          height: 320px;
          overflow-y: auto;
          .checkbox_box {
            max-height: 500px;
          }
        }
      }
    }
    @media screen and (max-height: 800px) and (min-height: 768px) {
      .form_box {
        .inputUserMessage {
          height: 500px;
          overflow-y: auto;
          .checkbox_box {
            max-height: 500px;
          }
        }
      }
    }
    @media screen and (max-height: 960px) and (min-height: 800px) {
      .form_box {
        .inputUserMessage {
          height: 550px;
          overflow-y: auto;
          .checkbox_box {
            max-height: 500px;
          }
        }
      }
    }
  }
}
</style>
