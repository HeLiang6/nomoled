<template>
  <div>
    <el-form
      class="form"
      label-width="auto"
    >
      <h2>{{$t('message.reset_Password')}}</h2>
      <div v-show="!isflag">
        <el-form-item :label="$t('message.new_password')">
          <el-input v-model="password"></el-input>
        </el-form-item>
        <el-form-item :label="$t('message.confirm_new_password')">
          <el-input v-model="passwords"></el-input>
        </el-form-item>
        <el-button
          @click='returnClick'
          class="btn"
          type="primary"
        >{{$t('message.reset_Password')}}</el-button>
      </div>
      <div
        class="return-box"
        v-show="isflag"
      >
        密码已修改
        <router-link
          to="/login"
          tag="p"
          class="return"
        >返回登录</router-link>
      </div>
    </el-form>
  </div>
</template>

<script>
export default {
  data () {
    return {
      password: '',
      passwords: '',
      isflag: false
    }
  },
  methods: {
    returnClick () {
      this.isflag = true
    }
  }
}
</script>

<style scoped>
.form {
  padding: 20px 50px 20px 20px;
  background: rgba(252, 250, 250, 0.1);
  border-radius: 10px;
}
.form h2 {
  text-align: center;
  border-bottom: 2px solid #85b9f6;
  color: #85b9f6;
  margin-bottom: 20px;
}
.el-form-item {
  margin-bottom: 10px;
}
.btn {
  margin-left: 30%;
  margin-bottom: 40px;
}
.return-box {
  color: #85b9f6;
  text-align: center;
}
.return {
  cursor: pointer;
  color: #85b9f6;
  text-align: center;
  margin-top: 40px;
}
</style>
