<template>
  <div
    class="forget-box"
    style="width:100%"
  >
    <el-form
      ref="loginForm"
      :model="loginForm"
      class="login-form"
      autocomplete="on"
      label-width="100px"
      label-position="right"
      hide-required-asterisk
      :rules="rules"
    >
      <h3 class="title"><span>{{$t('message.email_passsword')}}</span></h3>
      <!-- 邮箱 -->
      <div>
        <el-form-item
          prop="mailbox"
          :label="$t('message.mailbox')"
        >
          <el-input
            type="mailbox"
            v-model="loginForm.mailbox"
          ></el-input>
        </el-form-item>
        <el-form-item :label="$t('message.verification_code')">
          <div class="code-box">
            <el-input
              v-model="loginForm.code"
              @keyup.enter.native="handleLogin"
              :placeholder="$t('message.write_verification_code')"
            />
            <div
              @click="handelClickCodes"
              class="code-bg"
            >
              <span
                class="showBox"
                v-show="show"
              >{{$t('message.getCode')}}</span>
              <span
                class="showBox"
                v-show="!show"
              >{{time}}(s)</span>
            </div>
          </div>
        </el-form-item>
        <el-form-item :label="$t('message.new_password')">
          <el-input v-model="loginForm.password"></el-input>
        </el-form-item>
        <el-form-item :label="$t('message.confirm_new_password')">
          <el-input v-model="loginForm.passwords"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button
            @click='retrieveClick'
            class="retrieve-btn"
            type="primary"
          >{{$t('message.reset_Password')}}</el-button>

          <!-- <el-button
            @click="retrieveClick"
            class="retrieve-btn"
            type="primary"
          >{{$t('message.retrieve')}}</el-button> -->
        </el-form-item>
      </div>
      <!-- <div v-show="$store.state.user.news">
        <div class="news">
          <p>重置密码的链接已经发送到邮箱</p>
          <p>请登录邮箱重置密码</p>
        </div>
        <el-button
          type="primary"
          class="Go_mailbox-btn"
          @click="Go_mailbox_btn"
        >{{$t('message.Go_mailbox')}}</el-button>
      </div> -->
      <el-form-item>
        <div style="display:flex;justify-content: space-between;">
          <p style="color:#85b9f6">{{$t('message.phone')}}</p>
          <p
            class="login"
            @click="returnLogin"
            style="color:#85b9f6"
          >{{$t('message.login')}}</p>
        </div>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  data () {
    let a = (rule, value, callback) => {
      console.log(value)
      if (!value) {
        return callback(new Error(this.$t('message.phone_email')))
      } else {
        const reg = /^1[3|4|5|7|8][0-9]\d{8}$/
        const email = /^[A-Za-z\d]+([-_.][A-Za-z\d]+)*@([A-Za-z\d]+[-.])+[A-Za-z\d]{2,4}$/
        console.log(reg.test(value))
        if (reg.test(value) || email.test(value)) {
          callback()
        } else {
          return callback(new Error(this.$t('message.phone_emails')))
        }
      }
    }
    return {
      time: '',
      show: true,
      timer: null,
      verificationCode: [],
      loginForm: {
        mailbox: '',
        code: '',
        password: '',
        passwords: ''
      },
      rules: {
        mailbox: [
          { validator: a, trigger: 'blur' }
        ]
      },
      loading: false
    }
  },
  mounted () {
    // 获取验证码
  },
  methods: {
    // 切换验证码
    handelClickCodes () {
      // 获取验证码
      let count = 59
      if (!this.timer) {
        this.time = count
        this.show = false
        this.timer = setInterval(() => {
          if (this.time > 0 && this.time <= count) {
            this.time--
          } else {
            this.show = true
            clearInterval(this.timer)
            this.timer = null
          }
        }, 1000)
      }
    },
    retrieveClick () {
      this.$store.commit('retrievePassword')
    },
    // 返回登录
    returnLogin () {
      this.$store.commit('savePassword')
    }
  }
}
</script>

<style scoped>
.login-form {
  padding: 20px 70px 20px 20px;
  background: rgba(252, 250, 250, 0.1);
  border-radius: 10px;
}
.login {
  cursor: pointer;
}
.login:hover {
  color: #26b4ff;
}
.title {
  margin-bottom: 30px;
  text-align: center;
}
.title span {
  color: #85b9f6;
  font-size: 22px;
  margin-left: 30px;
  border-bottom: 3px solid #85b9f6;
  padding: 5px;
}
.code-bg {
  width: 100%;
  display: flex;
  justify-content: space-around;
  margin-left: 10px;
  color: #85b9f6;
  /* background-image: url("../../../images/code-bg.jpg"); */
  background-size: cover;
  cursor: pointer;
}
.code-bg span {
  font-size: 20px;
}
.code-box {
  display: flex;
}
.retrieve-btn {
  width: 100%;
}
.news {
  padding: 20px;
  margin-left: 30px;
}
.news p {
  color: #85b9f6;
  font-size: 16px;
  line-height: 20px;
}
.Go_mailbox-btn {
  margin: 0 34%;
}
.showBox {
  background: #409ee4;
  border-radius: 4px;
  padding: 0 10px;
}
</style>

<style>
.forget-box .el-form-item__label {
  color: #85b9f6;
}
.el-input__inner {
  background: transparent;
}
</style>
