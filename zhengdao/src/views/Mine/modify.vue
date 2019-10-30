<template>
  <div>
    <el-card class="usermodify-card">
      <div>
        <h3 style="text-align: left">修改个人资料</h3>
        <hr>
        <el-form ref="form" :model="userInfo" label-width="80px">
          <el-form-item label="姓名">
            <el-input class="information-input" v-model="userInfo.name"></el-input>
          </el-form-item>
          <el-form-item label="性别">
            <el-radio-group v-model="userInfo.male">
              <el-radio label="男"></el-radio>
              <el-radio label="女"></el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="手机号">
            <el-input class="information-input" v-model="userInfo.phone" :disabled="true"></el-input>
          </el-form-item>
          <el-form-item label="邮箱">
            <el-input class="information-input" v-model="userInfo.email"></el-input>
          </el-form-item>
          <hr>
          <el-form-item label="最高学历学校">
            <el-input class="information-input" v-model="userInfo.school"></el-input>
          </el-form-item>
          <el-form-item label="最高学历专业">
            <el-input class="information-input" v-model="userInfo.maxDegree"></el-input>
          </el-form-item>
          <el-form-item label="专业资质">
            <el-input class="information-input" v-model="userInfo.professional"></el-input>
          </el-form-item>
          <hr>
          <el-form-item label="个人简介">
            <el-input type="textarea" style="width: 500px; height: 140px" v-model="userInfo.personalResume"></el-input>
          </el-form-item>
          <hr>
          <el-button type="primary" class="next-step" @click="cancel()">取消</el-button>
          <el-button type="primary" class="next-step" @click="save()">保存</el-button>
        </el-form>
      </div>
    </el-card>
  </div>
</template>

<script>
// import { getUserInfo } from '@/api/user';

export default {
  data() {
    return {
      userInfo: {}
    }
  },

  created() {
    this.fetchuserinfo();
  },

  methods: {
    // fetchInfo() {
    //   this.id = this..state.id;
    // },
    cancel() {
      this.$router.go(-1);
    },

    save() {
      this.$axios.post('/user/profile', this.userInfo).then(() => {
        this.fetchuserinfo();
        this.$message.success('修改成功');
        this.$router.go(-1);
      })
    },

    fetchuserinfo() {
      this.$axios.get('/user/info').then(res => {
        this.userInfo = res.data.data;
      })
    },
  },
  
}
</script>


<style>
  .usermodify-card {
    width: 1060px;
    height: 762px;
  }
  .span-class {
    text-align: left;
  }
</style>