<template>
  <div>
    <el-row>
      <el-col :span="19">
        <el-card class="userinfo-card">
          <div class="user-info">
            <el-row class="header" type="flex" justify="space-between">
              <el-col :md="4" id="left">个人资料</el-col>
            </el-row>
            <el-row style="border-bottom:1px solid rgba(235,238,245,1)">
              <el-row>
                <el-col :span="12">
                  <span>姓名：</span>
                  <span class="span-class">{{userInfo.name}}</span>
                </el-col>
                <el-col :span="12">
                  <span>性别：</span>
                  <span class="span-class">{{userInfo.male}}</span>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="12">
                  <span>手机号：</span>
                  <span class="span-class">{{userInfo.phone}}</span>
                </el-col>
                <el-col :span="12">
                  <span>邮箱：</span>
                  <span class="span-class">{{userInfo.email}}</span>
                </el-col>
              </el-row>
            </el-row>

            <el-row style="border-bottom:1px solid rgba(235,238,245,1)">
              <el-row>
                <el-col :span="12">
                  <span>学历：</span>
                  <span class="span-class">{{userInfo.maxEducation}}</span>
                </el-col>
                <el-col :span="12">
                  <span>学校：</span>
                  <span class="span-class">{{userInfo.school}}</span>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="12">
                  <span>专业：</span>
                  <span class="span-class">{{userInfo.maxDegree}}</span>
                </el-col>
                <el-col :span="12">
                  <span>专业资质：</span>
                  <span class="span-class">{{userInfo.professional}}</span>
                </el-col>
              </el-row>
            </el-row>

            <el-row class="Introduction">
              <el-row class="header">个人简介：</el-row>
              <el-row class="content">
                {{userInfo.personalResume}}
              </el-row>
            </el-row>
            
            <template>
              <el-button type="text" @click="tomodifyuser()">修改</el-button>
            </template>
          </div>
        </el-card>
      </el-col>
      <el-col :span="5">
        <el-card class="safety-card">
          <h3>安全信息</h3>
          <span>手机绑定：{{ userInfo.phone }}</span><br>
          <span>登陆密码：</span>
          <template>
            <el-button type="text" @click="resetpwd()">修改</el-button>
          </template>
        </el-card>
      </el-col>
    </el-row>
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
    //   this.id = this.$store.state.id;
    // },
    tomodifyuser() {
      this.$router.push('/mine/modify');
    },

    fetchuserinfo() {
      this.$axios.get('/user/info').then(res => {
        this.userInfo = res.data.data;
      })
    },

    resetpwd() {
      this.$prompt('原始密码', '修改登录密码', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        inputErrorMessage: '邮箱格式不正确'
      }).then(({ value }) => {
        this.$message({
          type: 'success',
          message: '你的邮箱是: ' + value
        });
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '取消输入'
        });       
      });
    }

    

    
  },
  
}
</script>


<style>
  .userinfo-card {
    width: 700px;
    height: 489px;
  }
  .span-class {
    font-size: 14px;
    font-family: PingFangSC-Regular;
    color: rgba(96, 98, 102, 1);
    text-align: left;
    display: inline-block;
  }
  .user-info {
    padding: 20px 0px;
  }
</style>