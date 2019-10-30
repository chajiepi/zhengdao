<template>
  <div>
    <el-card class="login-card">
      <el-tabs v-model="activeName">
				<el-tab-pane label="密码登录" name="pwdLogin" label-width="30px">
					<el-form status-icon label-width="40px">
						<el-form-item>
							<el-input v-model="pwdLogin.phoneNum" placeholder="请输入手机号" style="width: 300px; height: 40px"></el-input>
						</el-form-item>
						<el-form-item>
							<el-input v-model="pwdLogin.password" placeholder="请输入密码" style="width: 300px; height: 40px" type="password"></el-input>
						</el-form-item>
						<el-form-item>
							<el-button type="primary" @click="md(); pwdlogin()" :disabled="!isValid" style="width: 300px; height: 40px">登录</el-button>
						</el-form-item>
            <el-form-item>
							<el-button type="text" class="button" @click="toRegister()">免费注册</el-button>
						</el-form-item>
					</el-form>
				</el-tab-pane>
				<el-tab-pane label="验证码登录" name="codeLogin" label-width="30px">
          <el-form status-icon label-width="40px">
            <el-form-item>
              <el-input v-model="codeLogin.phoneNum" placeholder="请输入手机号" style="width: 300px; height: 40px"></el-input>
            </el-form-item>
            <el-form-item>
              <el-input v-model="codeLogin.validCode" placeholder="请输入内容" style="width: 300px">
                <el-button slot="append" type="primary" @click='getCode()' :disabled="!phoneValid">获取验证码</el-button>
              </el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="codelogin()" style="width: 300px">登录</el-button>
              <el-button type="text" class="button">免费注册</el-button>
            </el-form-item>
          </el-form>
        </el-tab-pane>
      </el-tabs>
    </el-card>
  </div>
</template>

<script>
export default {
	components: {},
  data() {
    return {
      activeName: 'pwdLogin',
      pwdLogin: {
        phoneNum: '',
        password: '',
        type: 'pwd',
      },
      codeLogin: {
        phoneNum: '',
        validCode: '',
        type: 'sms',
      },
    }
	},

  // created() {
  // },

	methods: {
    md() {
      this.pwdLogin.password = this.$md5(this.pwdLogin.password)
    },

    toRegister() {
      this.$router.push('/register')
    },

    getCode() {
    //get验证码
      this.$axios.get('/user/verifyCode?phoneNum=' + this.codeLogin.phoneNum + '&type=login').then(res => {
        this.$message.success(res.data.message)
      })
    },

    pwdlogin() {
      this.$store.dispatch('Login', this.pwdLogin).then(() => {
        this.$axios.get('/user/info').then(res => {
          if(res.data.data.name.length == 0) {
            this.$message.success('Login successfully.')
            this.$router.push('/mine/create')
          } else {
            this.$message.success('Login successfully.')
            this.$router.push(`/org/information/${this.$store.state.currentorgid}`)
          }
        })
      }).catch(err => {
        this.$message.error(err);
      });         
    },

    codelogin() {
      this.$store.dispatch('Codelogin', this.codeLogin).then(() => {
        this.$axios.get('/user/info').then(res => {
          if(res.data.data.name.length == 0) {
            this.$message.success('Login successfully.')
            this.$router.push('/mine/create')
          } else {
            this.$message.success('Login successfully.')
            this.$router.push(`/org/information/${this.$store.state.currentorgid}`)
          }
        })
      }).catch(err => {
        this.$message.error(err);
      });         
    },



  },

	computed: {
    isValid() {
      return String(this.pwdLogin.phoneNum).match(/^1\d{10}$/) && String(this.pwdLogin.password).length >= 6
    },
    phoneValid() {
      return String(this.codeLogin.phoneNum).match(/^1\d{10}$/)
    },
  },
}
</script>


<style>
  .login-container {
    position: absolute;
    top: 0;
    bottom: 0;
    width: 100%;
    background: #545c64
  }
  .login-card {
    width: 380px;
    margin: 430px;
  }
</style>