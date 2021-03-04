<template>
  <div
    class="login-box"
    style="width:100%"
  >
    <!-- 登录 -->
    <el-form
      ref="loginForm"
      :model="loginForm"
      class="login-form"
      autocomplete="on"
      label-width="auto"
      label-position="right"
      color="#fff"
      hide-required-asterisk
      :rules="rules"
    >
      <h3 class="title">{{$t('message.title')}}</h3>
      <el-form-item
        prop="username"
        :label="$t('message.account')"
      >
        <el-input
          v-model="loginForm.username"
          name="username"
          type="text"
          autocomplete="on"
          :placeholder="$t('message.write_username')"
        />
      </el-form-item>
      <el-form-item
        style="margin:0"
        :label="$t('message.password')"
        prop="password"
      >
        <!-- <span class="svg-container">
          <svg-icon icon-class="password" />
        </span> -->
        <el-input
          :type="pwdType"
          v-model="loginForm.password"
          name="password"
          autocomplete="on"
          :placeholder="$t('message.write_password')"
          @keyup.enter.native="handleLogin"
        />
      </el-form-item>
      <el-form-item
        style="margin:0"
        label=""
      >
        <p
          class="show-pwd"
          @click="showPwd"
        >
          {{$t('message.forget')}}
          <!-- <svg-icon :icon-class="pwdType === 'password' ? 'eye' : 'eye-open'" /> -->
        </p>

      </el-form-item>
      <el-form-item
        prop="code"
        :label="$t('message.verification_code')"
      >
        <div class="code-box">
          <el-input
            v-model="loginForm.code"
            @keyup.enter.native="handleLogin"
            :placeholder="$t('message.write_verification_code')"
          />
          <div
            @click="handelClickCode"
            class="code-bg"
          >
            <span
              v-for="(item,index) in verificationCode"
              :key="index"
              :style={color:item.col}
            >{{item.code}}</span>
          </div>
        </div>
      </el-form-item>
      <el-form-item
        :label="$t('message.language')"
        style="margin-bottom:5px"
      >
        <el-select
          class="select-lang"
          v-model="$store.state.user.val"
          @change="handelChange"
        >
          <el-option
            v-for="item in langs"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-checkbox
          v-model=$store.state.user.save
          class="password_btn"
          :label="$t('message.remember_password')"
          name="type"
        ></el-checkbox>
      </el-form-item>
      <el-form-item>
        <el-button
          :loading="loading"
          class="login-btn"
          style="width:100%; margin-bottom:40px"
          @click.native.prevent="handleLogin"
        >
          {{ $t('message.login') }}
        </el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import Cookies from 'js-cookie'
import { login, getCheckCode } from '@/api/login'
import {
  userLoginLog
} from '@/api/log'
export default {
  data () {
    return {
      verificationCode: [],
      langs: [
        {
          value: 'cn',
          label: '中文'
        },
        {
          value: 'en',
          label: 'English'
        },
        {
          value: 'es',
          label: 'Español'
        }
      ],
      loginForm: {
        username: '',
        password: '',
        code: ''
      },
      loading: false,
      pwdType: 'password',
      redirect: undefined,
      rules: {
        username: [
          { required: true, message: this.$t('message.write_username'), trigger: 'blur' }
        ],
        password: [
          { required: true, message: this.$t('message.write_password'), trigger: 'blur' }
        ],
        code: [
          { required: true, message: this.$t('message.write_verification_code'), trigger: 'blur' }
        ]
      }
    }
  },
  mounted () {
    // 获取验证码
    this.handelClickCode()
    this.getCookie()
    console.log(this.$store.state.user.verification_Code)
  },
  methods: {
    // 切换验证码
    handelClickCode () {
      this.verificationCode = []
      getCheckCode().then(res => {
        console.log('-------1-------')
        let arr = res.result.checkCode.split('')
        for (let i = 0; i < arr.length; i++) {
          let col = Math.floor(Math.random() * 0xffffff).toString(16)
          let obj = {
            'col': '#' + col,
            'code': arr[i]
          }
          this.verificationCode.push(obj)
          console.log(this.verificationCode)
        }
      }).catch(err => {
        console.log(err)
      })
    },
    // 切换语言
    handelChange (val) {
      sessionStorage.setItem('language', val)
      this.$i18n.locale = val
    },
    // 忘记密码
    showPwd () {
      this.$store.commit('savePassword')
      // 显示密码
      // if (this.pwdType === 'password') {
      //   this.pwdType = ''
      // } else {
      //   this.pwdType = 'password'
      // }
    },
    // 登录
    handleLogin () {
                    this.$router.push({ path: '/navList' })

    },
    getCookie () {
      this.loginForm.username = Cookies.get('username')
      this.loginForm.password = Cookies.get('password')
    }
    // 设置过期时间
    // dateTime () {
    //   let today = new Date()
    //   let year = today.getFullYear()
    //   let month = today.getMonth()
    //   let date = today.getDate()
    //   let hours = today.getHours()
    //   let minutes = today.getMinutes()
    //   let data2 = new Date(year, month, date + 3, hours, minutes)
    //   sessionStorage.setItem('time', data2)
    // }
  }
}
</script>
<style lang="scss" scoped>
// IE样式
@media all and (-ms-high-contrast: none), (-ms-high-contrast: active) {
  .login-form {
    .el-input {
      width: 95%;
    }
    .select-lang {
      width: 95%;
    }
  }
}
</style>
<style scoped>
.login-box {
  height: 70%;
}
.login-form {
  padding: 20px 70px 20px 20px;
  background: rgba(252, 250, 250, 0.1);
  border-radius: 10px;
}
.title {
  margin-bottom: 10px;
  color: rgba(247, 243, 243);
  font-size: 26px;
}
.show-pwd {
  cursor: pointer;
  color: #26b4ff;
  line-height: 20px;
  float: right;
}
.code-bg {
  width: 100%;
  display: flex;
  justify-content: space-around;
  margin-left: 20px;
  background-image: url("../../../../static/images/code-bg.jpg");
  background-size: cover;
  cursor: pointer;
}
.code-bg span {
  font-size: 30px;
}
.code-box {
  display: flex;
}
.password_btn {
  background-color: transparent !important;
}
.login-btn {
  background-image: url("../../../../static/images/loginBtn.png");
  background-size: cover;
  border-radius: 15px;
  font-weight: 900;
  font-size: 20px;
  color: rgba(247, 243, 243);
}
.login-btn:hover {
  color: #26b4ff;
}
</style>

<style>
.login-box .el-form-item {
  margin-bottom: 20px;
}
.login-box .el-input__inner {
  background-color: transparent;
}
.login-box .el-input {
  width: 100%;
}
.select-lang {
  width: 100%;
}
.login-box .el-form-item__label {
  color: rgba(247, 243, 243);
}
</style>
