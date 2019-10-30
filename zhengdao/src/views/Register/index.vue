<template>
  <div>
    <el-card class="register-card">
      <el-form status-icon label-width="40px">
        <el-form-item>
          <el-input v-model="registerForm.phoneNum" placeholder="手机号" style="width: 300px; height: 40px"></el-input>
        </el-form-item>
        <el-form-item>
          <el-input v-model="registerForm.validCode" placeholder="6位验证码" style="width: 300px">
            <el-button slot="append" type="primary" @click="getCode()" :disabled="!phoneValid">获取验证码</el-button>
          </el-input>
        </el-form-item>
        <el-form-item>
          <el-input v-model="registerForm.password" placeholder="密码" style="width: 300px; height: 40px" type="password"></el-input>
        </el-form-item>
        <el-form-item>
          <el-input v-model="passwordAgain" placeholder="确认密码" style="width: 300px; height: 40px" type="password"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="md(); register()" :disabled="!isValid" style="width: 300px; height: 40px">注册</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>





<script>
export default {
  data() {
    return {
      registerForm: {
        phoneNum: '',
        password: '',
        validCode: '',
      },
      passwordAgain: '',
    };
  },


  methods: {
    md() {
      this.registerForm.password = this.$md5(this.registerForm.password)
    },

    getCode() {
    //get验证码
      this.$axios.get('/user/verifyCode?phoneNum=' + this.registerForm.phoneNum + '&type=register').then(res => {
        this.$message.success(res.data.message)
      })
    },


    register() {
      this.$axios.post('/user/register', this.registerForm).then(res => {
        if (res) {
          this.$message.success('注册成功')
          this.$router.push('/login')
        } else {
          this.$message.error(res.data.message)
        }
      })
    },


  },

  computed: {
    isValid() {
      return String(this.registerForm.phoneNum).match(/^1\d{10}$/) && String(this.registerForm.password).length >= 6 && this.registerForm.validCode == '666666' && this.registerForm.password == this.passwordAgain 
    },
    phoneValid() {
      return String(this.registerForm.phoneNum).match(/^1\d{10}$/)
    }
  },



}
</script>

<style>
  .register-card {
    width: 860px;
    height: 600px;
  }
</style>